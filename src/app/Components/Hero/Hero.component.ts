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
    console.log('Current index on init:', this.currentIndex);
    setTimeout(() => {
      this.currentVideoRef?.nativeElement?.play().catch((err) => {
        console.error('Error playing video:', err);
      });
    }, 100);
  }

  onVideoCanPlay() {
    this.currentVideoRef?.nativeElement?.play().catch((err) => {
      console.error('Error auto-playing video:', err);
    });
  }

  handleMiniVdClick() {
    this.hasClicked = true;
    this.currentIndex = this.getNextVideoIndex();
    console.log('Clicked! New index:', this.currentIndex);

    this.animateVideoTransition();
    this.miniVideoRef?.nativeElement?.load();
  }

  handleVideoLoaded() {
    this.loadedVideos += 1;
    this.isLoading = false;
    console.log('Video loaded successfully. Total loaded:', this.loadedVideos);
  }

  getVideoSrc(index: number): string {
    const safeIndex = ((index - 1) % this.totalVideos) + 1;
    return `/videos/hero-${safeIndex}.mp4`;
  }

  getNextVideoIndex(): number {
    return this.currentIndex >= this.totalVideos ? 1 : this.currentIndex + 1;
  }

  private animateVideoTransition(): void {
    if (this.hasClicked) {
      const nextVideo = this.nextVideoRef?.nativeElement;

      gsap.set('#next-video', { visibility: 'visible' });

      gsap.to('#next-video', {
        transformOrigin: 'center center',
        scale: 1,
        width: '100%',
        height: '100%',
        duration: 1,
        ease: 'power1.inOut',
        onStart: () => {
          if (nextVideo) {
            nextVideo.play();
          }
        },
      });

      gsap.from('#current-video', {
        transformOrigin: 'center center',
        scale: 0,
        duration: 1.5,
        ease: 'power1.inOut',
      });
    }
  }
}
