import { Component } from '@angular/core';
import { EmployeeService } from './shared/employee.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  idEmployee : number
  employees : any = null

  constructor(public employeeService:EmployeeService){}

  getEmployees(){
    Swal.showLoading();
    let context = this;
    return this.employeeService.GetEmployees(this.idEmployee).subscribe((data: {}) => {
      context.employees = data
      Swal.close();
    })
  }
}
