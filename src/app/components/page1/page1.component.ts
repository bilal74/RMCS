import { Component, OnInit, OnChanges, DoCheck} from '@angular/core';
import { UserDataFromHomeService } from 'src/app/services/user-data-from-home.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})
export class Page1Component implements OnInit {
  
  constructor(private userService:UserDataFromHomeService) { }
  userData:any = [{}];
  
  numRound:boolean = true;  
  showRoundOrId:boolean = false;  
  showBtn1: boolean = true;
  showBtn:boolean = true;
  showBtnFinal:boolean = true;
  nameError:boolean = false;
  radioBtnError:boolean = false;
  roundsOrRoomIDError:boolean = false;
  radioBtnValue:string = "";
  roundsValues:any = [
    {
      count:3,
      rounds:"3 Rounds"
    },
    {
      count:5,
      rounds:"5 Rounds"
    },
    {
      count:10,
      rounds:"10 Rounds"
    },
  ]

  
  ngDoCheck(){
  }

  ngOnChanges(){
    console.log('Change');
  }

  testBil(){
    console.log(this.showBtn);
    console.log(this.showBtn1);
    
  }

  ngOnInit(): void {
  }

  onSubmit(data:any){
    // For checking name
    if(data.userName == '' || data.userName.length < 3){
      console.log("error name");      
      this.nameError = true;
    }
    else{
      this.nameError = false;  
      // For checking radio button
      if(this.radioBtnValue == ""){
        console.log("Error radio btn");
        this.radioBtnError = true;
      }
      else{
        this.radioBtnError = false;
        // For checking round/id
        if((data.roundValue == '' && data.roomId == undefined) || (data.roundValue == undefined && data.roomId == '')){
          console.log("error");     
          this.roundsOrRoomIDError = true;
        }
        else{           
          this.roundsOrRoomIDError = false;
          this.userData = data;
          if(data.roomId){
            this.userData.host = false;
            this.userData.player = true;
          }
          else{
            this.userData.host = true;
            this.userData.player = false;
          }

          // console.log("User data : ", this.userData);
          //Sending data to the service
          this.showBtn = false;
          this.userService.setUserDataInService(this.userData);
        }
      }
    }    
  }

  onItemChangeRadioBtn(radioBtnData:any){
    this.showBtnFinal = true;
    this.showRoundOrId = true;
    this.radioBtnValue = radioBtnData;
    if(radioBtnData.value == "create"){
      this.numRound = true;
    }
    else{
      this.numRound = false;
    }
 }

 onItemChangeNameInput(nameInput:any){
  if(nameInput.value.length > 2){
    this.nameError = false; 
    this.showBtn1 = false;
  }
  else{
    this.nameError = true;
    this.showBtn1 = true;
  }

  if(this.showBtn== false && this.showBtn1==false){
    this.showBtnFinal = false;
  }
  else{
    this.showBtnFinal = true;
  }
 }

 onItemChangeRoundInput(roundsInput:any){
  console.log(roundsInput.value);

  if(roundsInput.value && this.nameError==false){
    // console.log(1);    
    this.showBtn = false;
  }
  else{
    this.showBtn = true;
  }
  // else{
  //   console.log(2);

  // }
  if(this.showBtn== false && this.showBtn1==false){
    this.showBtnFinal = false;
  }
  else{
    this.showBtnFinal = true;
  }
  
 }

}
