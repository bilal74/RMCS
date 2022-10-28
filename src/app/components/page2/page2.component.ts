import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.scss']
})
export class Page2Component implements OnInit {
usersData:any = [
    { host: true, player: false, roundValue: "5", userName: "Bilal", roomId : '123', score : 500 , uniqueId:1},
    { host: false, player: true, roundValue: "5", userName: "Chetan", roomId : '123', score : 180 , uniqueId:2},
    { host: false, player: true, roundValue: "5", userName: "Abhinav", roomId : '123', score : 50 , uniqueId:3},
    { host: false, player: true, roundValue: "5", userName: "Mona", roomId : '123', score : 160 , uniqueId:4}
  ]
usersData1:any = [
    { host: true, player: false, roundValue: "5", userName: "Bilal", roomId : '123', score : 500 , uniqueId:1},
    // { host: false, player: true, roundValue: "5", userName: "Chetan", roomId : '123', score : 180 , uniqueId:2},
    // { host: false, player: true, roundValue: "5", userName: "Abhinav", roomId : '123', score : 50 , uniqueId:3},
    // { host: false, player: true, roundValue: "5", userName: "Mona", roomId : '123', score : 160 , uniqueId:4}
  ]
  disableAddbtn:boolean=false;
  disableClearbtn:boolean=false;
  startButton:boolean=true;

  // showSpinner:boolean=false;
  showCard1:boolean=true;
  showCard2:boolean=false;
  showCard3:boolean=false;
  showCard4:boolean=false;
  // showSpinner:boolean=true;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(){
    console.log(1);

  }

  ngDoCheck(){
    // console.log("Do Check");
    if(this.usersData1.length == 0){
      this.showCard1 = false;
      this.showCard2 = false;
      this.showCard3 = false;
      this.showCard4 = false;
    }
    else if(this.usersData1.length == 1){
      this.showCard1 = true;
    }
    else if(this.usersData1.length == 2){
      this.showCard1 = true;
      this.showCard2 = true;
    }
    else if(this.usersData1.length == 3){
      this.showCard1 = true;
      this.showCard2 = true;
      this.showCard3 = true;
      this.showCard4 = false;
    }
    else if(this.usersData1.length == 4){
      this.showCard1 = true;
      this.showCard2 = true;
      this.showCard3 = true;
      this.showCard4 = true;
    }

  }

  addValue(){
    console.log("add");
    this.disableClearbtn = false;
    this.usersData1.push({ host: false, player: true, roundValue: "5", userName: "Chetan", roomId : '123', score : 180 , uniqueId:2},);
    if(this.usersData1.length < 4){
      this.disableAddbtn = false;
      this.startButton = true;
    }
    else{
      this.disableAddbtn = true;
      this.startButton = false;
    }
  }

  clearValue(){
    console.log("Clear");
    this.usersData1.pop();
    this.disableAddbtn = false;
    if(this.usersData1.length < 0){
      this.disableClearbtn = true;
    }
    else{
      this.disableClearbtn = false;
    }
  }

}
