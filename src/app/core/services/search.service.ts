import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { SearchResponse } from '../models/search-response.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private apiService: ApiService) {}

  getSearchData(
    searchKey: string,
    offset: number,
    limit: number
  ): Observable<SearchResponse> {
    return this.apiService.get(
      `/search.json?q=${searchKey
        .toLowerCase()
        .split(' ')
        .join('+')}&offset=${offset}&limit=${limit}`
    );
  }
}
