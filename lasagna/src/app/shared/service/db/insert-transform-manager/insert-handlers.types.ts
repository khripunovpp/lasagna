/**
 * Interface for insert data transformation handlers. For example, when import old version of data to the new schema
 */
export interface InsertDataHandler<T = unknown, R = any> {
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
 * Result of data transformation
 */
export interface TransformedInsertedData {
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
