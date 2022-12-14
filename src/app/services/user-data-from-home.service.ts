import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

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
  dataFromBackend:any = [];
  constructor() {
    this.socket = io('http://localhost:5009');
    // console.log("Socket", this.socket);
   }

  setUserDataInService(data:any){
    this.userServiceData = data;
    console.log("Service Data : ", this.userServiceData);

    //sending data to backend
    this.socket.emit("new-user", this.userServiceData);

    // Data from backend and modified
    this.socket.on('DataFromBE', (data: any) => {
      // console.log("Member Joined status: ", data.insert, "\nMember Joined till now: ", data.members,"\nMessage:", data.msg)
      // console.log("Member Details: ", data.values)
      this.dataFromBackend.push(data);
    })

  }

  userDataFromFrontEnd(){
    return this.userServiceData;
  }

  getDataFromBackend(roomId: number){
    this.socket.emit("allUser", roomId);

    this.socket.on('UpdatedData', (data: any) => {
      console.log("data by Viju: ", data);
      this.dataFromBackend = data;
    })
    return this.dataFromBackend;
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
