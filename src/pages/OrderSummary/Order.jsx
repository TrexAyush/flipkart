import React from 'react'
import Header from '../../components/Header/Header'
import { Button, Card, Checkbox } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../Layouts/MetaData';
// import Stepper from './Stepper';
import { useSelector } from 'react-redux';
import CartItem from '../Cart/CartItem';
import PriceSidebar from '../Cart/PriceSidebar';
import Footer from '../../components/Footer/Footer';
// import Cart from '../Cart/Cart';
import EmptyCart from '../Cart/EmptyCart';

const Order = () => {
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { shippingInfo } = useSelector((state) => state.cart);


    const handleChangeAddress = () =>{
        navigate("/add-new-address")
    }
    

  return (
    <>
    <MetaData title="Flipkart: Order Confirmation" />
    <Header title="Order Summary"/>
    <div className="flex flex-col w-full bg-[#f1f2f4]">
        <div className="w-full">
            <img className="w-full shadow-md" src="orderSummary.png" alt="orderSummary" />
        </div>
        <div className="flex flex-col w-full py-2 space-y-2">
            <Card className="flex-col w-full p-4">
                <div className="flex flex-row w-full pb-2">
                    <div className="flex justify-start w-full">
                        <h1 className="font-serif text-base ">Deliver to:</h1>
                    </div>
                    <div className="flex justify-end w-full">
                        <Button
                        variant="outlined"
                        size='small'
                        sx={{ 
                            fontSize: "12px"
                        }}
                        onClick={handleChangeAddress}
                        >
                            Change
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col space-y-1 text-sm">
                    <div className="font-serif">
                        <h1>{shippingInfo.name}</h1>
                    </div>
                    <div className="font-serif">
                        {shippingInfo.addline1}<br/>
                        {shippingInfo.addline2} <br/> 
                        {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.pincode}
                    </div>
                    <div className="font-sans text-base font-medium">
                        <h1>{shippingInfo.number}</h1>
                    </div>
                </div>
            </Card>
            <Card>
                <div className="w-full bg-white">
                    {cartItems && cartItems.length === 0 && (
                                <EmptyCart />
                            )}

                            {cartItems && cartItems.map((item) => (
                                <CartItem {...item} inCart={true} />
                            )
                            )}
                    {/* <Cart/> */}
                </div>
            </Card>
            <Card
                className="flex-row w-full p-2"
            >
                <div className='flex items-center'>
                <Checkbox size="small" className="flex" checked={false}/>
                <h1 className="flex font-sans text-sm ">Use GST Invoice</h1>
                </div>
            </Card>
            <Card>
                <PriceSidebar cartItems={cartItems} />
            </Card>
            <div>
                <img src="FlipkartPlus4scbanner.png" alt="banner"/>
            </div>
            <div className="flex flex-row items-center justify-center space-x-2 p-7">
                <img className='flex w-[40px] h-[40px]' src="shield.png" alt='sheild'/>
                <h1 className='flex w-full font-serif text-xs font-light text-gray-500'>Safe and Secure payments. Easy returns. 100% Authentic products</h1>
            </div>
        </div>
    </div>
    <Footer cartItems={cartItems} navigation="/payments"/>
    </>
  )
}

export default Order