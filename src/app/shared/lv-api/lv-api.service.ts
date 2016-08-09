import { Inject, OnInit } from '@angular/core';
import { Http, HTTP_PROVIDERS, Headers, RequestOptions } from '@angular/http';

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

  private callPost = (url:string, data:any) => {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    
    return this.http.post(url,
      JSON.stringify(data),
      options).
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

  public post = (parts:Array<string>, data:any) => {

    let apiUrl = new LvApiUrlService(this.API);
    apiUrl.addParts(parts);

    return this.callPost( apiUrl.build(), data );
  };

  ngOnInit(){

  }

}


export const LvApiServiceProviders = [
  LvApiService,
  HTTP_PROVIDERS
];
