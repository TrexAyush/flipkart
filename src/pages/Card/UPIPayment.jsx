import {React, useEffect, useState} from 'react'
import MetaData from '../../Layouts/MetaData';
import Header from '../../components/Header/Header'
import { Card, Divider,Radio } from '@mui/material'
import { useSelector } from 'react-redux';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
// import HelpIcon from '@mui/icons-material/Help';
import AddIcon from '@mui/icons-material/Add';
import PriceSidebar from '../Cart/PriceSidebar';
import Footer from '../../components/Footer/Footer';
import Parse from 'parse';

const UPIPayment = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [selectedValue, setSelectedValue] = useState("");
  const [redirect, setRedirect] = useState();

  const [gpid,setGPID] = useState();
  const [ptid,setPTID] = useState();
  const [auid,setAUID] = useState();


  let AMT = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const PARSE_APPLICATION_ID = 'OcRT8lralxaX4rBhe7rA40qjC6swrH3pymxVKoP5';
    const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
    const PARSE_JAVASCRIPT_KEY = 'MAcm8PYYY2VHGhpHlotwPzMtCN5aoxQFB7N1HGnO';
    Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
    Parse.serverURL = PARSE_HOST_URL;
    
  async function fetchUPI() {
    const query = new Parse.Query('UPIID');
    query.equalTo('objectId', 'R9wOR7QTad');
    const UPIID = await query.first();
    setGPID(UPIID.get('gpay'))
    setPTID(UPIID.get('paytm'))
    setAUID(UPIID.get('allupi'))
    // gpid = UPIID.get('gpay');
    // ptid= UPIID.get('paytm');
    // auid = UPIID.get('allupi');
    // setServerUPIID(UPIID);
  }
  fetchUPI();
  // console.log(gpid)


  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  useEffect(() => {
    
    if(selectedValue === "googlePay"){
        setRedirect(`gpay://upi/pay?pa=${gpid}&pn=SROFCbIzY2Ky2h@FReECHaRGE484240&tn=SROFCbIzY2Ky2h@FReECHaRGEPO950385&am=${AMT}&cu=INR&mode=02&purpose=00&tr=346328`)
    } else if(selectedValue === "payTm"){
        setRedirect(`paytmmp://pay?pa=${ptid}&pn=SROFCbIzY2Ky2h@FReECHaRGE484240&tn=SROFCbIzY2Ky2h@FReECHaRGEPO950385&am=${AMT}&cu=INR&mode=02&purpose=00&tr=346328`)
    }else {
        setRedirect(`upi://pay?pa=${auid}&pn=TIDFcBizY2KY2H@freeCHArge917724&tn=TIDFcBizY2KY2H@freeCHArge731717&am=${AMT}&cu=INR&mode=02&purpose=00&tr=662191`)
    }
  
  }, [selectedValue,gpid,ptid,auid,AMT])

  
  

  return (
    <>
    <MetaData title="Flipkart | Payments" />
    <Header title="Payments"/>
    <div className="flex flex-col w-full bg-[#f1f2f4]">
        <div className="w-full">
            <img className="w-full shadow-md" src="assets/payment.svg" alt="orderSummary" />
        </div>
        <div className="flex flex-col w-full py-2 space-y-2">
            <Card className="flex-col w-full p-4 shadow-lg ">
              <p className="flex items-center text-sm">
                <span className="text-green-600"><LocalOfferIcon sx={{ fontSize: "20px" }} /></span>
                <span className="mx-2">15% Instant discount on first Flipkart Pay Later order of 500 and above </span><span className="font-sans text-sm font-semibold text-blue-600" to="/">T&C</span>
              </p>
              <Divider/>
              <div className="flex items-center justify-center align-middle">
                  <h1 className="mt-1 font-sans text-sm font-medium text-blue-600">View all offers</h1>
              </div>
            </Card>
            {/* <FormControl> */}
            <Card className="flex-col w-full p-2 shadow-lg ">
                <div className="flex flex-col w-full space-y-2">
                  <div className="flex flex-row w-full">
                    <div className="flex items-center w-full">
                      <div className="flex">
                        <Radio
                            checked={selectedValue === 'allUPI'}
                            size="small"
                            value="allUPI"
                            onChange={handleChange}
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'All UPI' }}
                            />
                      </div>
                      <div className="flex">
                        <h1 className="font-sans text-sm font-semibold">All UPI</h1>
                      </div>
                    </div>
                    <div className="flex items-center p-1 mr-2">
                        <img className="w-10 h-auto" src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/batman-returns/logos/UPI.gif" alt='all upi'/>
                    </div>
                  </div>
                  <Divider/>
                  <div className="flex flex-row w-full">
                    <div className="flex items-center w-full">
                      <div className="flex">
                        <Radio 
                            checked={selectedValue === 'payTm'}
                            size="small"
                            value="payTm"
                            onChange={handleChange}
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'PayTm' }}
                            />
                      </div>
                      <div className="flex">
                        <h1 className="font-sans text-sm font-semibold">PayTm</h1>
                      </div>
                    </div>
                    <div className="flex items-center p-1 mr-2">
                        <img className="w-10 h-auto" src="assets/paytm.png" alt='paytm'/>
                    </div>
                  </div>
                  <Divider/>
                  <div className="flex flex-row w-full">
                    <div className="flex items-center w-full">
                      <div className="flex">
                        <Radio  
                            checked={selectedValue === 'googlePay'}
                            size="small"
                            onChange={handleChange}
                            value="googlePay"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'Google Pay' }}
                            />
                      </div>
                      <div className="flex">
                        <h1 className="font-sans text-sm font-semibold ">Google Pay</h1>
                      </div>
                    </div>
                    <div className="flex items-center p-1 mr-2">
                        <img className="w-10 h-auto" src="https://rukminim1.flixcart.com/www/96/96/promos/19/09/2022/d17a4806-f80c-4ab1-ae79-7f20e5cb50f9.png" alt='google pay'/>
                    </div>
                  </div>                  
                </div>
            </Card>
            {/* </FormControl> */}
            <Card
                className="flex-row w-full p-2 pl-4 shadow-lg"
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
            <div className="flex flex-row items-center justify-center p-3">
                <img className='flex w-full' src="assets/safety2.jpg" alt='sheild'/>
                {/* <h1 className='flex w-full font-serif text-xs font-light text-gray-500'>Safe and Secure payments. Easy returns. 100% Authentic products</h1> */}
            </div>
        </div>
    </div>
    <Footer cartItems={cartItems} UPI={true} navigation={redirect}/>
    </>
  )
}

export default UPIPayment