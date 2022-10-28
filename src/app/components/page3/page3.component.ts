import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';

@Component({
  selector: 'app-page3',
  templateUrl: './page3.component.html',
  styleUrls: ['./page3.component.scss']
})
export class Page3Component implements OnInit {

  usersData:any = [
    { host: true, player: false, roundValue: "5", userName: "Bilal", roomId : '123', score : 500 , uniqueId:1},
    { host: false, player: true, roundValue: "5", userName: "Arham", roomId : '123', score : 680 , uniqueId:2},
    { host: false, player: true, roundValue: "5", userName: "Abhinav", roomId : '123', score : 50 , uniqueId:3},
    { host: false, player: true, roundValue: "5", userName: "Mona", roomId : '123', score : 160 , uniqueId:4}
  ]

  userDataForLeft:any = [...this.usersData];
  userDataForRight:any = [...this.usersData];

  constructor() { }

  ngOnInit(): void {
    // this.forSortingArray();
  }

  ngDoCheck(){
    console.log("Do Check");
    this.forSortingArray();
    
  }
  ngOnChanges(){
    console.log('Changed');
    
  }

  forSortingArray(){
    this.userDataForLeft = this.userDataForLeft.sort((a:any, b:any) => {
      if (a.score < b.score) {
          return 1;
      }
      if (a.score > b.score) {
          return -1;
      }
      return 0;
    });
  
    // console.log("Sorted array ", sortedStudents);
  }

}
