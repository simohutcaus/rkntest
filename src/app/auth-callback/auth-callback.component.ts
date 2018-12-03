import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, NavigationCancel, ActivatedRoute, Params } from '@angular/router';
import { URLSearchParams } from '@angular/http';
import { Http, RequestOptions, Headers, Response} from '@angular/http';
import * as qs from 'querystring';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.css']
})




export class AuthCallbackComponent implements OnInit {
  public accesstoken:any;


  constructor(private http: Http, public router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute) {
   }

  response: string;
  public rknresponse: any;
  public rkninvoice:any;
  arrBirds: string [];
  aarBirds2:any;
  public book:any;
 

  ngOnInit() {
    this.authService.completeAuthentication().then(t => {
      console.log('token in component', t);
      this.accesstoken = t;
    //  let header = new Headers({ 'Authorization': 'Bearer '  + this.accesstoken});
    //let options = new RequestOptions({ headers: header});
    //this.http.get("https://api.reckon.com/r1/cashbooks", options)
     //     .subscribe(response => this.response = response.text())
    this.getData();
    //this.getData2();
    });
  }

  getData() {
    let header = new Headers({ 'Authorization': 'Bearer '  + this.accesstoken});
    let options = new RequestOptions({ headers: header});
    this.http.get("https://api.reckon.com/r1/cashbooks", options)
          .subscribe(response => {
            this.rknresponse = response.json();
            console.log(response);
          }, error => {
            console.log(error);
          }, () => {
            console.log(this.rknresponse[3].BookId);
            this.book = (this.rknresponse[3].BookId);
            console.log(this.book);
            this.getData3();
          })
          this.getData2();
          

  }

  getData2() {
    let header = new Headers({ 'Authorization': 'Bearer ' + this.accesstoken});
    let options = new RequestOptions({headers: header});
    this.http.get("https://api.reckon.com/r1/cashbooks", options)
      .subscribe(data => {
        this.arrBirds = data.json();
        console.log(this.arrBirds + ' This is aarbirds');
      })
  }

  getData3() {
    let header = new Headers({ 'Authorization': 'Bearer '  + this.accesstoken});
    let options = new RequestOptions({ headers: header});
    this.http.get("https://api.reckon.com/r1/" + this.book + "/invoices", options)
          .subscribe(response => {
            this.rkninvoice = response.json();
            console.log(response);
          }, error => {
            console.log(error);
          }, () => {
            console.log(this.rkninvoice[3].InvoiceNumber);
            this.book = (this.rkninvoice[3].InvoiceNumber);
            console.log(this.book);
            
          })
          
          

  }
}
