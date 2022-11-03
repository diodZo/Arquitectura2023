import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { notifications } from './header-dummy-data';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() collapsed = false;
  @Input() screenWidth = 0;
  @Input() nombreUsuario: string | any;
  @Output() getlogout = new EventEmitter<boolean>();

  canShowSearchAsOverlay = false;
  selectedLanguage: any;
  notifications = notifications;
  nombreCompleto: string | any;

  constructor( ) { 
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverLay(window.innerWidth);
  }

  ngOnInit(): void {
    this.checkCanShowSearchAsOverLay(window.innerWidth);
  }

  getHeadClass(): string{
   
    let styleClass = '';

    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'head-md-screem'
    }else{
      styleClass = 'head-md-screem';
    }
    return styleClass;
  }

  checkCanShowSearchAsOverLay(innerWidth: number): void{
    if(innerWidth <845){
      this.canShowSearchAsOverlay = true;
    }else{
      this.canShowSearchAsOverlay = false;
    }
  }

  logout(): void {
    this.getlogout.emit(true);
  }

}
