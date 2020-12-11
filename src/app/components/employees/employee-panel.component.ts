import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-employee-panel',
  templateUrl: './employee-panel.component.html'
})
export class EmployeePanelComponent implements OnInit {
  private page: number;

  constructor() { }

  ngOnInit(): void {
  }

}
