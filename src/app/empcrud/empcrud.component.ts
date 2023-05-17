import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormBuilder , Validators, FormsModule} from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { MatDialogRef,MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { outputAst } from '@angular/compiler';
import message from 'sweetalert2';
@Component({
  selector: 'app-empcrud',
  templateUrl: './empcrud.component.html',
  styleUrls: ['./empcrud.component.scss']
})
export class EmpcrudComponent implements OnInit {
  empcrudForm:FormGroup;
 es: EmployeeService;

constructor(private _fb: FormBuilder,
  private DialogRef: MatDialog,
  service: EmployeeService,
  private matref: MatDialogRef<EmpcrudComponent>,
  @Inject(MAT_DIALOG_DATA) public data:any) {
    
    this.es=service
  this.empcrudForm=this._fb.group({
    id:0,
    name:['',Validators.required],
    email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    age:['0',Validators.required],
    gender:['',Validators.required],
    department:['',Validators.required],
    phno:['',[Validators.required,]]
  })
}
ngOnInit(): void {
  this.empcrudForm.patchValue(this.data);
}
get c(){
  return this.empcrudForm.controls;
}

  async OnempcrudSubmit(){

    if(this.empcrudForm.valid){
    if(this.data){
   
     (await this.es.employeeupdate(this.data.id, this.empcrudForm.value)).subscribe({
        next:(val:any)=>{
          message.fire('Employee detail Updated successfully');
          this.matref.close(true);
        },
        error:(err:any)=>{
          console.error(err);
        },
      });
    }
    else{
   (await this.es.addEmployee(this.empcrudForm.value)).subscribe({   
   
    next:(val:any)=>{
      message.fire('Employee added successfully');
      this.matref.close(true);
    },
    error:(err:any) => {
      console.error(err);
    },
   });
  }
}
  }
  reset(){
    this.empcrudForm.patchValue(this.data);
    
  }
  clear(){
    // this.empcrudForm.setValue({
    //   id:0,
    // name:'',
    // email:'',
    // age:0,
    // gender:'',
    // department:'',
    // phno:''
    //})
    this.matref.close(true);
    this.DialogRef.open(EmpcrudComponent);
  }
}