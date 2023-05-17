import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) {}
  
  async addEmployee(data: any): Promise<Observable<any>> {

   const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    
     const response = this.http.post<any>('https://emp16.azurewebsites.net/employee', JSON.stringify(data), httpOptions)
    

     
    return response
    
  }
  employeeupdate(id:number,data:any): Observable<any>{
    return this.http.put(`https://emp16.azurewebsites.net/employee/${id}`,data);
   }
  getEmployeeList():Observable<any> {
    return this.http.get('https://emp16.azurewebsites.net/employee');
  }
  employeedelete(id:number): Observable<any>{
    return this.http.delete(`https://emp16.azurewebsites.net/employee/${id}`);
  }
}
