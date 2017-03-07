import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

import { User } from '../user/user.model';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`#my-logout-button { background: #F44336 }`]
})

export class DashboardComponent implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  form: FormGroup;
  nameLabel = 'Enter your name';
  user: User = {
    name: 'Angular user'
  };
  constructor(
    fb: FormBuilder,
  ) {
    this.form = fb.group({
      name: ''
    });
  }

  ngOnInit() {
  }

  clearName() {
    this.user.name = '';
  }

  logout() {
  }

  submitState(value: string) {
    this.user.name = value;
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
