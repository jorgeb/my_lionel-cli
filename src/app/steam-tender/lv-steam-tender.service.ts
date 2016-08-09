import { Component,
  Injectable,Inject } from '@angular/core';

import {Observable} from 'rxjs/Rx'; 

import {  BS_VIEW_PROVIDERS } from 'ng2-bootstrap/ng2-bootstrap';
import { LvApiService, LvApiServiceProviders } from '../shared/lv-api/lv-api.service';
import { LV_CAROUSEL_DIRECTIVES } from '../shared/lv-my-lionel-stock-img/lv-carousel.component';
import { ModalDirective, MODAL_DIRECTVES } from 'ng2-bootstrap/ng2-bootstrap';

@Injectable()
export class LvSteamTenderService {
  private results:any;
  
  constructor (@Inject(LvApiService) private lvApiService: LvApiService) {
      
    let query: Array<string> = [];
    query.push('tender');
    query.push('my-steam-tender');

    this.results = this.lvApiService.get(query);

  }
  
  
  private myLocos = (data):Array<any> => {
      let ret = [];
      
      data.forEach(st => {

          if (st.loco_img_url) {
              let img = ret.find(i => {
                  return (st.loco_img_url === i.loco_img_url);
              });

              if (typeof img === 'undefined') {

                  ret.push(st);
              }
          }
      });

      return ret;
  };
  
  private myTenders = (data): Array<any> => {
      let ret = [];

      data.forEach(st => {

          if (st.tender_img_url) {
              let img = ret.find(i => {
                  return (st.tender_img_url === i.tender_img_url);
              });

              if (typeof img === 'undefined') {

                  ret.push(st);
              }
          }
      });

      return ret;
  };

  private mySteamTenders = (data, locoId): Array<any> => {
      return this.myTenders(
        data.filter( st => {
            
            return st.tender_img_url && (st.lionel_id === locoId);
        }));
  };

  private mySteamByTender = (data, tenderId): Array<any> => {
      return this.myLocos(
        data.filter( st => {
            
            return st.loco_img_url && (st.lionel_tender_id === tenderId);
        }));
  };

 public getByTenderSteamImages = (tenderId) => {

      return Observable.create(observer => {
          this.results.map(data => {
              return this.mySteamByTender(data,tenderId);
          }).subscribe(data => {
              observer.next(data);
              observer.complete();
          });
      });
  };


  public getBySteamTenderImages = (locoId) => {

      return Observable.create(observer => {
          this.results.map(data => {
              return this.mySteamTenders(data,locoId);
          }).subscribe(data => {
              observer.next(data);
              observer.complete();
          });
      });
  };

  public getByTenderImages = () => {

      return Observable.create(observer => {
            this.results.map(data => {
                return this.myTenders(data);
            }).subscribe(data => {
                observer.next(data);
                observer.complete();
            });  
      });      
  };
  
  public getByLocoImages = () => {

      return Observable.create(observer => {
            this.results.map(data => {
                return this.myLocos(data);
            }).subscribe(data => {
                observer.next(data);
                observer.complete();
            });  
      });      
  };
  
  private posibleTender = (data,locoId):Array<any> => {
      let ret = [];
      
      data.filter (st => {
          
          return st.lionel_id === locoId;
      })
      .forEach(st => {

        let img = ret.find(i => {
            return (st.lionel_tender_id === i.lionel_tender_id);
        });

        if (typeof img === 'undefined') {

            ret.push(st);
        }

      });

      return ret;
  };

  private myBox = (data,steamTender) => {
    return data.find( b => {
       return (b.tender_in_loco == steamTender.loco_my_lionel_items_id) && b.loco_with_tender 
    });  
  };
  
  public getTenderBox = (steamTender) => {
       return Observable.create(observer => {
            this.results.map(data => {
                return this.myBox(data,steamTender);
            }).subscribe(data => {
                observer.next(data);
                observer.complete();
            });  
      });      
  }
 
  public getByLocoPosibleTenders = (locoId) => {

      return Observable.create(observer => {
            this.results.map(data => {
                return this.posibleTender(data,locoId);
            }).subscribe(data => {
                observer.next(data);
                observer.complete();
            });  
      });      
  };
 
};

export const LvSteamTenderServiceProviders = [
  LvSteamTenderService
];