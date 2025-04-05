import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenFoodFactsService {
  constructor(
    private _http: HttpClient
  ) {
  }

  getProductByBarcode(barcode: string) {
    return firstValueFrom(this._http
      .get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`))
  }


}
