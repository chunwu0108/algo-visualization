import { State, Node } from './node'
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';


export class SudoGrid {

    public emptySlots: number;
    public content: Node[][];
    public row_set: Array<Set<number>>;
    public col_set: Array<Set<number>>;
    public box_set: Array<Set<number>>;
    public indexes: Set<[number, number]>; 
    public SIZE = 9; //Must be a perfect square number
    private DIV = Math.sqrt(this.SIZE);
    public pointer: number;
    public ptr_avail_set: Set<number>;
    public ptr_wrong_set: Set<number>;
    public edit_ptr: number;
    
    constructor(){
        this.content = [];
        this.emptySlots = this.SIZE * this.SIZE;
        this.init_board();
    }

    init_board(){
        this.edit_ptr = null;
        this.pointer = 0
        this.emptySlots = this.SIZE * this.SIZE;
        this.row_set = new Array<Set<number>>(9);
        this.col_set = new Array<Set<number>>(9);
        this.box_set = new Array<Set<number>>(9);
        this.indexes = new Set<[number, number]>();
        for(let i = 0; i < this.SIZE; i++){
            this.content[i] = [];
            this.row_set[i] = new Set<number>();
            this.col_set[i] = new Set<number>();
            this.box_set[i] = new Set<number>();
            for(let j = 0; j < this.SIZE; j++){
                this.content[i][j] = new Node(j, i);
                this.row_set[i].add(j+1);
                this.col_set[i].add(j+1);
                this.box_set[i].add(j+1);
                this.indexes.add([j, i]);
            }
        }
    }
    
    generate_board(fill: number){

        this.init_board();

        let avail: Array<number>;
        let random_index: number;

        // generate a valid full grid
        let count = 0;
        let i, j, val;

        while(count < this.SIZE * this.SIZE){
            i = Math.floor(count / this.SIZE);
            j = count % this.SIZE;

            avail = Array.from(this.available_set(j, i));
            
            // backtrack
            while(avail.length == 0 && this.emptySlots){
                this.content[i][j].reset_invalid()
                count--;
                i = Math.floor(count / this.SIZE);
                j = count % this.SIZE;

                val = this.unset(j, i)
                this.add_invalid(j, i, val)
                avail = Array.from(this.available_set(j, i));
            }

            random_index = Math.floor(Math.random() * Math.floor(avail.length))
            this.set(j, i, avail[random_index]);

            count++;
        }

        //reset all node's invalid
        this.reset_all_invalid() 

        //remove (grid.size * grid.size - fill) slots
        let remove = (this.SIZE * this.SIZE) - fill;
        let rand, arr;
        let cp_indexes = new Set(this.indexes)

        for(let i = 0; i < remove; i++){
            do{
                rand = Math.floor(Math.random() * Math.floor(cp_indexes.size));
                arr = Array.from(cp_indexes)
                val = this.unset(arr[rand][0], arr[rand][1])
            }
            while(!val);
            cp_indexes.delete(arr[rand])
        }

        for(let arr of cp_indexes)
            this.content[arr[1]][arr[0]].state = State.Const

        //return first empty
        let coord = Array.from(this.difference(this.indexes, cp_indexes))[0];
        this.pointer = coord[0] + (coord[1] * this.SIZE)
        return

    }

    set_edit_ptr(x: number, y:number){
        if(this.edit_ptr !== null){
            let old_y = Math.floor(this.edit_ptr / this.SIZE);
            let old_x = this.edit_ptr % this.SIZE;
            if(this.content[old_y][old_x].get_value() === null)
                this.content[old_y][old_x].state = State.Normal;
            else
                this.content[old_y][old_x].state = State.Const
        }
        this.edit_ptr = x + (y * this.SIZE);
        this.content[y][x].state = State.Edit;
    }

    
    available_set(x: number, y: number){

        let box_index = (this.DIV * (Math.floor(y / this.DIV))) + ((Math.floor(x / this.DIV)))
        return this.difference(this.intersection(this.intersection(
            this.row_set[y], this.col_set[x]), this.box_set[box_index]), this.get_invalid(x, y))
    }

    
    set(x: number, y: number, val?:number){

        if(typeof val === 'undefined'){
            val = y
            y = Math.floor(x / this.SIZE);
            x = x % this.SIZE;
        }

        if(val === this.content[y][x].get_value())
            return

        //return -1 if can't insert (set contain value)
        //check if in sets
        if(!this.available_set(x, y).has(val)){
            console.log("Can't set", val, "here")
            return;
        }
    
        if(val == 0 || val > this.SIZE){
            this.unset(x, y);
            return;
        }

        //update sets
        this.row_set[y].delete(val) 
        this.col_set[x].delete(val) 
        let box_index = (this.DIV * (Math.floor(y / this.DIV))) + ((Math.floor(x / this.DIV)))
        this.box_set[box_index].delete(val)

        //update content
        this.content[y][x].set_value(val);
        
        this.emptySlots -= 1

    }
    unset(x: number, y?: number){

        if(typeof y === 'undefined'){
            y = Math.floor(x / this.SIZE);
            x = x % this.SIZE;
        }

        let val = this.content[y][x].get_value()

        if(val === null)
            return val

        //update sets
        this.row_set[y].add(val) 
        this.col_set[x].add(val) 
        let box_index = (3 * (Math.floor(y / 3))) + ((Math.floor(x / 3)))
        this.box_set[box_index].add(val)
        
        //update content
        this.content[y][x].set_value(null);

        this.emptySlots += 1

        return val
    }

    add_invalid(x: number, y: number, val: number){
        this.content[y][x].set_invalid(val);
    }

    get_invalid(x: number, y: number){
        return this.content[y][x].get_invalid();
    }

    reset_all_invalid(){
        for(let i = 0; i < this.SIZE; i++){
            for(let j = 0; j < this.SIZE; j++){
                this.content[i][j].reset_invalid();
            }
        }
    }

    update_sets(ptr? : number){
        let curr_ptr;
        if(ptr)
            curr_ptr = ptr;
        else
            curr_ptr = this.pointer;
        let y = Math.floor(curr_ptr / this.SIZE);
        let x = curr_ptr % this.SIZE;
        this.ptr_avail_set = this.available_set(x, y);
        this.ptr_wrong_set = this.content[y][x].get_invalid();
    }

    reset(){
        let start_x, start_y;
        for(let i = 0; i < this.SIZE; i++){
            for(let j = 0; j < this.SIZE; j++){
                if(this.content[i][j].state !== State.Const){
                    if(start_x == null && start_y == null){
                        start_x = j;
                        start_y = i;
                    }
                    this.unset(j, i);
                    this.content[i][j].reset_invalid();
                }
            }
        }
        this.pointer = start_x + (start_y * this.SIZE);
        console.log(this.pointer)
        this.ptr_avail_set = null;
        this.ptr_wrong_set = null;
    }

    //set op functions
    private intersection(setA: Set<any>, setB: Set<any>){

        let intersection = new Set<any>();
        for(let ele of setA){
            if(setB.has(ele))
                intersection.add(ele)
        }
        return intersection
    }
    
    private difference(setA: Set<any>, setB: Set<any>){

        let diff = new Set<any>(setA);
        for(let ele of setB){
            if(setB.has(ele))
                diff.delete(ele)
        }
        return diff
    }
    


}
