import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { SpeechService } from 'src/app/services/speech.service';
import { Html5Qrcode, Html5QrcodeResult } from 'html5-qrcode';
import { BarcodeFormat } from '@zxing/library';

@Component({
  selector: 'app-medikament-scanner',
  templateUrl: './medikament-scanner.component.html',
  styleUrls: ['./medikament-scanner.component.scss'],
})
export class MedikamentScannerComponent implements OnInit, OnDestroy {
  scannerOpen = false;
  private html5QrCode!: Html5Qrcode;
  private readonly helpText =
    'für Hilfe,Verwenden Sie den integrierten Scanner, um den Barcode des Medikaments zu scannen';

  constructor(
    private dataService: DataService,
    private speechService: SpeechService
  ) {}

  ngOnInit(): void {
    this.html5QrCode = new Html5Qrcode('reader');
  }

  ngOnDestroy(): void {
    if (this.html5QrCode.isScanning) {
      this.html5QrCode.stop();
    }
  }

  speakHelp(): void {
    this.speechService.speack(this.helpText);
  }

  toggleScanner(): void {
    this.scannerOpen = !this.scannerOpen;
    if (this.scannerOpen) {
      this.startBarcodeScanner();
    } else {
      this.stopBarcodeScanner();
    }
  }

  private startBarcodeScanner(): void {
    const config = { fps: 10, qrbox: { width: 400, height: 400 } };
    const macId =
      '0de0ec42323600326631940c78847141bf3fd4525555b0eb0646c42d6fbc3943';

    this.html5QrCode.start(
      { facingMode: 'environment' },
      config,
      this.qrCodeSuccessCallback(),
      this.qrcodeErrorCallback()
    );

    this.scannerOpen = true;
  }

  private stopBarcodeScanner(): void {
    this.html5QrCode.stop().then(() => {
      this.html5QrCode.clear();
    });

    this.scannerOpen = false;
  }

  private qrCodeSuccessCallback(): any {
    return (decodedText: string, decodedResult: Html5QrcodeResult) => {
      if (decodedResult.result.format?.formatName === 'EAN_13') {
        this.scanMedikament(decodedText);

        this.html5QrCode.pause();
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
      if (result) {
        this.speechService.speack(result.bezeichnungMedikament, () =>
          this.html5QrCode.resume()
        );
      }
    });
  }
}
