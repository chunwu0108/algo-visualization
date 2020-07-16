import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  public state:State;
  public distance:number;
  public x:number;
  public y:number;

  constructor() {
    this.state = State.Empty
    this.distance = -1;
  }

  set_state(st:State){
    this.state = st;
  }


  ngOnInit() { }

}

export enum State{
  Empty = 1,
  Start = 2,
  Wall = 3,
  Target = 4,
  Visited = 5,
  Path = 6,
  Mid = 7,
  Visited2 = 8,
  Flash = 9,
}

