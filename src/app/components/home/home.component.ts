import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { debounceTime, map, switchMap } from 'rxjs';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  bookSearch: FormControl;
  searchKey: string = '';
  offset: number = 0;
  limit: number = 10;
  dataSource: any = null;
  displayedColumns: string[] = ['title', 'name', 'year'];
  isLoading: boolean = false;
  pageIndex = 0;
  error: boolean = false;

  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private searchService: SearchService) {
    this.bookSearch = new FormControl('');
  }

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value: string) => {
          if (value) {
            this.isLoading = true;
            this.offset = 0;
            this.paginator ? (this.paginator.pageIndex = 0) : '';
            this.searchKey = value;
            return this.searchService.getSearchData(
              value,
              this.offset,
              this.limit
            );
          } else {
            this.dataSource = '';
            this.isLoading = false;
            this.searchKey = '';
            return '';
          }
        }),
        map((dataMapping) => {
          let mappedResponse = this.mapResponse(dataMapping);
          return mappedResponse;
        })
      )
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.dataSource = data;
        },
        (error) => {
          this.dataSource = '';
          this.isLoading = false;
          this.searchKey = '';
          this.error = true;
        }
      );
  }

  clearSearch() {
    this.bookSearch.reset();
    this.isLoading = false;
    this.searchKey = '';
  }
  mapResponse(data: any) {
    let mappedData: any = {};
    let works: any[] = [];
    mappedData.work_count = data.numFound;
    data?.docs.forEach((element: any, index: number) => {
      works[index] = [];
      works[index].authors = [];
      works[index].key = element.key;
      works[index].title = element.title;
      works[index].edition_count = element.edition_count;
      element?.author_key?.forEach((elementKey: any, indexKey: number) => {
        works[index].authors[indexKey] = [];
        works[index].authors[indexKey].key = elementKey;
      });
      element?.author_name?.forEach((elementName: any, indexName: number) => {
        works[index].authors[indexName].name = elementName;
      });
      works[index].first_publish_year = element.first_publish_year;
      works[index].public_scan = element.public_scan_b;
      works[index].has_fulltext = element.has_fulltext;
    });
    mappedData.works = works;
    return mappedData;
  }

  onPaginateChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.offset = this.pageIndex * this.limit;
    this.isLoading = true;
    this.searchService
      .getSearchData(this.searchKey, this.offset, this.limit)
      .pipe(
        map((dataMapping) => {
          let mappedResponse = this.mapResponse(dataMapping);
          return mappedResponse;
        })
      )
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.dataSource = data;
        },
        (error) => {
          this.dataSource = '';
          this.isLoading = false;
          this.searchKey = '';
          this.error = true;
        }
      );
  }
}
