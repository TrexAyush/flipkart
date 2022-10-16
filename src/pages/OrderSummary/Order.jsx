import React from 'react'
import Header from '../../components/Header/Header'
import { Button, Card, Checkbox, Divider, Paper, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MetaData from '../../Layouts/MetaData';
// import Stepper from './Stepper';
import { useSelector } from 'react-redux';
import CartItem from '../Cart/CartItem';
import PriceSidebar from '../Cart/PriceSidebar';
import Footer from '../../components/Footer/Footer';

const Order = () => {
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { shippingInfo } = useSelector((state) => state.cart);

    const handleChangeAddress = () =>{
        navigate("/add-new-address")
    }

    const handleSubmit = () => {
        navigate("/payments")
    }
  return (
    <>
    <MetaData title="Flipkart: Order Confirmation" />
    <Header title="Order Summary"/>
    <div className="flex flex-col w-full bg-[#f1f2f4]">
        <div className="w-full">
            <img className="w-full shadow-md" src="orderSummary.png" alt="orderSummary" />
        </div>
        <div className="flex w-full flex-col space-y-2 py-2">
            <Card className="w-full flex-col p-4">
                <div className="flex flex-row w-full pb-2">
                    <div className="flex w-full justify-start">
                        <h1 className="text-sm font-serif ">Deliver to:</h1>
                    </div>
                    <div className="flex w-full justify-end">
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
                <div className="flex flex-col text-xs space-y-1">
                    <div className="font-serif">
                        <h1>{shippingInfo.name}</h1>
                    </div>
                    <div className="font-serif">
                        {shippingInfo.addline1}<br/>
                        {shippingInfo.addline2} <br/> 
                        {shippingInfo.city}, {shippingInfo.state}, {shippingInfo.pincode}
                    </div>
                    <div className="font-sans font-medium">
                        <h1>{shippingInfo.number}</h1>
                    </div>
                </div>
            </Card>
            <Card>
                <div className="w-full bg-white">
                    {cartItems?.map((item, i) => (
                        <CartItem {...item} inCart={false} key={i} />
                    ))}
                </div>
            </Card>
            <Card
                className="w-full flex-row p-2"
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
            <div className="flex p-7 flex-row space-x-2 justify-center items-center">
                <img className='flex w-[40px] h-[40px]' src="shield.png" alt='sheild'/>
                <h1 className='flex w-full font-serif font-light text-xs text-gray-500'>Safe and Secure payments. Easy returns. 100% Authentic products</h1>
            </div>
        </div>
    </div>
    <Footer cartItems={cartItems} navigation="/payments"/>
    </>
  )
}

export default Order