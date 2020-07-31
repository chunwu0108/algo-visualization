import { Component, OnInit, ElementRef, ViewChild, HostListener} from '@angular/core';
import { SudoGrid } from './sudo-grid'
import { Backtracking } from '../algorithms/backtracking'
import { AlertboxComponent } from './alertbox/alertbox.component'


@Component({
  selector: 'app-algo3',
  templateUrl: './algo3.component.html',
  styleUrls: ['./algo3.component.css', '../app.component.css']
})
export class Algo3Component implements OnInit {

  @ViewChild('gen_ranger', {static: false}) gen_size:ElementRef;
  @ViewChild('ms_ranger', {static: false}) ms:ElementRef;

  public grid: SudoGrid
  public algo;

  constructor() {
    this.grid = new SudoGrid();
    this.algo = new Backtracking(this.grid);
    this.algo.set_delay(50);
  }

  ngOnInit() {
  
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    let key = +event.key;

    if(key > 0 && key <= 9 && this.grid.edit_ptr !== null){
      this.grid.unset(this.grid.edit_ptr);
      this.grid.set(this.grid.edit_ptr, key);
      this.grid.update_sets(this.grid.edit_ptr);
    }
  }

  onMouseDown(x:number, y:number){
    if(!this.algo.solving){
      this.grid.set_edit_ptr(x, y)
      this.grid.update_sets(this.grid.edit_ptr)
    }
  }

  generate_grid(){
    if(!this.algo.solving){
      this.grid.generate_board(this.gen_size.nativeElement.value)   
    }
  }

  solve(){
    if(!this.algo.solving){
      if(this.grid.emptySlots == 0){
        //reset board
        this.grid.reset()
      }
      let found_solution = this.algo.solve(true);
      if(!found_solution){
        //solution not found
        alert("no solution, resetting (add modal here)")
        this.grid.reset()
      }
    }
  }

  set_ms(ms: number){
    this.algo.set_delay(1500 - ms);
  }

  pause_resume_algo(){
    this.algo.pause_resume()
  }

  step_algo(){
    this.algo.step()
  }

  clear_solution(){
    if(!this.algo.solving)
      this.grid.reset()
  }

}

