import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'front-end-internship-assignment-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit,OnChanges {

  @Input() item :any;
  
  isLoading: boolean = true;

  subjectName: string = '';

  constructor(
       private searchService:SearchService
  ) {}


  getSearchData(searchKey:string) {
    this.searchService.getSearchData(searchKey).subscribe((data) => {
      
      this.isLoading = false;
      console.log(data)
    });
  }
  
  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges):void{
    if(changes["item"].currentValue){
        this.getSearchData(changes["item"].currentValue)
    }
    console.log(changes)
    console.log(changes["item"])

  }

}
