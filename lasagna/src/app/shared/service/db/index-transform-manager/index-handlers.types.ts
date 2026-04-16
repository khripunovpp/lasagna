import { Stores } from '../const/stores';

/**
 * Interface for index data transformation handlers
 */
export interface IndexDataHandler<T = any, R = any> {
  /**
   * Check if this handler should be used for the given table and data
   */
  canHandle(table: string, data: T[]): boolean;
  
  /**
   * Transform raw data into indexable format
   */
  transform(data: T[]): R[];
  
  /**
   * Get the handler name for logging
   */
  getName(): string;
}

/**
 * Configuration for index handlers
 */
export interface IndexHandlerConfig {
  /**
   * Table name
   */
  table: string;
  
  /**
   * Handler instance
   */
  handler: IndexDataHandler;
  
  /**
   * Whether to use this handler
   */
  enabled: boolean;
}

/**
 * Registry of index handlers
 */
export interface IndexHandlerRegistry {
  [key: string]: IndexDataHandler;
}

/**
 * Result of data transformation
 */
export interface TransformedData {
  /**
   * Original table name
   */
  table: string;
  
  /**
   * Transformed data ready for indexing
   */
  data: any[];
  
  /**
   * Handler that was used
   */
  handlerName: string;
} 