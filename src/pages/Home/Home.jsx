import React from 'react'
import Header from '../../components/Header/Header'
import Banner from '../../components/Home/Banner/Banner'
import DealSlider from '../../components/Home/DealSlider/DealSlider'
import offer1 from '../../assets/images/offer/offer1.jpg'
import offer2 from '../../assets/images/offer/offer2.jpg'
import offer3 from '../../assets/images/offer/offer3.jpg'
import offer4 from '../../assets/images/offer/offer4.jpg'
import offer5 from '../../assets/images/offer/offer5.jpg'
import {useNavigate} from 'react-router-dom'
import Products from '../Products/Products'

import img1 from '../../assets/images/products/01a3c18cd73f8c34.jpg'
import img2 from '../../assets/images/products/2ee28c9b5ecf103d.jpg'
import img3 from '../../assets/images/products/03c9f46953a0a471.jpg'
import img4 from '../../assets/images/products/6c5af63c31a86d32.jpg'
import img5 from '../../assets/images/products/6c5af63c31a86d32.jpg'
import img6 from '../../assets/images/products/b3adb53d85e9e2b0.jpg'
import img7 from '../../assets/images/products/cb829f4a4f070aa8.jpg'
import img8 from '../../assets/images/products/db941908196bb64c.jpg'


const Home = () => {
    const navigate = useNavigate();
    const offerImages = [offer1,offer2,offer3,offer4,offer5];
    const productImages = [img1,img2,img3,img4,img5,img6,img7,img8]
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
        <DealSlider images={productImages} title="Popular Picks "/>
        

        <div className="w-full bg-[#fdfdfd] p-1"> 
          <Products home={true}/>
        
        {/* { productImages?.map((item)=> (
            <img 
              draggable="false" 
              onClick={()=>{navigate("/products")}}
              src={item} 
              alt="banner"/>
        ))} */}
        </div> 
  
        
    </div>
    </>
  )
}

export default Home