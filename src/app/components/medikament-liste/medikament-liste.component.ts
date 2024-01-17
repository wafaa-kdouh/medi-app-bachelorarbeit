import { Component } from '@angular/core';
import { SpeechService } from 'src/app/services/speech.service';

@Component({
  selector: 'app-medikament-liste',
  templateUrl: './medikament-liste.component.html',
  styleUrls: ['./medikament-liste.component.scss'],
})
export class MedikamentListeComponent {
  items = JSON.parse(window.localStorage.getItem('mediApp') as string);
  private readonly helpText =
    'Für Hilfe, drücke den Button, um den gewünschten Text über den Lautsprecher zu hören. Wenn du Informationen über Medikamente benötigst, drücke auf das Lautsprecher-Symbol und höre sie dir an.';

  constructor(private speechService: SpeechService) {}

  textToSpeech(text: string): void {
    this.speechService.speack(text);
  }

  delete(text: string, index: number): void {
    this.items.splice(index, 1);
    window.localStorage.setItem('mediApp', JSON.stringify(this.items));
    this.speechService.speack(text + ' wurde gelöscht');
  }

  speakHelp(): void {
    this.speechService.speack(this.helpText);
  }
}
