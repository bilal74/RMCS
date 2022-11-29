import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { UserDataFromHomeService } from 'src/app/services/user-data-from-home.service';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss']
})
export class Page2Component implements OnInit {
usersData1:any = [
    { host: true, player: false, roundValue: "5", userName: "Bilal", roomId : '123', score : 500 , uniqueId:1},
  ]
  disablestartButton:boolean=true;
  dataFromBackendForPage2:any=[];
  constructor(private userService:UserDataFromHomeService) { }

  ngOnInit(): void {
  }

  // ngDoCheck(){
  //   // setInterval(() => {
  //   //   // let dataBE = this.userService?.getDataFromBackend(201);
  //   //   console.log("Time limit")
  //   // }, 5000)

  //   let dataBE = this.userService?.getDataFromBackend(201);
  //   this.dataFromBackendForPage2 = dataBE;
  //   console.log("Data Bilal from page 2: ", dataBE);
  //   if(this.dataFromBackendForPage2[0]?.members == 4){
  //     this.disablestartButton = false;
  //   }
  //   else{
  //     this.disablestartButton = true;
  //   }
  // }

  test(){
    // console.log("Test Fn");
    let userData = this.userService.userDataFromFrontEnd();
    // console.log(userData);
    let roomidpage1 = userData.roomId;
    let dataBE = this.userService.getDataFromBackend(roomidpage1);
    this.dataFromBackendForPage2 = dataBE;
    console.log("Data Bilal from test ", this.dataFromBackendForPage2);
    // console.log(this.userService?.getDataFromBackend(201))
  }


  ngOnChanges(){
    console.log("CHange in FUnction")
  }
}
