import Product from './Product';
import Slider from 'react-slick';
// import { NextBtn, PreviousBtn } from '../Banner/Banner';
import { Link } from 'react-router-dom';
import { offerProducts } from '../../../utils/constants';
import { getRandomProducts } from '../../../utils/functions';
import { useNavigate } from 'react-router-dom';
// import './deals.css'

export const settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 2,
    swipe: true,
    // prevArrow: <PreviousBtn />,
    // nextArrow: <NextBtn />,
    // responsive: [
    //     {
    //         breakpoint: 1024,
    //         settings: {
    //             slidesToShow: 3,
    //             slidesToScroll: 3
    //         }
    //     },
    //     {
    //         breakpoint: 600,
    //         settings: {
    //             slidesToShow: 2,
    //             slidesToScroll: 2
    //         }
    //     },
    //     {
    //         breakpoint: 480,
    //         settings: {
    //             slidesToShow: 1,
    //             slidesToScroll: 1
    //         }
    //     }
    // ]
};

const DealSlider = ({ title,images}) => {
    const navigate = useNavigate()
    return (
        <section className="w-full overflow-hidden shadow ">
            {/* <!-- header --> */}
            <div className="flex items-center justify-between px-4 py-2 bg-deals-bg">
                <h1 className="font-medium text-md">{title}</h1>
                <Link to="/products" className=" bg-blue-600 text-xs font-medium text-white px-5 py-2.5 rounded-md shadow-md">VIEW ALL</Link>
            </div>
         
            {/* <!-- header --> */}
            {images ? 
            <Slider {...settings}>
                {images.map((el, i) => (
                    <img 
                    draggable="false" 
                    className="grid grid-cols-2 row-auto md:grid-cols-4 bg-[#a9e6e6] p-2" 
                    src={el} 
                    alt="banner" 
                    key={i} 
                    onClick={()=>{navigate("/products")}}
                    />
                    
                ))}
            </Slider> : <Slider {...settings}>
                {getRandomProducts(offerProducts, 12).map((item, i) => (
                    <Product {...item} key={i} />
                ))}
            </Slider>}
                

        </section>
    );
};

export default DealSlider;
