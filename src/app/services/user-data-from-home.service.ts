import { Injectable } from '@angular/core';
import io from 'socket.io-client';

interface tempDataType {
  name:string,
  age:number,
  id:number
}

@Injectable({
  providedIn: 'root'
})
export class UserDataFromHomeService {
  socket:any = null;
  userServiceData:any = [{}];
  constructor() {
    this.socket = io('http://localhost:5009');
      console.log("Socket", this.socket);
   }

  setUserDataInService(data:any){
    this.userServiceData = data;
    console.log("Service Data : ", this.userServiceData);    
    this.socket?.emit("new-user",this.userServiceData.randomId,this.userServiceData.userName,this.userServiceData);
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
