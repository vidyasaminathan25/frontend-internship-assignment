import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
//import { BookResponse } from 'src/app/core/models/book-response.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private apiService: ApiService) {}

  getSearchData(searchKey: string): Observable<any> {
    //const limit = 10;
    return this.apiService.get(`/search.json?q=${searchKey.toLowerCase().split(' ').join('+')}&fields=title,author_name,first_publish_year`);
  }
}