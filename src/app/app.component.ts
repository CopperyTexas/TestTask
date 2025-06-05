import { Component } from '@angular/core';
import { LibrarySearchComponent } from './components/library-search/library-search.component';

@Component({
  selector: 'app-root',
  imports: [LibrarySearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
