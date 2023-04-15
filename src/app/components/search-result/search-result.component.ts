import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Doc } from 'src/app/core/models/search-response.model';
import { SearchService } from 'src/app/core/services/search.service';

export interface Element {
  name: string;
  title: string;
  year: number;
}

@Component({
  selector: 'front-end-internship-assignment-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() item: any;
  value: string = '';
  docs: Doc[] = [];
  totaldocs: number = 0;
  numberofPages: number = 0;
  limit: number = 10;
  pageIndex: number = 0;
  offset: number = 0;
  displayedColumns: string[] = ['title', 'name', 'year'];
  dataSource: any;
  isLoading: boolean = true;
  @ViewChild('paginator') paginator?: MatPaginator;

  constructor(private searchService: SearchService) {}

  getSearchData(searchKey: string) {
    this.searchService
      .getSearchData(searchKey, this.offset, 10)
      .subscribe((data) => {
        this.isLoading = false;
        //this.docs = data?.docs;
        //this.docs.length = data?.numFound;
        //this.numberofPages = Math.ceil(data?.numFound / this.limit);
        //this.paginator?.length= data?.numFound;
        this.dataSource = new MatTableDataSource(data?.docs);
        this.totaldocs = data?.numFound;
        this.dataSource.paginator = this.paginator;
      });
  }

  pageChange(event: PageEvent) {
    console.log(event);
    this.pageIndex = event.pageIndex;
    this.offset = this.pageIndex * this.limit;
    this.getSearchData(this.value);
  }
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['item'].currentValue) {
      this.value = changes['item'].currentValue;
      this.getSearchData(this.value);
      // this.dataSource.paginator = this.paginator;
    } else {
      // if(this.dataSource)
      // {
      this.dataSource = '';
      //}
    }
  }
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }
}
