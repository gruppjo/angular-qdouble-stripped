import { Component, OnDestroy, OnInit, ElementRef } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { User } from '../user/user.model';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`#my-logout-button { background: #F44336 }`],
  animations: [
    trigger('show', [
      state('void', style({
        'opacity': '0'
      })),
      state('*', style({
        'opacity': '1'
      })),
      transition('void => *', animate('300ms ease')),
      transition('* => void', animate('300ms ease'))
    ])
  ]
})
export class DashboardComponent implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  form: FormGroup;
  nameLabel = 'Enter your name';
  user: User = {
    name: ''
  };
  show: boolean = true;
  constructor(
    private el: ElementRef,
    fb: FormBuilder,
  ) {
    this.form = fb.group({
      name: ''
    });
  }

  ngOnInit() {
    console.log($(this.el.nativeElement).width());
  }

  clearName() {
    this.show = true;
    this.user.name = '';
  }

  logout() {
  }

  submitState(value: string) {
    this.show = false;
    this.user.name = value;
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
