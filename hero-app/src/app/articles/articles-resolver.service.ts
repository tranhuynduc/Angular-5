import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { map, take }              from 'rxjs/operators';
 
import { RestService } from '../rest.service';
import { Article } from '../article';
 
@Injectable()
export class ArticlesResolver implements Resolve<any> {
 
  constructor(
    private restService: RestService,
    private router: Router
    
  ) { }
  resolve(route: ActivatedRouteSnapshot) {
    return this.restService.getData('articles').pipe(
      map(data => {
        console.log('mapdata', data);
        return data;
      })
    );
  }
}