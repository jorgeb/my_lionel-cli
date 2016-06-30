import { Inject, OnInit } from '@angular/core';
import { Http, HTTP_PROVIDERS } from '@angular/http';

import { LvApiUrlService } from './lv-api-url.service';

export class LvApiService implements OnInit{

  private API = 'http://localhost:3000/api';

  constructor (@Inject(Http) private http:Http) {}

  private callApi = (url:string) => {

    return this.http.get(url).
      map(data => {
        if(data && data.json().success)
          return data.json().data;
        else
          return null;
    });
  };

  public get = (parts:Array<string>) => {

    let apiUrl = new LvApiUrlService(this.API);
    apiUrl.addParts(parts);

    return this.callApi( apiUrl.build() );
  };

  ngOnInit(){

    /*
     auction_item/1/count
    this.http.get().subscribe(
      data => {
        console.log(data);
      }
    )*/
  }

}


export const LvApiServiceProviders = [
  LvApiService,
  HTTP_PROVIDERS
];
