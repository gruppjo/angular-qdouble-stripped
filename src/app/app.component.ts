import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  showMonitor = (ENV === 'development' && !AOT &&
    ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
  );
  views = [
    {
      name: 'Dashboard',
      icon: 'home',
      link: ['']
    },
    {
      name: 'Lazy',
      icon: 'file_download',
      link: ['lazy']
    },
      {
      name: 'Sync',
      icon: 'done',
      link: ['sync']
    },
    {
      name: 'Bad Link',
      icon: 'error',
      link: ['wronglink']
    }
  ];

  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) {
    console.log('store', STORE_DEV_TOOLS);
  }

  activateEvent(event) {
    if (ENV === 'development') {
      console.log('Activate Event:', event);
    }
  }

  deactivateEvent(event) {
    if (ENV === 'development') {
      console.log('Deactivate Event', event);
    }
  }
}
