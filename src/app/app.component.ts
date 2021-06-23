import { GoogleMap } from '@agm/core/services/google-maps-types';
import { DOCUMENT } from '@angular/common';
import { Component, ViewChild, Inject } from '@angular/core';
import Swiper, { SwiperOptions } from 'swiper';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  @ViewChild('swiper') swiper: { swiperRef: Swiper };


  map: GoogleMap;


  /**
   * @description swiper basic configuration
   */
  swiperConfig: SwiperOptions = {
    direction: 'vertical',
    slidesPerView: 3,
    // height: 300,
    // watchSlidesVisibility: true

  }


  // google maps zoom level
  zoom = 7;

  // initial center position for the map
  lat = 23.8859;
  lng = 45.0792;

  markers: MarkerI[] = [
    {
      lat: 24.0859,
      lng: 46.9991,
    },
    {
      lat: 23.0859,
      lng: 45.9992,
    },
    {
      lat: 23.0859,
      lng: 43.9993,
    },
    {
      lat: 23.0859,
      lng: 40.9994,
    },
    {
      lat: 23.0859,
      lng: 45.9995,
    },
    {
      lat: 23.0859,
      lng: 46.9996,
    }
  ];


  constructor(@Inject(DOCUMENT) private document: Document) { }


  /**
   * @param coords {MarkerI}
   * @param index current element index
   */
  changeMapPositionWithSwiper(coords: MarkerI, index: number): void {

    // pan to used for recenter map smoothly
    this.map.panTo(coords);
    this.map.setZoom(9);

    // to slide to slide with index
    this.swiper.swiperRef.slideTo(index);


    // remove previous active class
    this.document.querySelectorAll(`.swiper-slide`).forEach(item => item.classList.remove('active'))

    // add active class to current slide
    const activeSlide = this.document.querySelector(`.swiper-slide[data-swiper-slide-index="${index}"]`);
    activeSlide.classList.add('active')

  }

}

// just an interface for type safety.
interface MarkerI {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}

