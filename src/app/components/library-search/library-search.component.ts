import { Component, inject, OnInit } from '@angular/core';
import { LibraryService } from '../../services/library.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibraryCardComponent } from '../library-card/library-card.component';
import { Library } from '../../interfaces/library.model';

@Component({
  selector: 'app-library-search',
  standalone: true,
  imports: [CommonModule, FormsModule, LibraryCardComponent],
  templateUrl: './library-search.component.html',
  styleUrl: './library-search.component.css',
})
export class LibrarySearchComponent implements OnInit {
  searchItem: string = '';
  allLibraries: Library[] = [];
  filteredLibraries: Library[] = [];
  selectedLibrary: Library | null = null;

  private libraryService = inject(LibraryService);

  ngOnInit(): void {
    this.libraryService.getLibraries().subscribe((data) => {
      this.allLibraries = data;
      console.log('Все библиотеки:', this.allLibraries);
    });
  }

  onSearch() {
    const item = this.searchItem.trim().toLowerCase();
    if (!item) {
      this.filteredLibraries = [];
      this.selectedLibrary = null;
      return;
    }
    this.filteredLibraries = this.allLibraries.filter((lib) => {
      const fullName = (lib.Cells.FullName || '').toLowerCase();
      return fullName.includes(item);
    });
    console.log(
      'Поиск по слову ' + item,
      'Найдено библиотек: ' + this.filteredLibraries.length,
    );
    this.selectedLibrary = null;
  }

  selectLibrary(lib: any | null) {
    this.selectedLibrary = lib;
  }
  // метод для разбивки вводимого текста на фрагменты, чтобы подсветить совпадения, использую регулярыне выражения.
  splitText(
    text: string,
    keyword: string,
  ): { text: string; highlight: boolean }[] {
    if (!keyword) {
      return [{ text, highlight: false }];
    }

    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'i');
    const parts = text.split(regex);

    return parts.map((part) => ({
      text: part,
      highlight: part.toLowerCase() === keyword.toLowerCase(),
    }));
  }
}
