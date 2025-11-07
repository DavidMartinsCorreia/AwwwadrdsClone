import { Component, signal } from '@angular/core';
import { HeroComponent } from './Components/Hero/Hero.component';
@Component({
  selector: 'app-root',
  imports: [HeroComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AwwwardsClone');
}
