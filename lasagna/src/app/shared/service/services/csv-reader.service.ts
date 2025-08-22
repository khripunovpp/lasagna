import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvReaderService {
  constructor() {
  }

  readFromCSVFile(file: File): Promise<any[]> {
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

  readFromJSONFile<T = any>(file: File): Promise<T[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const result = reader.result as string;
          console.log('pre parsed', result);
          const json = JSON.parse(result);
          resolve(json);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsText(file);
    });
  }

  parseData(data: string): string[][] {
    // split \r\n or \n
    return data.split(/\r\n|\n/)
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

  makeCsv(data: any[]): string {
    const keys = Object.keys(data[0]);
    const rows = data.map(row => keys.map(key => row[key]));
    const csv = [keys, ...rows].map(row => row.join(',')).join('\r\n');
    return csv;
  }

  saveToCSVFile(data: any[], filename: string) {
    const csv = this.makeCsv(data);
    const blob = new Blob([csv], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    document.body.appendChild(link);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.click();
    URL.revokeObjectURL(url);
  }

  saveToJSONFile(data: any[], filename: string) {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], {type: 'application/json'});
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    document.body.appendChild(link);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.click();
    URL.revokeObjectURL(url);
  }
}
