import { Component, ElementRef, ViewChild, AfterViewInit, TemplateRef, Input} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alertbox',
  templateUrl: './alertbox.component.html',
  styleUrls: ['./alertbox.component.css']
})
export class AlertboxComponent implements AfterViewInit  {

  @ViewChild('no_solution', {static: false}) no_solution:ElementRef;
  @ViewChild('algo3content', {static: false}) algo3:TemplateRef<any>;
  @ViewChild('algo2content', {static: false}) algo2:TemplateRef<any>;
  @ViewChild('algocontent', {static: false}) algo:TemplateRef<any>;
  @Input() className :string = '';
  private algoHash: any;

  constructor(private modalService: NgbModal) {

  }

  ngAfterViewInit() {
    this.algoHash = {
      "algo" : this.algo,
      "algo2": this.algo2,
      "algo3": this.algo3
    };
    this.open()
  }

  open(){
    this.modalService.open(this.algoHash[this.className], {windowClass: 'modal-holder', centered: true})
  }

}
