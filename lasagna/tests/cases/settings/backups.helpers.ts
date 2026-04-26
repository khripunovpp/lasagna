import {Download} from '@playwright/test';
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
            console.error(`[validateDownloadedBackup] Zod error in store "${storeObj.store}" at index ${j}:`, e);
            console.error(`[validateDownloadedBackup] Failed record:`, JSON.stringify(storeObj.data[j]));
            throw e;
          }
        }
      } else {
        console.warn(`[validateDownloadedBackup] No schema for store "${storeObj.store}", skipping validation`);
      }

      parsedInfo[storeObj.store as Stores] = {
        parsedCount: parsedRecords.length,
      }
      console.log(`[validateDownloadedBackup] store="${storeObj.store}" records=${storeObj.data.length} parsed=${parsedRecords.length}`);
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

export const readBackupDownload = async (download: Download): Promise<string> => {
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  await download.saveAs('./downloads/' + download.suggestedFilename());
  return chunks.map(buf => buf.toString()).join('');
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
