import React from 'react'
import MetaData from '../../Layouts/MetaData';
import Header from '../../components/Header/Header'
import { Button, Card, Checkbox, Divider,FormLabel,Radio,FormControl,RadioGroup,FormControlLabel,Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import HelpIcon from '@mui/icons-material/Help';
import AddIcon from '@mui/icons-material/Add';
import PriceSidebar from '../Cart/PriceSidebar';
import Footer from '../../components/Footer/Footer';

const Payments = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
    <MetaData title="Flipkart: Order Confirmation" />
    <Header title="Order Summary"/>
    <div className="flex flex-col w-full bg-[#f1f2f4]">
        <div className="w-full">
            <img className="w-full shadow-md" src="assets/payment.svg" alt="orderSummary" />
        </div>
        <div className="flex w-full flex-col space-y-2 py-2">
            <Card className="w-full flex-col p-4 shadow-lg ">
              <p className="text-sm flex items-center">
                <span className="text-green-600"><LocalOfferIcon sx={{ fontSize: "20px" }} /></span>
                <span className="mx-2">15% Instant discount on first Flipkart Pay Later order of 500 and above </span><span className="text-blue-600 font-semibold font-sans text-sm" to="/">T&C</span>
              </p>
              <Divider/>
              <div className="flex justify-center align-middle items-center">
                  <h1 className="text-sm font-medium font-sans mt-1 text-blue-600">View all offers</h1>
              </div>
            </Card>
            <Card className="w-full flex-col p-2 shadow-lg ">
                <div className="flex flex-col w-full space-y-2">
                  <div className="flex flex-row w-full">
                    <div className="flex items-center w-full">
                      <div className="flex">
                        <Radio disabled size="small"/>
                      </div>
                      <div className="flex">
                        <h1 className="text-gray-400 font-sans font-normal text-sm">UPI</h1>
                      </div>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-gray-400 font-sans font-normal text-[12px]">Unavailable</h1>
                        <HelpIcon sx={{ color:"#e5e7eb",
                                        fontSize:"25px"
                        }}/>
                    </div>
                  </div>

                  <Divider/>

                  <div className="flex flex-row w-full">
                    <div className="flex items-center w-full">
                      <div className="flex">
                        <Radio disabled size="small"/>
                      </div>
                      <div className="flex">
                        <h1 className="text-gray-400 font-sans font-normal text-sm">Wallets</h1>
                      </div>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-gray-400 font-sans font-normal text-[12px]">Unavailable</h1>
                        <HelpIcon sx={{ color:"#e5e7eb",
                                        fontSize:"25px"
                        }}/>
                    </div>
                  </div>
                  <Divider/>
                  <div className="flex flex-row w-full">
                    <div className="flex items-center ">
                        <Radio size="small" checked/>
                    </div>
                    <div className="flex flex-col justify-start items-center space-y-1">
                        <h1 className=" w-full font-sans font-normal text-sm">Credit / Debit / ATM Card</h1>
                        <h1 className="w-full text-gray-400 font-sans font-normal text-[12px]">Add and secure your card as per RBI guidelines</h1>
                    </div>
                  </div>
                  <Divider/>
                  <div className="flex flex-row w-full">
                    <div className="flex items-center w-full">
                      <div className="flex">
                        <Radio disabled size="small"/>
                      </div>
                      <div className="flex">
                        <h1 className="text-gray-400 font-sans font-normal text-sm">Net Banking</h1>
                      </div>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-gray-400 font-sans font-normal text-[12px]">Unavailable</h1>
                        <HelpIcon sx={{ color:"#e5e7eb",
                                        fontSize:"25px"
                        }}/>
                    </div>
                  </div>
                  <Divider/>
                  <div className="flex flex-row w-full">
                    <div className="flex items-center w-full">
                      <div className="flex">
                        <Radio disabled size="small"/>
                      </div>
                      <div className="flex">
                        <h1 className="text-gray-400 font-sans font-normal text-sm">EMI (Easy Installments)</h1>
                      </div>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-gray-400 font-sans font-normal text-[12px]">Unavailable</h1>
                        <HelpIcon sx={{ color:"#e5e7eb",
                                        fontSize:"25px"
                        }}/>
                    </div>
                  </div>
                  <Divider/>
                  <div className="flex flex-row w-full">
                    <div className="flex items-center w-full">
                      <div className="flex">
                        <Radio disabled size="small"/>
                      </div>
                      <div className="flex">
                        <h1 className="text-gray-400 font-sans font-normal text-sm">Cash on Delivery</h1>
                      </div>
                    </div>
                    <div className="flex items-center">
                        <h1 className="text-gray-400 font-sans font-normal text-[12px]">Unavailable</h1>
                        <HelpIcon sx={{ color:"#e5e7eb",
                                        fontSize:"25px"
                        }}/>
                    </div>
                  </div>
                </div>
            </Card>
            <Card
                className="w-full flex-row p-2 pl-4 shadow-lg"
            >
                <div className='flex items-center space-x-2'>
                  <AddIcon sx={{ 
                    color:"#808080",
                    fontSize:"25px" }}/>
                  <h1 className="flex font-sans text-sm">Gift Card</h1>
                </div>
            </Card>
            <Card>
                <PriceSidebar cartItems={cartItems} />
            </Card>
            <div className="w-full">
                <img className="w-full" src="assets/safety1.svg" alt="banner"/>
            </div>
            <div className="flex p-3 flex-row justify-center items-center">
                <img className='flex w-full' src="assets/safety2.jpg" alt='sheild'/>
                {/* <h1 className='flex w-full font-serif font-light text-xs text-gray-500'>Safe and Secure payments. Easy returns. 100% Authentic products</h1> */}
            </div>
        </div>
    </div>
    <Footer cartItems={cartItems} navigation="/card-payments"/>
    </>
  )
}

export default Payments