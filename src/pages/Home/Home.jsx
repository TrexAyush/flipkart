import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Banner from '../../components/Home/Banner/Banner'
import DealSlider from '../../components/Home/DealSlider/DealSlider'
import offer1 from '../../assets/images/offer/offer1.jpg'
import offer2 from '../../assets/images/offer/offer2.jpg'
import offer3 from '../../assets/images/offer/offer3.jpg'
import offer4 from '../../assets/images/offer/offer4.jpg'
import offer5 from '../../assets/images/offer/offer5.jpg'
import {useNavigate} from 'react-router-dom'
import Product from '../Products/Product'
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Layouts/Loader';


const Home = () => {
    const navigate = useNavigate();

    const offerImages = [offer1,offer2,offer3,offer4,offer5]
    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);
  return (
    <>
    <Header home={true} />
    <div className="flex flex-col">
      <Banner/>
        <div className="grid grid-flow-col auto-rows-max bg-[#742aa1] p-1"> 
        { offerImages?.map((item,index)=> (
            <img 
              key={index}
              draggable="false" 
              onClick={()=>{navigate("/products")}}
              src={item} 
              alt="banner"/>
        ))}
        </div>
        {/* <div className="grid grid-flow-col auto-rows-max bg-[#742aa1] p-1"> 
        { offerImages?.map((item)=> (
            <img 
              draggable="false" 
              onClick={()=>{navigate("/products")}}
              src={item} 
              alt="banner"/>
        ))}
        </div> */}
        
          <div className="flex flex-col gap-2 pb-4 justify-center items-center w-full overflow-hidden bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-4 w-full place-content-start overflow-hidden pb-4 border-b">
               {products?.map((product) => (
                <>
                  <Product {...product} key={product._id} />    
                </>
                ))
              }
            </div>
          </div>
  
        <DealSlider/>
    </div>
    </>
  )
}

export default Home