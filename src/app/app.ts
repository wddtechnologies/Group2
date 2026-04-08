import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicGridComponent } from "./Components/public-grid/public-grid";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PublicGridComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('lostAndFound');
}
