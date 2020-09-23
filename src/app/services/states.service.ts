import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  private _url:string = "assets/data/states.json"
  constructor( private httpClint:HttpClient) { }

  getStates(): Observable<any[]>{
    console.log(this._url)
    return this.httpClint.get<any[]>(this._url);
}

}
