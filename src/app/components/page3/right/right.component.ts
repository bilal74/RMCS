import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.scss'] 
})
export class RightComponent implements OnInit {
  @Input() userDataFromPage3ForRight:any;
  constructor() { }
  val1:string = 'Chor';
  val2:string = 'Sipahi';
  valArray:any = ['Chor','Sipahi']

  arr:any = ['2', '11', '37', '42'];
  cardsButtonClass:String = "boxClass1";

  ngOnInit(): void {
    console.log("userDataFromPage3", this.userDataFromPage3ForRight);    
  }

  resetCards(){
    this.cardsButtonClass = "boxClass1";
  }

  shuflleNumber(){
    // this.shuffle(this.arr);
    this.cardsButtonClass = "boxClass";
    this.shuffle(this.userDataFromPage3ForRight);
    this.shuffle(this.valArray);
  }

  shuffle(array:any) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    console.log("Array : ", array);   
  
    return array;
  }

  checkAns(){
    console.log("Check");
    
  }
  
  
  

}
