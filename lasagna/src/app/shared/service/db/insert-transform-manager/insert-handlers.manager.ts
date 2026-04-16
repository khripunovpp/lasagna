import {inject, Injectable} from '@angular/core';
import {LoggerService} from '../../../../features/logger/logger.service';
import {Stores} from '../const/stores';
import {IS_CLIENT} from '../../tokens/isClient.token';
import {InsertDataHandler} from './insert-handlers.types';
import {DefaultInsertHandler} from './handlers/default-insert.handler';
import {ProductsInsertHandler} from './handlers/products-insert.handler';
import {TransformedData} from '../index-transform-manager/index-handlers.types';
import {RecipesInsertHandler} from './handlers/recipes-insert.handler';

/**
 * Manager for handling insert data transformations
 */
@Injectable({
  providedIn: 'root'
})
export class InsertHandlersManager {

  constructor() {
    this.initializeHandlers();
  }

  readonly isBrowser = inject(IS_CLIENT);
  private readonly logger = inject(LoggerService).withContext({
    color: '#be5f13',
    label: 'InsertHandlers'
  });
  private handlers: Partial<Record<Stores, InsertDataHandler>> = {};
  private defaultHandler!: InsertDataHandler;

  /**
   * Register a handler for a specific table
   */
  registerHandler(table: Stores, handler: InsertDataHandler): void {
    this.handlers[table] = handler;
    this.logger.log(`Registered handler for table: ${table}`, {
      handler: handler.getName()
    });
  }

  /**
   * Transform data for indexing using appropriate handler
   */
  transformData(table: Stores, data: any[] | any): TransformedData {
    const startTime = performance.now();

    const handler = this.getHandler(table, data);
    const transformedData = handler.transform(Array.isArray(data) ? data : [data]);

    const endTime = performance.now();

    this.logger.log(`Transformed data for table: ${table}`, {
      handler: handler.getName(),
      originalCount: Array.isArray(data) ? data.length : 1,
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
   * Initialize all available handlers
   */
  private initializeHandlers(): void {
    if (!this.isBrowser) {
      return;
    }
    // Register specific handlers
    this.registerHandler(Stores.PRODUCTS, new ProductsInsertHandler());
    this.registerHandler(Stores.RECIPES, new RecipesInsertHandler());

    // Set default handler for tables without specific handlers
    this.defaultHandler = new DefaultInsertHandler();

    this.logger.log('Insert handlers initialized', {
      handlers: Object.keys(this.handlers),
      defaultHandler: this.defaultHandler.getName()
    });
  }

  /**
   * Get the appropriate handler for a table and data
   */
  private getHandler(table: Stores, data: any[]): InsertDataHandler {
    // Check if there's a specific handler for this table
    const specificHandler = this.handlers[table];
    if (specificHandler && specificHandler.canHandle(table, data)) {
      return specificHandler;
    }

    // Use default handler
    return this.defaultHandler;
  }
}
