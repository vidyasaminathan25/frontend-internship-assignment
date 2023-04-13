import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
export class SearchResultComponent implements OnInit,OnChanges,AfterViewInit {

  @Input() item :any;
  displayedColumns: string[] = ['title', 'name', 'year'];
  dataSource :any;
  isLoading: boolean = true;
  @ViewChild("paginator") paginator?: MatPaginator;
  
  

  constructor(
       private searchService:SearchService
  ) {}


  getSearchData(searchKey:string) {
    this.searchService.getSearchData(searchKey).subscribe((data) => {
      
      this.isLoading = false;
      console.log(data)
      this.dataSource=new MatTableDataSource(data.docs);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges):void{
    if(changes["item"].currentValue){
        this.getSearchData(changes["item"].currentValue)
       // this.dataSource.paginator = this.paginator;
    }
    else{
      // if(this.dataSource)
      // {
        this.dataSource='';
      //}
    }
    console.log(changes)
    console.log(changes["item"])

  }
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

}
