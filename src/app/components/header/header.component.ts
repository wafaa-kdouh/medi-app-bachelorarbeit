import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { SpeechService } from 'src/app/services/speech.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
    `
      :host {
        padding: 1rem;
      }
    `,
  ],
})
export class HeaderComponent {
  selectedLanguage: string = 'en';
  constructor(private translate: TranslateService) {
    // Setze die Standard-Sprache
    translate.setDefaultLang('en'); // Zum Beispiel Englisch
  }

  changeLanguage(event: Event) {
    const selectedLanguage = (event.target as HTMLSelectElement).value;
    this.translate.use(selectedLanguage);
  }
}
