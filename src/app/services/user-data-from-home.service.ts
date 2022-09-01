import { Injectable } from '@angular/core';

interface tempDataType {
  name:string,
  age:number,
  id:number
}

@Injectable({
  providedIn: 'root'
})
export class UserDataFromHomeService {
  userServiceData:any = [{}];
  constructor() { }

  setUserDataInService(data:any){
    this.userServiceData = data;
    console.log("Service Data : ", this.userServiceData);    
  }

  getDataTemp(){
    let data:tempDataType = {
      name: 'Bilal',
      age:20,
      id:10
    }
    return data;
  }

}
