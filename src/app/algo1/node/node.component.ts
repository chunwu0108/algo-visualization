import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  public state:State;

  constructor() {
    this.state = State.Empty
  }

  set_state(st:State){
    this.state = st;
  }

  ngOnInit() {
  }

}

export enum State{
  Empty = 1,
  Start = 2,
  Wall = 3,
  Target = 4,
}

