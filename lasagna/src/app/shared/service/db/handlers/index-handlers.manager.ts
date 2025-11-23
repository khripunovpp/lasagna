import {inject, Injectable} from '@angular/core';
import {LoggerService} from '../../../../features/logger/logger.service';
import {IndexDataHandler, IndexHandlerRegistry, TransformedData} from '../types/index-handlers.types';
import {DocumentationIndexHandler} from './documentation-index.handler';
import {DefaultIndexHandler} from './default-index.handler';
import {Stores} from '../const/stores';
import {ProductsIndexHandler} from './products-index.handler';
import {ProductsCategoriesIndexHandler} from './products-categories-index.handler';
import {RecipesCategoriesIndexHandler} from './recipes-categories-index.handler';
import {IS_CLIENT} from '../../tokens/isClient.token';

/**
 * Manager for handling index data transformations
 */
@Injectable({
  providedIn: 'root'
})
export class IndexHandlersManager {

  constructor() {
    this.initializeHandlers();
  }

  readonly isBrowser = inject(IS_CLIENT);
  private readonly logger = inject(LoggerService).withContext({
    color: '#ff6b6b',
    label: 'IndexHandlers'
  });
  private handlers: IndexHandlerRegistry = {};
  private defaultHandler!: IndexDataHandler;

  /**
   * Register a handler for a specific table
   */
  registerHandler(table: string, handler: IndexDataHandler): void {
    this.handlers[table] = handler;
    this.logger.log(`Registered handler for table: ${table}`, {
      handler: handler.getName()
    });
  }

  /**
   * Transform data for indexing using appropriate handler
   */
  transformData(table: string, data: any[]): TransformedData {
    const startTime = performance.now();

    const handler = this.getHandler(table, data);
    const transformedData = handler.transform(data);

    const endTime = performance.now();

    this.logger.log(`Transformed data for table: ${table}`, {
      handler: handler.getName(),
      originalCount: data.length,
      transformedCount: transformedData.length,
      timeMs: (endTime - startTime).toFixed(2)
    });

    return {
      table,
      data: transformedData,
      handlerName: handler.getName()
    };
  }

  /**
   * Get all registered handlers
   */
  getRegisteredHandlers(): string[] {
    return Object.keys(this.handlers);
  }

  /**
   * Check if a table has a specific handler
   */
  hasSpecificHandler(table: string): boolean {
    return table in this.handlers;
  }

  /**
   * Initialize all available handlers
   */
  private initializeHandlers(): void {
    if (!this.isBrowser) {
      return;
    }
    // Register specific handlers
    this.registerHandler(Stores.DOCUMENTATION, new DocumentationIndexHandler());
    this.registerHandler(Stores.PRODUCTS, new ProductsIndexHandler());
    this.registerHandler(Stores.PRODUCTS_CATEGORIES, new ProductsCategoriesIndexHandler());
    this.registerHandler(Stores.RECIPES_CATEGORIES, new RecipesCategoriesIndexHandler());

    // Set default handler for tables without specific handlers
    this.defaultHandler = new DefaultIndexHandler();

    this.logger.log('Index handlers initialized', {
      handlers: Object.keys(this.handlers),
      defaultHandler: this.defaultHandler.getName()
    });
  }

  /**
   * Get the appropriate handler for a table and data
   */
  private getHandler(table: string, data: any[]): IndexDataHandler {
    // Check if there's a specific handler for this table
    const specificHandler = this.handlers[table];
    if (specificHandler && specificHandler.canHandle(table, data)) {
      return specificHandler;
    }

    // Use default handler
    return this.defaultHandler;
  }
}
