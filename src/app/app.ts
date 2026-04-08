import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicGridComponent } from "./Components/public-grid/public-grid";

@Component({
  selector: 'app-root',
<<<<<<< HEAD
  imports: [RouterOutlet, PublicGridComponent],
=======
  standalone: true,
  imports: [RouterOutlet],
>>>>>>> fc14b0f35c0557d984090298f81f34f57ed4a61d
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('lostAndFound');
}
