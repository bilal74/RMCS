import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.scss']
})
export class LeftComponent implements OnInit {
  @Input() userDataFromPage3:any;
  constructor() { }

  ngOnInit(): void {
    console.log("userDataFromPage3", this.userDataFromPage3);
    
  }

}
