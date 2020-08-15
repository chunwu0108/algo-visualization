
import {SudoGrid} from '../algo3/sudo-grid'
import { State } from '../algo3/node'

export class Backtracking {

    private grid: SudoGrid;
    private keep_going: boolean;
    private isStep: boolean;
    private delay: number;
    public solving: boolean;

    constructor(grid: SudoGrid){ 
        this.keep_going = true;
        this.grid = grid;
        this.isStep = false;
        this.set_delay(100);  // ms
        this.solving = false;
    }

    async solve(isStart){

        if(isStart){
            this.grid.edit_ptr = null;
            this.solving = true;
        }

        let found_solution, curr_delay;
        let y = Math.floor(this.grid.pointer / this.grid.SIZE);
        let x = this.grid.pointer % this.grid.SIZE;

        if(this.grid.emptySlots == 0)
            return true
        
        let choices = this.grid.available_set(x, y)

        // stopper?
        while(!this.keep_going){
            await Promise.all([
                this.timeout(10),
            ]);
        }

        if(this.isStep)
            curr_delay = 10;
        else
            curr_delay = this.delay

        // decide something
        for(let choice of Array.from(choices)){

            var next = await Promise.all([
                this.forward(choice),
                this.timeout(curr_delay)
            ]);
            found_solution = await this.solve(false)
            
            // DONE, solution found
            if(found_solution){
                this.keep_going = true;
                this.solving = false;
                this.tracer_unglow(x, y);
                return true;
            }
                
            while(!this.keep_going){
                await Promise.all([
                    this.timeout(10),
                ]);
            }
        }

        if(!isStart){
            var next = await Promise.all([
                this.backward(),
                this.timeout(this.delay),
            ]);
        }else{
            this.solving = false;
        }
        
        return false
    }

    set_delay(ms){
        this.delay = ms;
    }

    forward(choice){
        let ptr = this.grid.pointer;
        let y = Math.floor(ptr / this.grid.SIZE);
        let x = ptr % this.grid.SIZE;
        this.grid.set(x, y, choice);
        do{
          ptr += 1
          y = Math.floor(ptr/ this.grid.SIZE);
          x = ptr % this.grid.SIZE;
        }
        while(ptr < this.grid.SIZE * this.grid.SIZE && this.grid.content[y][x].state === State.Const)
        
        if(ptr < this.grid.SIZE * this.grid.SIZE)
            this.set_pointer(this.grid.pointer, ptr);
      }
    
    backward(){
        let ptr = this.grid.pointer;
        let y = Math.floor(ptr / this.grid.SIZE);
        let x = ptr % this.grid.SIZE;
        this.grid.content[y][x].reset_invalid()
        if(ptr > 0){
            do{
                ptr -= 1
                y = Math.floor(ptr / this.grid.SIZE);
                x = ptr % this.grid.SIZE;
            }
            while(ptr > 0 && (this.grid.content[y][x].state === State.Const));
        }
        let val = this.grid.unset(x, y);
        this.grid.add_invalid(x, y, val);
        this.set_pointer(this.grid.pointer, ptr);
      }

    timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    set_pointer(prev, curr){
        let y = Math.floor(prev / this.grid.SIZE);
        let x = prev % this.grid.SIZE;
        this.tracer_unglow(x, y);
        y = Math.floor(curr / this.grid.SIZE);
        x = curr % this.grid.SIZE;
        this.tracer_glow(x, y);
        this.grid.pointer = curr;
        this.grid.update_sets()
    }
    
    tracer_glow(x, y){
        this.grid.content[y][x].highlight()
    }

    tracer_unglow(x, y){
        this.grid.content[y][x].unhighlight()
    }

    pause_resume(){
        if(this.keep_going){
            this.keep_going = false;
        }else{
            this.keep_going = true;
            this.isStep = false;
        }
        if(this.grid.emptySlots == 0)
            this.solving = false 
    }

    async step(){
        this.pause_resume()
        this.isStep = true;
        await Promise.all([
            this.timeout(10),
        ]);
        this.pause_resume()

    }
}

export enum AlgoState{
    
}