import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {


  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnInit() {
  }

  invertColor() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'width', 200);
  }

}
