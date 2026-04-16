import {Stores} from '../db/const/stores';
import {ZodTypeAny} from 'zod';
import {ProductScheme} from '../../../features/products/service/Product.scheme';
import {RecipeScheme} from '../../../features/recipes/service/schemes/Recipe.scheme';
import {CategoryProductScheme} from '../db/shemes/CategoryProduct.scheme';
import {CategoryRecipeScheme} from '../db/shemes/CategoryRecipe.scheme';
import {DocumentsScheme} from '../../../features/documentation/service/documents.scheme';
import {TagScheme} from '../../../features/settings/service/schemes/Tag.scheme';
import {SettingsScheme} from '../../../features/settings/service/schemes/Settings.scheme';
import {TaxScheme} from '../../../features/settings/service/schemes/Tax.scheme';
import {InvoiceScheme} from '@invoices/service/Inovice/Invoice.scheme';
import {CredentialScheme} from '../../../features/settings/service/schemes/Credential.scheme';
import {ChangeLogScheme} from '../../../features/history/ChangeLogEntry.scheme';
import {DeleteRecordScheme} from '../db/shemes/DeleteRecord.scheme';
import {FolderScheme} from '../../../features/recipes/service/schemes/Folder.scheme';

export const schemaMap: Partial<Record<Stores, ZodTypeAny>> = {
  [Stores.PRODUCTS]: ProductScheme,
  [Stores.RECIPES]: RecipeScheme,
  [Stores.PRODUCTS_CATEGORIES]: CategoryProductScheme,
  [Stores.RECIPES_CATEGORIES]: CategoryRecipeScheme,
  [Stores.DOCUMENTATION]: DocumentsScheme,
  [Stores.FAQ]: DocumentsScheme,
  [Stores.TAGS]: TagScheme,
  [Stores.SETTINGS]: SettingsScheme,
  [Stores.TAXES]: TaxScheme,
  [Stores.INVOICES]: InvoiceScheme,
  [Stores.CREDENTIALS]: CredentialScheme,
  [Stores.CHANGES_LOG]: ChangeLogScheme,
  [Stores.DELETES_STORE]: DeleteRecordScheme,
  [Stores.FOLDERS]: FolderScheme,
};
