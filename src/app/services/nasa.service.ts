
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NasaService {

  constructor(private http: HttpClient) {}

  getNasaData(myDate: string){
      return this.http.get(("https://api.nasa.gov/EPIC/api/natural/date/" + myDate + "?api_key=awx5urW97lj9lILIMBCKBeHo3YtSh2F6j9SjZkZx"))
  }

}