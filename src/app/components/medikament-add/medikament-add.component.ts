import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { SpeechService } from 'src/app/services/speech.service';
import { BarcodeFormat } from '@zxing/library';
import { DataService } from 'src/app/services/data.service';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Html5Qrcode, Html5QrcodeResult } from 'html5-qrcode';

@Component({
  selector: 'app-medikament-add',
  templateUrl: './medikament-add.component.html',
  styleUrls: ['./medikament-add.component.scss'],
})
export class MedikamentAddComponent implements OnInit, OnDestroy {
  openModal = false;

  html5QrCode!: Html5Qrcode;
  private readonly helpText =
    'für Hilfe,Um ein Medikament hinzuzufügen, scannen Sie den Barcode und klicken Sie auf die Schaltfläche Hinzufügen';

  temp: any = {};

  constructor(
    private dataService: DataService,
    private speechService: SpeechService
  ) {}

  ngOnInit(): void {
    this.html5QrCode = new Html5Qrcode('reader');
  }

  startBarcodeScanner(): void {
    const config = { fps: 10, qrbox: { width: 400, height: 400 } };
    const macId =
      '0de0ec42323600326631940c78847141bf3fd4525555b0eb0646c42d6fbc3943';

    this.html5QrCode.start(
      { facingMode: 'environment' },
      config,
      this.qrCodeSuccessCallback(),
      this.qrcodeErrorCallback()
    );
  }

  save(): void {
    const localStorage = window.localStorage.getItem('mediApp') as string;
    const array = JSON.parse(localStorage);

    if (array?.length > 0) {
      array.push(this.temp);
      window.localStorage.setItem('mediApp', JSON.stringify(array));
    } else {
      window.localStorage.setItem('mediApp', JSON.stringify([this.temp]));
    }

    this.temp = {};
    this.openModal = false;
    this.textToSpeech('Medikament wurde gespeichert');
  }

  cancel(): void {
    this.temp = {};
    this.openModal = false;
    this.speechService.speack('Medikament erfassen wird abgebrochen');
  }

  textToSpeech(text: string): void {
    this.speechService.speack(text);
  }

  speakHelp(): void {
    this.speechService.speack(this.helpText);
  }

  private qrCodeSuccessCallback(): any {
    return (decodedText: string, decodedResult: Html5QrcodeResult) => {
      if (decodedResult.result.format?.formatName === 'EAN_13') {
        this.scanMedikament(decodedText);
        this.html5QrCode.stop();
      }
    };
  }

  private qrcodeErrorCallback(): any {
    return (decodedText: string, decodedResult: Html5QrcodeResult) => {
      //
    };
  }
  private scanMedikament(barcode: string): void {
    this.dataService.getMedikamentByBarcode(barcode).subscribe((result) => {
      this.textToSpeech(result?.bezeichnungMedikament);

      if (result) {
        this.openModal = true;
        this.temp = result;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.html5QrCode.isScanning) {
      this.html5QrCode.stop();
    }
  }
}
