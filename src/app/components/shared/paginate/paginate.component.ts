import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements OnInit, OnChanges {
  @Input() totalPages: number; // recibo el numero total de paginas
  @Input() currentPage: number; // recibo el numero de pagina actual
  public pages: number[];
  public from: number;
  public to: number;
  private nbtp = environment.numberButtonsToPage;

  constructor() {
  }

  ngOnInit(): void {
    this.from = 1;

    if (this.totalPages >= this.nbtp) {
      this.to = this.from + (this.nbtp - 1);
      this.setButtons(this.nbtp);
    } else {
      this.to = this.totalPages;
      this.setButtons(this.totalPages);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
     this.nextInterval();
 }

 private nextInterval(): void {
   if (Number(this.currentPage) === this.to && Number(this.currentPage) < this.totalPages) {
      let nIndexToPages: number;
      this.from = this.to - 1;
      if ((this.nbtp - 1 + this.from) <= this.totalPages) {
        // botonera completa
        this.to = this.from + (this.nbtp - 1);
        nIndexToPages = this.nbtp;
      } else {
        // botonera incompleta
        this.to = this.totalPages;
        nIndexToPages = this.to - this.from + 1;
      }
      this.setButtons(nIndexToPages);
   } else {
     if (Number(this.currentPage) === this.from && Number(this.currentPage) > 1) {
        this.to = this.from + 1;
        this.from = this.to - (this.nbtp - 1);
        this.setButtons(this.nbtp);
     }
   }
 }

 private setButtons(nElements: number): void {
    this.pages = new Array(nElements).fill(0).map((val, index) => this.from + index);
 }

}
