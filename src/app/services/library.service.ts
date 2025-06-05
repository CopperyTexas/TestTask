import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';
import { Library } from '../interfaces/library.model';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private http = inject(HttpClient);
  private apiUrl = `https://apidata.mos.ru/v1/datasets/526/rows?&api_key=${environment.myApiKey}`;
  //перед запуском необходимо создать свой environment.ts и вставить свой APIKEY (пример environment.example.ts)

  getLibraries() {
    return this.http.get<Library[]>(this.apiUrl).pipe(shareReplay(1));
  }
}
