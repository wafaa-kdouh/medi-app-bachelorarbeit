import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map, mergeAll, of } from 'rxjs';
import { SpeechService } from './speech.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly barcodeRegex = /^7680([0-9]{5})([0-9]{3})[0-9]$/;

  constructor(private http: HttpClient, private speechService: SpeechService) {}

  getMedikamentByBarcode(barcode: string): Observable<any> {
    return this.http.get<any[]>('assets/data.json').pipe(
      map((med: any) => {
        const match = barcode.match(this.barcodeRegex);

        if (match == null) {
          this.speechService.speack('Barcode nicht erkannt');
          return null;
        }

        return med;
      }),
      map((med: any) => {
        if (!med) {
          return of(null);
        } else {
          const match = barcode.match(this.barcodeRegex) as RegExpMatchArray;
          const inDatabase = med.some(
            (item: any) => item.zulassungsNummer !== match[1]
          );

          if (!inDatabase) {
            this.speechService.speack('Medikament nicht gefunden');
            return false;
          } else {
            return med.filter(
              (item: any) =>
                item.zulassungsNummer == match[1] &&
                item.packungscode == match[2]
            );
          }
        }
      }),
      mergeAll()
    );
  }

  private isScanningMedikament(med: any, barcode: string): boolean {
    const match = barcode.match(this.barcodeRegex);
    if (!match) {
      return false;
    } else {
      const { zulassungsNummer, packungscode } = med;
      return zulassungsNummer == match[1] && packungscode == match[2];
    }
  }
}
