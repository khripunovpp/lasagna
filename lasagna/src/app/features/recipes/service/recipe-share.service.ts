import {inject, Injectable} from '@angular/core';
import {Recipe} from './models/Recipe';
import {Ingredient} from './models/Ingredient';
import {ProductsRepository} from '../../products/service/products.repository';
import {TranslateService} from '@ngx-translate/core';

interface SharedIngredient {
  a: number  // amount
  u: string  // unit
  p: string  // product name
}

interface SharedRecipeMeta {
  n: string    // name
  d: string   // description
  p: number    // portions
  m: number   // master
}

interface SharedMeta {
  ri: number; // had recipes as ingredients, but it was redundant, because we only support flat recipes without nested ones. Keeping it for future compatibility.
}

interface SharedPayload {
  v: 1;
  r: SharedRecipeMeta
  i: SharedIngredient[]
  m: SharedMeta
}

export const SHARE_RECIPE_PARAM = 'share-recipe';
export const MAX_ENCODED_LENGTH = 2000;

@Injectable({providedIn: 'root'})
export class RecipeShareService {
  constructor(
    private _translateService: TranslateService,
  ) {
  }

  private readonly _productsRepository = inject(ProductsRepository);

  /**
   * Кодирует рецепт в компактную строку, которая может быть передана через URL. Рецепт должен быть "плоским" (без вложенных рецептов).
   * Если результат кодирования превышает MAX_ENCODED_LENGTH, будет выброшена ошибка.
   */
  async encode(recipe: Recipe): Promise<string> {
    try {
      const payload = await this._toPayload(recipe);
      const json = JSON.stringify(payload);
      const compressed = await this._compress(json);
      const encoded = this._toBase64Url(compressed);
      if (encoded.length <= MAX_ENCODED_LENGTH) {
        return encoded;
      }
      throw new Error(this._translateService.instant('shared-recipe.encode.error.result-too-long', {max: MAX_ENCODED_LENGTH}));
    } catch (error) {
      throw error;
    }
  }

  async decodeRecipe(encoded: string): Promise<{
    recipe: Recipe | null
    message: string
  }> {
    const payload = await this._decode(encoded);
    if (!payload) return {
      recipe: null,
      message: this._translateService.instant('shared-recipe.decode.error.invalid-data'),
    };

    return {
      recipe: Recipe.fromRaw({
        name: payload.r.n,
        description: payload.r.d || '',
        portions: payload.r.p,
        ingredients: payload.i.map(i => Ingredient.fromRaw({
          amount: i.a,
          unit: i.u,
          new_product_name: i.p,
        })),
        master: payload.r.m === 1,
      }),
      message: payload.m.ri === 1
        ? this._translateService.instant('shared-recipe.decode.warning.nested-recipes')
        : '',
    }
  }

  generateUrl(encoded: string): string {
    const url = new URL(window.location.origin);
    url.pathname = '/recipes/add';
    url.searchParams.set(SHARE_RECIPE_PARAM, encoded);
    return url.toString();
  }

  /**
   * Decodes a base64url string back into a Recipe (without uuid/timestamps, without category).
   */
  private async _decode(encoded: string): Promise<SharedPayload | null> {
    try {
      const compressed = this._fromBase64Url(encoded);
      const json = await this._decompress(compressed);
      const payload: SharedPayload = JSON.parse(json);
      return payload.v === 1 ? payload : null;
    } catch {
      return null;
    }
  }

  private async _toPayload(recipe: Recipe): Promise<SharedPayload> {
    const ingredients = [];
    let hasNestedRecipes = false;

    for (const ing of recipe.ingredients) {
      if (ing.product_id) {
        const product = await this._productsRepository.getOne(ing.product_id.uuid);
        if (!product) {
          throw new Error(this._translateService.instant('shared-recipe.encode.error.product-not-found', {name: ing.product_id.name}));
        }
        ingredients.push({
          a: ing.amount,
          u: ing.unit,
          p: product.name,
        });
      }
      if (ing.recipe_id && !hasNestedRecipes) {
        hasNestedRecipes = true;
      }
    }

    return {
      v: 1,
      r: {
        n: recipe.name,
        d: recipe.description || '',
        p: recipe.portions,
        m: recipe.master ? 1 : 0,
      },
      i: ingredients,
      m: {
        ri: hasNestedRecipes ? 1 : 0,
      },
    };
  }

  private async _compress(input: string): Promise<Uint8Array> {
    const stream = new CompressionStream('deflate-raw');
    const writer = stream.writable.getWriter();
    writer.write(new TextEncoder().encode(input));
    writer.close();
    const chunks: Uint8Array[] = [];
    const reader = stream.readable.getReader();
    for (; ;) {
      const {done, value} = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    const total = chunks.reduce((s, c) => s + c.length, 0);
    const out = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      out.set(chunk, offset);
      offset += chunk.length;
    }
    return out;
  }

  private async _decompress(input: Uint8Array): Promise<string> {
    const stream = new DecompressionStream('deflate-raw');
    const writer = stream.writable.getWriter();
    writer.write(input.buffer.slice(input.byteOffset, input.byteOffset + input.byteLength) as ArrayBuffer);
    writer.close();
    const chunks: Uint8Array[] = [];
    const reader = stream.readable.getReader();
    for (; ;) {
      const {done, value} = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    const total = chunks.reduce((s, c) => s + c.length, 0);
    const out = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) {
      out.set(chunk, offset);
      offset += chunk.length;
    }
    return new TextDecoder().decode(out);
  }

  private _toBase64Url(bytes: Uint8Array): string {
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }

  private _fromBase64Url(str: string): Uint8Array {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
  }
}
