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
  public mid;

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

  async dijkstra(){

    this.mode = Mode.CALC

    const dij = new Dijkstra();

    if(this.start == null){
      alert("Please set Start point")
      return
    }

    if(this.target == null){
      alert("Please set Target point")
      return
    }

    let promise = new Promise((resolve, reject) => {
      if(this.mid instanceof NodeComponent){
        console.log("right")
        let vistedNodes_pre = dij.solve(this.map, this.start, this.mid);
        let shortestPathNodes_pre = dij.getShortestPath(this.map, vistedNodes_pre[vistedNodes_pre.length -1])
        this.animeDijkstra(vistedNodes_pre, shortestPathNodes_pre, this.mid);
        
        setTimeout(() => {
          let vistedNodes = dij.solve(this.map, this.mid, this.target);
          let shortestPathNodes = dij.getShortestPath(this.map, vistedNodes[vistedNodes.length -1])      
          resolve(this.animeDijkstra(vistedNodes, shortestPathNodes, this.target));
        }, 13 * vistedNodes_pre.length)
        
        
      }else{
        let vistedNodes = dij.solve(this.map, this.start, this.target);
        let shortestPathNodes = dij.getShortestPath(this.map, vistedNodes[vistedNodes.length -1])
        resolve(this.animeDijkstra(vistedNodes, shortestPathNodes, this.target)); 
      }
    });
    
    let result = await promise;
    this.mode = Mode.DONE
  }

  async animeDijkstra(nodelist:Array<NodeComponent>, shortestPathNodes:Array<NodeComponent>, target:NodeComponent){
    let promise = new Promise((resolve, reject) => {
      for(let i = 0; i < nodelist.length; i++){

        // delay n time until after last visted node is done?
        
        if(i === nodelist.length-1 ){
          // check if the last node is the target
          if(shortestPathNodes[shortestPathNodes.length-1] === target){
            setTimeout(() => {
              resolve(this.animeShortestPath(shortestPathNodes));
            }, 11 * i)
          }
        }

        setTimeout(() => {
          if(nodelist[i].state === State.Empty || nodelist[i].state === State.Visited2){
            if(target === this.target)
              nodelist[i].state = State.Visited;
            else
              nodelist[i].state = State.Visited2;
          }
            
        }, 10 * i)
      }
    });
    return await promise;
  }

  async animeShortestPath(nodelist:Array<NodeComponent>){
    let pathCount = 0;
    let promise = new Promise((resolve, reject) => {
      for(let i = 0; i < nodelist.length; i++){
        if (nodelist[i].state === State.Path){
          nodelist[i].state = State.Flash;
          pathCount += 1;
        }
        setTimeout(() => {
          if (nodelist[i].state !== State.Start && nodelist[i].state !== State.Target && nodelist[i].state !== State.Mid)
            nodelist[i].state = State.Path;
          if(i === nodelist.length-1)
            resolve()
        }, 15 * i + (pathCount * 30))
      }
    });
    return await promise;
  }

  onMouseDown(row:number, col:number){
    this.mouseIsPressed = true;
    if(this.mode == Mode.SET_WALLS){
      if(this.map.arr[row][col].state === State.Empty)
        this.map.arr[row][col].state = State.Wall;
    }
    if(this.mode == Mode.SET_START){
      if(this.start != null)
        this.start.state = State.Empty
      this.start = this.map.arr[row][col]
      this.start.state = State.Start
    }
    if(this.mode == Mode.SET_TARGET){
      if(this.target != null)
        this.target.state = State.Empty
      this.target = this.map.arr[row][col]
      this.target.state = State.Target
    }
    if(this.mode == Mode.SET_MID){
      if(this.mid != null)
        this.mid.state = State.Empty
      this.mid = this.map.arr[row][col]
      this.mid.state = State.Mid
    }
    if(this.mode == Mode.DELETE){
      let currNode = this.map.arr[row][col]
      this.unregister_node(currNode);
    }
  }

  unregister_node(currNode:NodeComponent){
    
    if(currNode == this.start)
      this.start = null;
    if(currNode == this.target)
      this.target = null;
    if(currNode == this.mid)
      this.mid = null;
    currNode.state = State.Empty
  }

  onMouseOver(row:number, col:number){
    if(this.mode == Mode.SET_WALLS){
      if(this.mouseIsPressed && this.map.arr[row][col].state === State.Empty)
        this.map.arr[row][col].state = State.Wall;
    }
    if(this.mode == Mode.DELETE){
      if(this.mouseIsPressed){
        let currNode = this.map.arr[row][col]
        this.unregister_node(currNode)
      }
    }
  }

  onMouseUp(){
    this.mouseIsPressed = false;
  }

  setMode(m:Mode){
    this.mode = m
  }

  undo_search(){
    if(this.mode === Mode.CALC)
      return

    for(let i: number = 0; i < this.length; i++){
      for(let j: number = 0; j < this.width; j++){
        let currNode = this.map.arr[i][j]
        if(currNode.state === State.Visited || currNode.state === State.Visited || currNode.state === State.Path)
          currNode.state = State.Empty   
      }
    }
  }

  reset(){
    let length = this.length
    let width = this.width
    this.map = new Map(length, width);
    this.start = this.map.arr[Math.floor(length/2)][Math.floor(width/2) - Math.floor(width/4)];
    this.target = this.map.arr[Math.floor(length/2)][Math.floor(width/2) + Math.floor(width/4)];
    this.start.set_state(State.Start)
    this.target.set_state(State.Target)
    this.mid = null;
    this.mode = Mode.READY
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
  SET_MID = 5,
  DELETE = 6,
  DONE = 7,
  READY = 8
}



