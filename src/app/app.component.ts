import { Component,AfterViewInit ,ViewChild, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from './service/employee.service';
import { EmpcrudComponent } from './empcrud/empcrud.component';
import {MatTableDataSource} from '@angular/material/table';
import message from 'sweetalert2';
//import './bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor (private matlog: MatDialog,
    private empservice: EmployeeService){}
  ngOnInit(): void {
   this.getEmployeeList();
  }
    displayedColumns: string[] = ['id', 'name', 'email', 'age','gender','department','phno', 'action'];
  dataSource!: MatTableDataSource<any>;

  empcrudForm(){
  const logref =this.matlog.open(EmpcrudComponent);
  logref.afterClosed().subscribe({
    next:(val)=>{
      if(val){
        this.getEmployeeList();
      }
    }
  })
  }
  getEmployeeList(){
    this.empservice.getEmployeeList().subscribe({
      next:(res) =>{
        this.dataSource=new MatTableDataSource(res);
      },
      error:console.log,
    });
  }
  employeedelete(id: number){
    message.fire({
      title: 'Are you sure?',
      text: 'You want to delete this employee?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No ',
    }).then((res)=>{
      if(res.value){
        this.empservice.employeedelete(id).subscribe({
          next:(res) =>{
            // message.fire('Removed!', 'Data removed successfully.');
            this.getEmployeeList();  
      }})
    }
    else if (res.dismiss === message.DismissReason.cancel) {
      // message.fire('');
    }
  })
}
  openeditform(data:any){
 const logref=  this.matlog.open(EmpcrudComponent,{
    data,
  });
  logref.afterClosed().subscribe({
    next:(val) => {
if(val){
  this.getEmployeeList();
  }
    },
  });
}
}
