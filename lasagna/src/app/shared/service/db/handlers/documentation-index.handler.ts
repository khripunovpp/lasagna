import {IndexDataHandler} from '../types/index-handlers.types';
import {Stores} from '../const/stores';

/**
 * Documentation data structure from database
 */
interface DocumentationRecord {
  key: string;
  value?: any[];
}

/**
 * Transformed documentation item for indexing
 */
interface IndexableDocumentation {
  uuid: string;
  title: string;
  html: string;
  path: string;
  language: string;
  name: string;
}

/**
 * Handler for transforming documentation data for indexing
 */
export class DocumentationIndexHandler implements IndexDataHandler<DocumentationRecord, IndexableDocumentation> {

  canHandle(table: string, data: DocumentationRecord[]): boolean {
    return table === Stores.DOCUMENTATION &&
      data.some(item => item.key === 'data' && Array.isArray(item.value));
  }

  transform(data: DocumentationRecord[]): IndexableDocumentation[] {
    const docsRecord = data.find(item => item.key === 'data');

    if (!docsRecord?.value) {
      return [];
    }

    return docsRecord.value.map((doc: any) => ({
      uuid: doc.path, // Use path as UUID for documentation
      title: doc.title || '',
      html: doc.html || '',
      path: doc.path || '',
      language: doc.language || 'en',
      name: doc.name || ''
    }));
  }

  getName(): string {
    return 'DocumentationIndexHandler';
  }
}
