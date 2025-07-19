import { IndexDataHandler } from '../types/index-handlers.types';

/**
 * Default handler for standard tables that don't need special transformation
 */
export class DefaultIndexHandler implements IndexDataHandler<any, any> {
  
  canHandle(table: string, data: any[]): boolean {
    // This handler handles all tables that don't have specific handlers
    return true;
  }
  
  transform(data: any[]): any[] {
    // For standard tables, return data as-is
    return data;
  }
  
  getName(): string {
    return 'DefaultIndexHandler';
  }
} 