import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavData } from 'src/app/core/helpers/model/sidebar-nav';
import { fadeInOut, INavbarData } from './helps';

@Component({
  selector: 'app-sublevel-menu',
  templateUrl: './sublevel-menu.component.html',
  animations: [
    fadeInOut,
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({ height: '*' })),
      transition('visible <=> hidden',
        [style({ overflow: 'hidden' }),
        animate('{{transitionParams}}')]),
      transition('void => *', animate(0))
    ])
  ],
  styleUrls: ['./sidenav.component.scss'],
})
export class SublevelMenuComponent implements OnInit {

  @Input() data: INavData = {
    url: '',
    icon: '',
    name: '',
    children: []
  }


  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  constructor(public router: Router){
    
  }

  ngOnInit(): void {
  }

  handleClick(item: any): void {
    if (!this.multiple) {
      if (this.data.children && this.data.children.length > 0) {
        for (let modelItem of this.data.children) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }

  getActiveClass(item: any): string {
    return item.expanded && this.router.url.includes(item.url) ? 'active-sublevel': '';
  }

}
