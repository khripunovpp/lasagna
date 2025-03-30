import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvReaderService {
  constructor() {
  }

  readFromFile(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const rows = this.parseData(result);
        const [first, ...others] = rows;
        const obj = this.arrayToObjects(others, first);
        resolve(obj);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsText(file);
    });
  }

  parseData(data: string): string[][] {
    return data.split('\r\n')
      .map(row => row.split(','))
      .filter(row => row.length > 1 && row.some(cell => cell.length > 0));
  }

  arrayToObjects<T>(array: string[][], keys: string[]): T[] {
    return array.map(row => {
      const obj: any = {};
      keys.forEach((key, index) => {
        obj[key] = row[index];
      });
      return obj;
    });
  }
}
