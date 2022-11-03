import { animate, style, transition, trigger } from "@angular/animations";

export interface INavbarData{
    url:string;
    icon?:string;
    name:string;
    expanded?:boolean;
    items?:INavbarData[];

}

export const fadeInOut =  trigger('fadeInOut', [
    transition(':enter', [
      style({opacity: 0}),
      animate('350ms',
        style({opacity: 1})
      )
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate('350ms',
        style({opacity: 0})
      )
    ])
  ])