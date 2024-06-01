import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { QuotesService } from '../services/quotes.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TabsetComponent } from 'ngx-bootstrap';
import { FlashMessagesService } from 'angular2-flash-messages';
import { formatDate } from 'ngx-bootstrap/chronos';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  quotesArray: any = [];
  updatedIndex: number;
  previousIndex: number;
  dataSource: Observable<any>;
  asyncSelected: string;
  success : boolean = false;
  danger : boolean = false;
  successText : boolean = false;
  dangerText : boolean = false;
  modalRef: BsModalRef;  
  quoteIndex;

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  formData = {
    symbol : "",
    currentPrice : "",
    limitPrice : "",
    qty : "",
    type : "",
    status: 0
  }

  constructor(private _quotesService: QuotesService, private authService: AuthService, private modalService: BsModalService, private flashMessage: FlashMessagesService) {

    this.dataSource = Observable.create((observer: any) => {
      this.asyncSelected
      this.authService.getQuoteList(this.asyncSelected).subscribe((res) => {
        observer.next(res);
      })
    });

    this._quotesService.subscributionReceived().subscribe(data => {
      this.quotesArray = data;
    });    
    
    this._quotesService.newQuotesReceived().subscribe(data => {

      this.quotesArray.forEach((element, index) => {
        if(element.symbol == data['symbol']){  
          // this.quotesArray[index] = data;                
          if (element.regularMarketPrice < data['regularMarketPrice']) {    
            this.quotesArray[index] = data;
              this.quotesArray[index]['bgSuccessClass'] = true;
              this.quotesArray[index]['bgDangerClass'] = false;
          } else if (element.regularMarketPrice > data['regularMarketPrice']) {                            
            this.quotesArray[index] = data;
              this.quotesArray[index]['bgSuccessClass'] = false;
              this.quotesArray[index]['bgDangerClass'] = true;              
          } 

          if (data['regularMarketPreviousClose'] < data['regularMarketPrice']) {    
              this.quotesArray[index]['colorSuccessClass'] = true;
              this.quotesArray[index]['colorDangerClass'] = false;
          } else if (data['regularMarketPreviousClose'] > data['regularMarketPrice']) {                            
              this.quotesArray[index]['colorSuccessClass'] = false;
              this.quotesArray[index]['colorDangerClass'] = true;              
          } 
        }
      });
    });     
  }

  ngOnInit() {
  }

  open(template, index) {
    this.quoteIndex = index;
    this.formData.symbol = this.quotesArray[index].symbol;
    this.formData.currentPrice = this.quotesArray[index].regularMarketPrice;
    this.formData.type = "Buy";
    this.modalRef = this.modalService.show(template);
  }

  tabSelect(event){
    this.formData.type = event.heading;
  }

  typeaheadOnSelect(event: TypeaheadMatch): void {
    this._quotesService.subscribeScript(event.item).subscribe((res) => {      
      if(res['success'] == true){          
        let stockAvailable = false;
        this.quotesArray.forEach((element, index) => {
            if(element.symbol == res['data']['symbol']){
                stockAvailable = true;
            }
        });
        if (stockAvailable == false) {
          this.quotesArray.push(res['data']); 
        }  
      } else if(res['success'] == false){        
          this.flashMessage.show(res['msg'], { cssClass: 'alert-danger', timeout: 3000 });         
      }                
    })
  }  

  trade(){
    console.log(this.formData);
    this._quotesService.trade(this.formData).subscribe((res) => {
        // console.log(res);
        this.flashMessage.show(res['msg'], { cssClass: 'alert-success', timeout: 3000 });    
    })
  }

}
