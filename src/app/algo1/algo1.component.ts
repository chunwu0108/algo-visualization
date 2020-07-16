import { Component, OnInit } from '@angular/core';
import { NodeComponent, State } from './node/node.component';
import { Dijkstra } from '../algorithms/dijkstra'

@Component({
  selector: 'app-algo1',
  templateUrl: './algo1.component.html',
  styleUrls: ['./algo1.component.css', './node/node.component.css', '../app.component.css']
})


export class Algo1Component implements OnInit {

  public map;
  public start;
  public target;
  public mouseIsPressed:boolean;
  public mode;

  public length;
  public width;

  constructor() { 

    this.length = 17;
    this.width = 34;
    this.mouseIsPressed = false; 
    this.reset();

  }

  ngOnInit() {
    
  }

  dijkstra(){
    const dij = new Dijkstra();
    let vistedNodes = dij.solve(this.map, this.start, this.target);
    let shortestPathNodes = dij.getShortestPath(this.map, vistedNodes[vistedNodes.length -1])
    this.animeDijkstra(vistedNodes, shortestPathNodes);
    console.log("Dijkstra done, animating")
  }

  animeDijkstra(nodelist:Array<NodeComponent>, shortestPathNodes:Array<NodeComponent>){
    for(let i = 0; i < nodelist.length; i++){

      // delay n time until after last visted node is done?
      
      if(i === nodelist.length-1 ){
        // check if the last node is the target
        if(shortestPathNodes[shortestPathNodes.length-1] === this.target){
          setTimeout(() => {
            this.animeShortestPath(shortestPathNodes);
          }, 11 * i)
        }
      }

      setTimeout(() => {
        if (nodelist[i].state !== State.Start && nodelist[i].state !== State.Target)
          nodelist[i].state = State.Visited
      }, 10 * i)
    }
  }

  animeShortestPath(nodelist:Array<NodeComponent>){
    for(let i = 0; i < nodelist.length; i++){
      setTimeout(() => {
        if (nodelist[i].state !== State.Start && nodelist[i].state !== State.Target)
          nodelist[i].state = State.Path;
      }, 15 * i)
    }
  }

  onMouseDown(row:number, col:number){
    this.mouseIsPressed = true;
    if(this.mode == Mode.SET_WALLS){
      if(this.map.arr[row][col].state === State.Empty)
        this.map.arr[row][col].state = State.Wall;
    }
    if(this.mode == Mode.SET_START){
      this.start.state = State.Empty
      this.start = this.map.arr[row][col]
      this.start.state = State.Start
    }
    if(this.mode == Mode.SET_TARGET){
      this.target.state = State.Empty
      this.target = this.map.arr[row][col]
      this.target.state = State.Target
    }
  }

  onMouseOver(row:number, col:number){
    if(this.mode == Mode.SET_WALLS){
      if(this.mouseIsPressed && this.map.arr[row][col].state === State.Empty)
        this.map.arr[row][col].state = State.Wall;
    }
  }

  onMouseUp(){
    this.mouseIsPressed = false;
  }

  setMode(m:Mode){
    this.mode = m
  }

  reset(){
    let length = this.length
    let width = this.width
    this.map = new Map(length, width);
    this.start = this.map.arr[Math.floor(length/2)][Math.floor(width/2) - Math.floor(width/4)];
    this.target = this.map.arr[Math.floor(length/2)][Math.floor(width/2) + Math.floor(width/4)];
    this.start.set_state(State.Start)
    this.target.set_state(State.Target)
  }

}

export class Map {

  public arr: NodeComponent[][];
  public width: number;
  public length: number;

  constructor(public l:number, public w:number) {

    /*
    initializing a 2d array of blocks
    */
    this.arr = [];
    this.width = w;
    this.length = l;
    for(let i: number = 0; i < this.length; i++){
      this.arr[i] = [];
      for(let j: number = 0; j < this.width; j++){
        this.arr[i][j] = new NodeComponent();
        this.arr[i][j].x = j
        this.arr[i][j].y = i
      }
    }
  }

  getNode(x:number, y:number){
    if(x < 0 || x >= this.width || y < 0 || y >= this.length){
      return null
    }
    return this.arr[y][x]
  }

}

enum Mode{
  SET_START = 1,
  SET_TARGET = 2,
  SET_WALLS = 3,
  CALC = 4,
}



