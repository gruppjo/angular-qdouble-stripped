import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'my-lazy',
  templateUrl: './lazy.component.html'
})

export class LazyComponent implements OnInit {
  constructor (
    private el: ElementRef
  ) { }

  ngOnInit() {
    console.log($(this.el.nativeElement).width());
  }

}
