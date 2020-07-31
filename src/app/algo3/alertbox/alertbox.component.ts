import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alertbox',
  templateUrl: './alertbox.component.html',
  styleUrls: ['./alertbox.component.css']
})
export class AlertboxComponent implements OnInit {

  @ViewChild('no_solution', {static: false}) no_solution:ElementRef;

  constructor(private modalService: NgbModal) {
     
  }

  ngOnInit() {
  }

  open(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

}
