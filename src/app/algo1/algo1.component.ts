import { Component, OnInit } from '@angular/core';
import { NodeComponent, State } from './node/node.component';

@Component({
  selector: 'app-algo1',
  templateUrl: './algo1.component.html',
  styleUrls: ['./algo1.component.css', './node/node.component.css']
})


export class Algo1Component implements OnInit {

  public map;

  constructor() { 

    this.map = new Map(17, 34);
    this.map.arr[9][5].set_state(State.Start)
    this.map.arr[9][28].set_state(State.Target)

  }

  ngOnInit() {
    
  }


}

export class Map {

  public arr: NodeComponent[][];

  constructor(public width:number, public length:number) {

    /*
    initializing a 2d array of blocks
    */
    this.arr = [];
    for(var i: number = 0; i < width; i++){
      this.arr[i] = [];
      for(var j: number = 0; j < length; j++){
        this.arr[i][j] = new NodeComponent();
      }
    }
  }

}



