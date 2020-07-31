import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

export class Node {

    public state: State;
    private value: number;
    private invalid_val: Set<number>;
    public x:number;
    public y:number;

    constructor(x:number, y:number, val:number=null){
        this.invalid_val = new Set<number>();
        this.set_value(val)
        this.state = State.Normal;
        this.x = x
        this.y = y
    }

    get_value(){
        return this.value;
    }

    highlight(){
        this.state = State.Hightlight;
    }

    unhighlight(){
        this.state = State.Normal;
    }

    set_value(val: number){
        this.value = val;
    }
    
    set_invalid(val: number){
        this.invalid_val.add(val)
    }

    get_invalid(){
        return this.invalid_val
    }

    reset_invalid(){
        this.invalid_val = new Set<number>();
    }

}

export enum State{
    Normal = 1,
    Hightlight = 2,
    Const = 3,
    Edit = 4,

}