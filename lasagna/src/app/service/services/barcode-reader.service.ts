import {Injectable} from '@angular/core';
import {BarcodeFormat, DecodeHintType} from '@zxing/library';
import {BrowserMultiFormatReader} from '@zxing/browser';

@Injectable({
  providedIn: 'root'
})
export class BarcodeReaderService {
  constructor() {

    this.hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.UPC_A,
      BarcodeFormat.CODE_128
    ]);
    this.codeReader = new BrowserMultiFormatReader(this.hints);
  }

  hints = new Map();
  codeReader: BrowserMultiFormatReader;

  private _decodeFromVideoDevice(
    deviceId: string,
    videoElement: string,
    callback: (result: string | null) => void
  ) {
    this.codeReader.decodeFromVideoDevice(
      deviceId,
      videoElement,
      (result, err) => {
        if (result) {
          callback(result.getText());
        } else {
          callback(null);
        }
      }
    );
  }

  async startCamera(
    videoElement: string,
    callback: (result: string | null) => void
  ) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoInputs = devices.filter(d => d.kind === 'videoinput');

    if (videoInputs.length) {
      const backCam = videoInputs.find(d => d.label.toLowerCase().includes('back')) || videoInputs[0];

      this._decodeFromVideoDevice(
        backCam.deviceId,
        videoElement,
        (result) => {
          console.log({result});

          if (result) {
            callback(result);
          } else {
            callback(null);
          }
        }
      );
    } else {
      console.error('Нет видеоустройств');
    }
  }
}
