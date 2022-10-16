import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Banner.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import gadgetSale from '../../../assets/images/Banners/gadget-sale.jpg';
// import kitchenSale from '../../../assets/images/Banners/kitchen-sale.jpg';
// import poco from '../../../assets/images/Banners/poco-m4-pro.webp';
// import realme from '../../../assets/images/Banners/realme-9-pro.webp';
// import fashionSale from '../../../assets/images/Banners/fashionsale.jpg';
// import oppo from '../../../assets/images/Banners/oppo-reno7.webp';

import banner1 from '../../../assets/images/Banners/banner (1).jpg';
import banner2 from '../../../assets/images/Banners/banner (2).jpg';
import banner3 from '../../../assets/images/Banners/banner (3).jpg';
import banner11 from '../../../assets/images/Banners/banner (1).jpeg';

export const PreviousBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowBackIosIcon />
    </div>
  )
}

export const NextBtn = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <ArrowForwardIosIcon />
    </div>
  )
}

const Banner = () => {

  const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // prevArrow: <PreviousBtn />,
    // nextArrow: <NextBtn />,
  };

  // const banners = [gadgetSale, kitchenSale, poco, fashionSale, realme, oppo];
  const ban =[banner11,banner1,banner2,banner3]

  return (
    <>
      <section className="relative w-full overflow-hidden rounded-sm shadow h-44 sm:h-72">
        <Slider {...settings}>
          {ban.map((el, i) => (
            <img draggable="false" className="object-cover w-full h-44 sm:h-72" src={el} alt="banner" key={i} />
          ))}
        </Slider>
      </section>
    </>
  );
};

export default Banner;
