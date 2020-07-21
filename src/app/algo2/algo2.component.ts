import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Des } from './des';
import { TriDes } from './tri-des';

@Component({
  selector: 'app-algo2',
  templateUrl: './algo2.component.html',
  styleUrls: ['./algo2.component.css', '../app.component.css']
})
export class Algo2Component implements OnInit {

  @ViewChild('raw_in', {static: false}) raw_in:ElementRef;
  @ViewChild('cipher_in', {static: false}) cip_in:ElementRef;
  @ViewChild('skey', {static: false}) skey_in:ElementRef;

  public qrdata: string = "seaf";
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

  get_sKey(){
    let des = new Des();
    this.skey_in.nativeElement.value = des.generate_secret_key(24);
  }

  show_qr(){
    let divElement = document.getElementById("qr-code");
    divElement.classList.remove("qr-hide");
    divElement.classList.add("qr-show");
    console.log(divElement.classList)
  }
  
  hide_qr(){
    let divElement = document.getElementById("qr-code");
    divElement.classList.remove("qr-show");
    divElement.classList.add("qr-hide");
    console.log(divElement.classList)
  }

  compute(){

    let curr_raw = this.raw_in.nativeElement.value;
    let curr_cip = this.cip_in.nativeElement.value;
    let skey = this.skey_in.nativeElement.value;

    if(skey === "" || skey.length != 48){
      alert("Please generate a secret key or key length is not 48")
      return
    }

    if(curr_raw === "" && curr_cip === ""){
      alert("Please enter 'Text' or 'Cipher Text' to continue")
      return
    }

    if(curr_raw !== "" && curr_cip !== ""){
      alert("Please clear 'Text' or 'Cipher Text' to continue")
      return
    }

    let tdes = new TriDes();
    let des = new Des();

    let tkey = new Uint8Array(24);
    let tkey_blocks = des.hex2block(this.skey_in.nativeElement.value);
    tkey.set(tkey_blocks[0]);
    tkey.set(tkey_blocks[1], 8);
    tkey.set(tkey_blocks[2], 16);
    
    if(curr_raw === ""){
      let e_block = tdes.decrypt(tkey, this.cip_in.nativeElement.value);
      this.raw_in.nativeElement.value = e_block;
    }

    if(curr_cip === ""){
      let e_block = tdes.encrypt(tkey, this.raw_in.nativeElement.value);
      this.cip_in.nativeElement.value = e_block;
      this.qrdata = e_block;
      this.show_qr();
    }

  }

  clear(type:number){
    if(type === 0)
      this.raw_in.nativeElement.value = '';
    if(type === 1){
      this.cip_in.nativeElement.value = '';
      this.hide_qr();
    }
  }

}
