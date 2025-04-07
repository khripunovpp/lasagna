// services/form-template.service.ts
import {Injectable} from '@angular/core';

// models/template.model.ts

export interface BaseTemplate<T> {
  id: string;
  name: string;
  createdAt: string;
  data: T[];
}

export type TemplateType = 'tax' | 'recipe'; // дополни при необходимости

export type TemplateMap = {
  tax: TaxTemplateRow;
  recipe: unknown; // позже опишем
};

export type Template<T extends TemplateType> = BaseTemplate<TemplateMap[T]>;

export interface TaxTemplateRow {
  name: string;
  description: string;
  value: number;
  percentage?: boolean;
}

@Injectable({providedIn: 'root'})
export class FormTemplateService {
  constructor() {
  }

  getTemplates<T extends TemplateType>(type: T): Template<T>[] {
    const data = localStorage.getItem(this.getStorageKey(type));
    return data ? JSON.parse(data) : [];
  }

  getTemplateById<T extends TemplateType>(type: T, id: string): Template<T> | undefined {
    const templates = this.getTemplates(type);
    return templates.find(t => t.id === id);
  }

  getTemplateByName<T extends TemplateType>(type: T, name: string): Template<T> | undefined {
    const templates = this.getTemplates(type);
    return templates.find(t => t.name === name);
  }

  saveTemplate<T extends TemplateType>(type: T, template: Template<T>): void {
    const templates = this.getTemplates(type);
    const isUnique = this._checkUniqName(templates, template.name);
    if (!isUnique) {
      this.updateTemplateData(type, template.name, template.data);
    } else {
      templates.push(template);
      this._storeTemplates(type, templates);
    }
  }

  updateTemplateData<T extends TemplateType>(type: T, name: string, templateData: TemplateMap[T][]): void {
    const templates = this.getTemplates(type);
    const template = templates.find(t => t.name === name);
    if (template) {
      template.data = templateData;
      this._storeTemplates(type, templates);
    }
  }

  deleteTemplate<T extends TemplateType>(type: T, id: string): void {
    const filtered = this.getTemplates(type).filter(t => t.id !== id);
    this._storeTemplates(type, filtered);
  }

  updateTemplate<T extends TemplateType>(type: T, updated: Template<T>): void {
    const updatedList = this.getTemplates(type).map(t =>
      t.id === updated.id ? updated : t
    );
    this._storeTemplates(type, updatedList);
  }

  private _checkUniqName<T extends TemplateType>(templates: Template<T>[], name: string): boolean {
    return !templates.some(t => t.name === name);
  }

  private getStorageKey<T extends TemplateType>(type: T): string {
    return `template-${type}`;
  }

  private _storeTemplates<T extends TemplateType>(type: T, data: Template<T>[]): void {
    localStorage.setItem(this.getStorageKey(type), JSON.stringify(data));
  }
}
