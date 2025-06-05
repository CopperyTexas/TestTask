import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Library } from '../../interfaces/library.model';

@Component({
  selector: 'app-library-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './library-card.component.html',
  styleUrl: './library-card.component.css',
})
export class LibraryCardComponent {
  @Input() library!: Library;

  // использовал логику «ключ-значение», при которой значение разбивается на примитивные значения и массивы с объектами
  // в зависимости от этого отображаю по разному

  expanded: { [key: string]: boolean } = {};

  get entries(): [string, any][] {
    return Object.entries(this.library.Cells || {});
  }

  isPrimitive(value: any): boolean {
    return (
      value === null ||
      value === undefined ||
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    );
  }

  toggleExpand(key: string) {
    this.expanded[key] = !this.expanded[key];
  }

  isExpanded(key: string): boolean {
    return this.expanded[key];
  }
}
