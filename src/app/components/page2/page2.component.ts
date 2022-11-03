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

  ngDoCheck(){
    let dataBE = this.userService?.getDataFromBackend();
    this.dataFromBackendForPage2 = dataBE;   
    console.log("Data Bilal : ", dataBE);
    if(this.dataFromBackendForPage2[0]?.members == 4){
      this.disablestartButton = false;
    }
    else{
      this.disablestartButton = true;
    }
  }
}
