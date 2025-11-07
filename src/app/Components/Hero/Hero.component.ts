import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap';

@Component({
  selector: 'app-Hero',
  templateUrl: './Hero.component.html',
})
export class HeroComponent implements OnInit, AfterViewInit {
  faLocationArrow = faLocationArrow;

  currentIndex: number = 1;
  hasClicked: boolean = false;
  isLoading: boolean = true;
  loadedVideos: number = 0;
  totalVideos: number = 4;

  @ViewChild('currentVideoRef') currentVideoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('nextVideoRef') nextVideoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('miniVideoRef') miniVideoRef!: ElementRef<HTMLVideoElement>;

  ngOnInit() {
    console.log('Hero component initialized');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.currentVideoRef?.nativeElement?.play();
    }, 100);
  }

  onVideoCanPlay() {
    this.currentVideoRef?.nativeElement?.play()
  }

handleMiniVdClick() {
  this.hasClicked = true;
  const nextIndex = this.getNextVideoIndex(); 
  this.animateVideoTransition(nextIndex);
}

  handleVideoLoaded() {
    this.loadedVideos += 1;
    if (this.loadedVideos >= this.totalVideos - 1) {
      this.isLoading = false;
    }

  }

  getVideoSrc(index: number): string {
    return `videos/hero-${index}.mp4`;
  }

  getNextVideoIndex(): number {
    return (this.currentIndex % this.totalVideos) + 1;
  }

  getMiniVideoIndex(): number {
    return (this.currentIndex % this.totalVideos) + 1;
  }

 private animateVideoTransition(nextIndex: number): void {
  const nextVideo = this.nextVideoRef?.nativeElement;
  const currentVideo = this.currentVideoRef?.nativeElement;

  nextVideo.src = this.getVideoSrc(nextIndex);
  nextVideo.load();

  gsap.set(nextVideo, { visibility: 'visible' });

  gsap.to(nextVideo, {
    transformOrigin: 'center center',
    scale: 1,
    width: '100%',
    height: '100%',
    duration: 1,
    ease: 'power1.inOut',
    
    onStart: () => {
      nextVideo.play();
    },
    
    onComplete: () => {
      this.hasClicked = false;

      this.currentIndex = nextIndex;

      currentVideo.src = this.getVideoSrc(this.currentIndex);
      currentVideo.load();
      currentVideo.play().catch(() => {});

      gsap.set(nextVideo, {
        visibility: 'hidden',
        scale: 0,
        width: '16rem',
        height: '16rem'
      });
    }
  });
  
}
}

