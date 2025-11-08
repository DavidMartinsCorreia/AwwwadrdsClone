import { Component, signal } from '@angular/core';
import { HeroComponent } from './Components/Hero/Hero.component';
import { ButtonComponent } from "./Components/Button/Button.component";
@Component({
  selector: 'app-root',
  imports: [HeroComponent, ButtonComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('AwwwardsClone');
}
