import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Nopagefound',
  templateUrl: './Nopagefound.component.html',
  styleUrls: ['./Nopagefound.component.scss']
})
export class NopagefoundComponent implements OnInit {

  year = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
