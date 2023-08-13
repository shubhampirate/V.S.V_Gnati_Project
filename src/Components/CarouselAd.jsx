// src/components/Carousel.js
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./Carouselstyles.css";

const CarouselAd = () => {
    const settings = {
        dots: true,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },

        ]
    };

    const data = [
        {
            id: 1,
            imageUrl: 'https://via.placeholder.com/300x200?text=Image%201',
        },
        {
            id: 2,
            imageUrl: 'https://via.placeholder.com/300x200?text=Image%202',
        },
        {
            id: 3,
            imageUrl: 'https://via.placeholder.com/300x200?text=Image%203',
        },
        {
            id: 4,
            imageUrl: 'https://via.placeholder.com/300x200?text=Image%204',
        },
        {
            id: 5,
            imageUrl: 'https://via.placeholder.com/300x200?text=Image%205',
        },
        {
            id: 6,
            imageUrl: 'https://via.placeholder.com/300x200?text=Image%206',
        },
    ];


    return (
        <Slider {...settings}>
            {data.map(item => (
                <div key={item.id}>
                    <img src={item.imageUrl} style={{ width: "100%" }} />
                </div>
            ))}
        </Slider>
    );
};

export default CarouselAd;

// import React from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { Container, Typography } from '@mui/material';

// const imageUrls = [
//     'https://via.placeholder.com/1200x600?text=Image+1',
//     'https://via.placeholder.com/1200x600?text=Image+2',
//     'https://via.placeholder.com/1200x600?text=Image+3',
// ];

// const CarouselAd = () => {
//     const settings = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         fade: true,
//     };

//     return (
//         <div className="App">
//             <Slider {...settings}>
//                 {imageUrls.map((imageUrl, index) => (
//                     <div key={index}>
//                         <img src={imageUrl} alt={`Carousel ${index + 1}`} style={{ width: "100%", height: "99%" }} />
//                     </div>
//                 ))}
//             </Slider>
//             <div className="text-overlay">
//                 <Container>
//                     <Typography variant="h3" component="h1" gutterBottom>
//                         Welcome to Our Website
//                     </Typography>
//                     <Typography variant="body1" gutterBottom>
//                         Explore our services and products to find what suits you best.
//                     </Typography>
//                 </Container>
//             </div>
//             <style>
//                 {`
//           .App {
//             position: relative;
//           }

//           .text-overlay {
//             position: absolute;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             text-align: center;
//             color: white;
//           }

//         `}
//             </style>
//         </div>
//     );
// };

// export default CarouselAd;
