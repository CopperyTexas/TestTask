export interface LibraryCell {
  FullName: string;
  ObjectAddress?: Array<{
    Address?: string;
  }>;
  [key: string]: any;
}

export interface Library {
  Cells: LibraryCell;
  [key: string]: any;
}
