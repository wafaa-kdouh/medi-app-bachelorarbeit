import { Injectable } from '@angular/core';

type PropertyName = keyof Pick<
  SpeechSynthesisUtterance,
  'rate' | 'pitch' | 'text'
>;
type SpeechProperties = { name: PropertyName; value: string };

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    this.getVoicesInitially();
  }

  getVoicesInitially(): void {
    const speechSynthesis = window.speechSynthesis;
    window.speechSynthesis.onvoiceschanged = () => {
      const voices = speechSynthesis.getVoices();
      const german = voices.filter((voice) => voice.lang.includes('de'));
      this.setVoices(german);
    };
  }

  setVoices(voices: SpeechSynthesisVoice[]): void {
    this.voices = voices;
  }

  speack(text: string, callBack?: Function): void {
    const speech = this.makeRequest(text);
    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
    speech.onend = (_) => callBack?.();
  }

  private findVoice(): SpeechSynthesisVoice | null {
    const voice = this.voices.find((voic) => voic.name === 'Google Deutsch');
    return voice ? voice : null;
  }

  private makeRequest(text: string) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.voice = this.findVoice();

    // speech.onboundary = (event) => console.log('boundary', event);
    // speech.onend = (event) => console.log('onend', event);
    // speech.onerror = (event) => console.log('onerror', event);
    // speech.onmark = (event) => console.log('onmark', event);
    // speech.onstart = (event) => console.log('onstart', event);

    return speech;
  }
}
