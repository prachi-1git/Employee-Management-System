import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import {  Observable, throwError } from 'rxjs';
import { GlobalConstantsService } from '../Services/global-constants.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectTestService {
  DeleteUserDefinitionInfo(ID: number,Name: string, State: string, Gender: string, Salary: string, MobileNo: string) {
    throw new Error('Method not implemented.');
  }

  myform!: FormGroup;
  private heroesUrl = '';
  private apiURL = GlobalConstantsService.apiURL;

  constructor(private http: HttpClient,private _httpClient: HttpClient,private _formBuilder: FormBuilder){}

  DeleteTableDefinition(ID: number,Name: string, State: string, Gender: string, Salary: string, MobileNo: string):Observable<string>
  {
   
    this.heroesUrl = this.apiURL + "TableDefinition/DeleteTableDefinition/"+ID;
    
    return this._httpClient.post<string>(this.heroesUrl,'',{});
  }

  GetTableDefinition():Observable<string>
  {
    this.heroesUrl = this.apiURL + "CommonTable/GetTableDefinition";
    return this._httpClient.get<string>(this.heroesUrl);
    
  }

  InsertUpdateTableDefinition(ID:number,Name:string,State:string,Gender:string,Salary:string, MobileNo: string) {
    
    
    this.heroesUrl = this.apiURL+"TableDefinition/InsertUpdateTableDefinition/"+ID+"/"+Name+"/"+State+"/"+Gender+"/"+Salary+"/"+MobileNo;
    return this._httpClient.post<string>(this.heroesUrl,'',{});
      
    }
 
}
