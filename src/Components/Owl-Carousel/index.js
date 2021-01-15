import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function OwlCarouselComponent({content,items,dots,loop}) {
    return (
    <OwlCarousel
        className="owl-theme"
        items={items}
        dots={dots}
        loop={loop}
        margin={0}
        nav
    >
        
          {
            content
          }
    </OwlCarousel>
    )
}
