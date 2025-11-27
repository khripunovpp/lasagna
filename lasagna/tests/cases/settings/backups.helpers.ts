import {Download, Page} from '@playwright/test';
import {Buffer} from 'node:buffer';
import {ZodSchema} from 'zod';
import {Stores} from '../../../src/app/shared/service/db/const/stores';

export type BackupParsedInfo = Partial<Record<Stores, {
  parsedCount: number
}>>;

export const validateDownloadedBackup = async (
  json: string,
  schema: Partial<Record<Stores, ZodSchema>>,
) => {
  const data: unknown[] = JSON.parse(json);
  const parsedInfo: Partial<Record<Stores, {
    parsedCount: number
  }>> = {};

  for (let i = 0; i < data.length; i++) {
    const storeObj = data[i];
    if (isStoreBackupShape(storeObj)) {
      const storeScheme = schema[storeObj.store as Stores];
      let parsedRecords = [];

      if (storeScheme) {
        for (let j = 0; j < storeObj.data.length; j++) {
          try {
            const record = storeObj.data[j] as Record<string, unknown>;
            const parsed = storeScheme.parse(record);
            parsedRecords.push(parsed);
          } catch (e) {
            console.error(e);
            throw e;
          }
        }
      }

      parsedInfo[storeObj.store as Stores] = {
        parsedCount: parsedRecords.length,
      }
    }
  }

  return parsedInfo;
}

export function isStoreBackupShape(object: unknown): object is {
  store: string
  data: unknown[]
  version: number
  createdAt: number
} {
  return 'store' in (object as any)
    || 'data' in (object as any)
    || 'version' in (object as any)
    || 'createdAt' in (object as any);
}

export const handleBackupDownload = (page: Page) => {
  return new Promise<string>((resolve, reject) => {
    let chunks: Buffer[] = [];
    page.on('pageerror', (err) => {
      reject(err)
    });

    page.on('crash', (err) => {
      reject(err)
    });

    page.on('download', async (download: Download) => {
      const stream = await download.createReadStream();
      stream.on('readable', () => {
        let chunk;
        while (null !== (chunk = stream.read())) {
          chunks.push(Buffer.from(chunk))
        }
      });

      stream.on('error', (err) => {
        console.error(err);
        reject(err)
      });

      stream.on('end', async () => {
        try {
          const content = chunks.map(buf => buf.toString()).join('');
          await download.saveAs('./downloads/' + download.suggestedFilename());
          resolve(content);
        } catch (e) {
          reject(e);
        }
      });
    });
  })
}

export const expectStoreCount = (
  store: Stores,
  count: number,
  parsedInfo: BackupParsedInfo
) => {
  return parsedInfo[store]?.parsedCount === count;
}

export const makeBackupStructure = (
  data: Partial<Record<Stores, unknown[]>>,
  version = 0,
  createdAt = Date.now(),
) => {
  return Object.entries(data)
    .map(([store, records]) => ({
      store,
      data: records || [],
      version,
      createdAt,
    }));
}
