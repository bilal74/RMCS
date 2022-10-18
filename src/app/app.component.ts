import { Component } from '@angular/core';
// import * as io from "socket.io-client";
// import io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test';
  // socket:any = null;

  constructor() {
      // this.socket = io('http://localhost:5009');
      // console.log("Socket", this.socket);
      
  }
}
