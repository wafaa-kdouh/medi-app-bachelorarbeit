import { Component } from '@angular/core';
import { SpeechService } from 'src/app/services/speech.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private speechService: SpeechService) {}

  textToSpeech(text: string): void {
    this.speechService.speack(text);
  }
}
