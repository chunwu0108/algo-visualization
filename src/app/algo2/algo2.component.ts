import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Des } from './des';
 
@Component({
  selector: 'app-algo2',
  templateUrl: './algo2.component.html',
  styleUrls: ['./algo2.component.css', '../app.component.css']
})
export class Algo2Component implements OnInit {

  @ViewChild('raw_in', {static: false}) raw_in:ElementRef;
  @ViewChild('cipher_in', {static: false}) cip_in:ElementRef;

  constructor() {
    
  }

  ngOnInit() {
  }

  onKey(event: any){
    let target = event.target || event.srcElement || event.currentTarget;
    let obj_id = target.attributes.id.value;

    //live update cipher? and text?

  }

  dec2bin(dec){
    return (dec >>> 0).toString(2);
  }

  bin2block(bin){
    let res = new Uint8Array(8);
    let strlist = bin.split(" ", 8);
    
    for(let i = 0; i < 8; i++){
      res[i] = parseInt( strlist[i], 2 );
    }
    return res;
  }

  pad(num, size) {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  compute(){

    let d = new Des();
    let bin = "00010011 00110100 01010111 01111001 10011011 10111100 11011111 11110001"
    let key = this.bin2block(bin)

    let block = new Uint8Array([56, 13, 65, 132, 12, 41, 1, 54]);
    //let e_block = d.encrypt_block(block, keys[0]);
    let e_block = d.encrypt(key, "hi my name isasfesaggesag");

    

    let r_block = d.decrypt(block, e_block);
    console.log(r_block);

W

    let curr_raw = this.raw_in.nativeElement.value;
    let curr_cip = this.cip_in.nativeElement.value;

    if(curr_raw !== "" && curr_cip !== ""){
      alert("Please clear 'Text' or 'Cipher Text' to continue")
      return
    }
  }

  clear(type:number){
    if(type === 0)
      this.raw_in.nativeElement.value = '';
    if(type === 1)
      this.cip_in.nativeElement.value = '';

  }

}
