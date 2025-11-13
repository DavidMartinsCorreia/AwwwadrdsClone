import { Component, AfterViewInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'About',
  templateUrl: './About.component.html',
  styleUrls: ['./About.component.css'],
})
export class AboutComponent implements AfterViewInit {
  @ViewChild('mask', { static: false }) mask!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const maskEl = this.mask.nativeElement;

      gsap.timeline({
        scrollTrigger: {
          trigger: '#clip',
          start: 'center center',
          end: '+=800 center',
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
        },
      })
      .to(maskEl, {
        width: window.innerWidth,
        height: window.innerHeight,
        borderRadius: '0%',
        xPercent: -50,
        yPercent: -50,
        ease: 'power2.out',
      });
    }
  }
}
