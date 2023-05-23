import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { GlobalConstantsService } from '../Services/global-constants.service';
import { ProjectTestService } from '../Services/project-test.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

export class UserDefinitionMasterInfo {
  public ID: number = -1;
  public Name: string = "";
  public State: string = "";
  public Gender: string = "";
  public Salary: string = "";
  public MobileNo: string = "";
}


@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {


  // startDate = new Date(2000, 0, 1);

  objUserDefinition!: UserDefinitionMasterInfo[];
  reportPrintObj!: UserDefinitionMasterInfo;
  reportPrintObjList: UserDefinitionMasterInfo[] = [];

  objUserDefinitionMasterInfoList!: UserDefinitionMasterInfo[];
  ID: number = -1;
  Name: string = "";
  State: string = "";
  Gender: string = "";
  Salary: string = "";
  MobileNo: string = "";

  StrID!: string;
  StrName!: string;
  StrState!: string;
  StrGender!: string;
  StrSalary!: string;
  StrMobileNo!: string;

  stringJson: string = "";
  StrStatus: string = "";
  StrErrorMsg: string = "";
  dataSource = new MatTableDataSource<UserDefinitionMasterInfo>();


  BtnSaveUpdateText: string = "Save";
  displayedColumns: string[] = ['action', 'Name', 'State', 'Gender', 'Salary', 'MobileNo'];

  @ViewChild(MatSort) matSort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  sort!: MatSort;

  myform!: FormGroup;
  notification: any;
  data: any;

  private _onDestroy = new Subject<void>();
  protected _onDestroys = new Subject();

  constructor(private http: HttpClient, private router: Router, public _ProjectTestService: ProjectTestService, private _GlobalConstantsService: GlobalConstantsService, private _formBuilder: FormBuilder) {
    //this.myform=this.reactiveForm(); 
  }

  ngOnDestroy(): void {
    console.log('Method not implemented.');
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("SessionToken") === null) {
      this.router.navigate(['/login']);
    }
    this._GlobalConstantsService.CheckSessionIsRuningOrNot();
    this.ViewUserDefinitionInfo();
    this.reactiveForm();
    this.GetUserDefinitionInfoListUsgSPByFilter();
  }

  reactiveForm() {
    this.myform = this._formBuilder.group({
      ID: [-1, [Validators.required]],
      Name: ['', Validators.required],
      State: ['', [Validators.required,]],
      Gender: ['', [Validators.required,]],
      Salary: ['', [Validators.required,]],
      MobileNo: ['', [Validators.required,]],
    });
  }

  ViewUserDefinitionInfo() {
    this.StrID = '-1';
    this.StrName = '';
    this.StrState = '';
    this.StrGender = '';
    this.StrSalary = '';
    this.StrMobileNo = '';

    this._ProjectTestService.GetTableDefinition().subscribe((response) => {
      this.stringJson = JSON.stringify(response);
      console.log(this.stringJson + 'm');
      this.objUserDefinitionMasterInfoList = JSON.parse(this.stringJson);
      console.log(this.objUserDefinitionMasterInfoList);
      this.dataSource.data = this.objUserDefinitionMasterInfoList;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
    }, (error) => {
      console.log(error);
    });
  }

  GetUserDefinitionInfoListUsgSPByFilter() {
    this.StrID = '-1';
    this.StrName = '';
    this.StrState = '';
    this.StrGender = '';
    this.StrSalary = '';
    this.StrMobileNo = '';

    this._ProjectTestService.GetTableDefinition().subscribe((response) => {

      this.stringJson = JSON.stringify(response);
      this.objUserDefinitionMasterInfoList = JSON.parse(this.stringJson);
      this.dataSource.data = this.objUserDefinitionMasterInfoList;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
    }, (error) => {
      console.log(error);
    });
  }





  onInsertUpdateUserDefinitionInfoClick() {
    this.ID = this.myform.get("ID")?.value;
    this.Name = this.myform.get("Name")?.value;
    this.State = this.myform.get("State")?.value;
    this.Gender = this.myform.get("Gender")?.value;
    this.Salary = this.myform.get("Salary")?.value;
    this.MobileNo = this.myform.get("MobileNo")?.value;

    if (this.Name == "" || this.Name == null) {
      Swal.fire('Please Enter Name!');
      return false;
    }

    if (this.State == "" || this.State == null) {
      Swal.fire('Please Enter State!');
      return false;
    }

    if (this.Gender == "" || this.Gender == null) {
      Swal.fire(this.Gender + 'Please Enter Gender!');
      return false;
    }

    if (this.Salary == "" || this.Salary == null) {
      Swal.fire('Please Enter Salary!');
      return false;
    }

    if (this.MobileNo == "" || this.MobileNo == null) {
      Swal.fire('Please Enter MobileNo!');
      return false;
    }




    this._ProjectTestService.InsertUpdateTableDefinition(this.ID, this.Name, this.State, this.Gender, this.Salary, this.MobileNo).subscribe((data: any) => {
      this.StrErrorMsg = data;
      console.log(data);
      if (this.StrErrorMsg == "Record Already Exists!") {
        Swal.fire(this.StrErrorMsg);
      }
      else {
        if (this.ID == -1) {
          Swal.fire('Data Added Successfully!');
        }
        else {
          Swal.fire('Data updated Successfully!');
        }
        this.GetUserDefinitionInfoListUsgSPByFilter();
      
      }
    });

    return false;
  }





  get f() {
    return this.myform.controls;
  }

  onClearUserDefinitionInfo() {
    this.BtnSaveUpdateText = "Save";
    this.myform.reset();
    this.reactiveForm();
  }

  EditUserDefinitionInfo(objuserDefinationMasterInfo: UserDefinitionMasterInfo) {
    this.myform.controls['ID'].setValue(objuserDefinationMasterInfo.ID);
    this.myform.controls['Name'].setValue(objuserDefinationMasterInfo.Name);
    this.myform.controls['State'].setValue(objuserDefinationMasterInfo.State);
    this.myform.controls['Gender'].setValue(objuserDefinationMasterInfo.Gender);
    this.myform.controls['Salary'].setValue(objuserDefinationMasterInfo.Salary);
    this.myform.controls['MobileNo'].setValue(objuserDefinationMasterInfo.MobileNo);

    console.log(objuserDefinationMasterInfo);
    this.BtnSaveUpdateText = "Update";
  }

  onDeleteUserDefinitionInfo(ID: number, index: number) {
    if (sessionStorage.getItem("SessionToken") === null) {
      this.router.navigate(['/login']);
    }
    var Name = sessionStorage.getItem('Name') as string;
    var State = sessionStorage.getItem('State') as string;
    var Gender = sessionStorage.getItem('Gender') as string;
    var Salary = sessionStorage.getItem('Salary') as string;
    var MobileNo = sessionStorage.getItem('MobileNo') as string;


    Swal.fire({
      title: 'Are you want to sure delete?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._ProjectTestService.DeleteTableDefinition(ID, Name, State, Gender, Salary,MobileNo).subscribe(() => {
          this.dataSource.data = this.dataSource.data.filter(
            (objuserDefinitionMasterInfo: UserDefinitionMasterInfo) => objuserDefinitionMasterInfo.ID !== ID
          );
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );

        this.onClearUserDefinitionInfo();
      }
    })

  }

}