import React, { useState } from 'react'
import { Box, Button, TextField } from '@mui/material'
import { useSnackbar } from 'notistack';
import Parse from 'parse';
const AddUPI = () => {
    const { enqueueSnackbar } = useSnackbar();
    const PARSE_APPLICATION_ID = 'OcRT8lralxaX4rBhe7rA40qjC6swrH3pymxVKoP5';
    const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
    const PARSE_JAVASCRIPT_KEY = 'MAcm8PYYY2VHGhpHlotwPzMtCN5aoxQFB7N1HGnO';
    Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
    Parse.serverURL = PARSE_HOST_URL;
    
    const [googlePayUPI,setGooglePayUPI] = useState("");
    const [paytm,setPaytmUPI] = useState("");
    const [allUpi,setAllUpi] = useState("");


    const handleChangeGooglePay = (event) =>{
        setGooglePayUPI(event.target.value)
    }
    const handleChangePayTm = (event) =>{
        setPaytmUPI(event.target.value)
    }
    const handleChangeAllUPI = (event) =>{
        setAllUpi(event.target.value)
    }

    async function updateGpayUPI(data) {
        try {
          const UPIID = new Parse.Object('UPIID');
          UPIID.set('objectId',"R9wOR7QTad");
          UPIID.set('gpay', data);
          await UPIID.save();
          enqueueSnackbar("Gpay Updated", { variant: "success" });
        } catch (error) {
          console.log('Error saving new person: ', error);
          enqueueSnackbar("Gpay Update Failed", { variant: "error" });
        }
      }
    async function updatePaytmUPI(data) {
        try {
          const UPIID = new Parse.Object('UPIID');
          UPIID.set('objectId',"R9wOR7QTad");
          UPIID.set('paytm', data);
          await UPIID.save();
          enqueueSnackbar("paytm Updated", { variant: "success" });
        } catch (error) {
          console.log('Error saving new person: ', error);
          enqueueSnackbar("paytm Update Failed", { variant: "error" });
        }
      }
    
    async function updateALLUPI(data) {
        try {
          const UPIID = new Parse.Object('UPIID');
          UPIID.set('objectId',"R9wOR7QTad");
          UPIID.set('allupi', data);
          await UPIID.save();
          enqueueSnackbar("allupi Updated", { variant: "success" });
        } catch (error) {
          console.log('Error saving new person: ', error);
          enqueueSnackbar("allupi Update Failed", { variant: "error" });
        }
      }

    const updateGooglePay = () => {
        updateGpayUPI(googlePayUPI)
    }
    const updatePayTm = () => {
        updatePaytmUPI(paytm)
    }
    const updateAllUPI = () => {
        updateALLUPI(allUpi)
    }

// ==================================================================//

  return (
    <>
    <div className='flex flex-col w-full p-2 space-y-2'>
        <Box
            component="form"
            noValidate
            autoComplete='off'
            className='flex flex-col w-full space-y-2'
        >
            <h1>Google Pay</h1>
            <div className='flex flex-col w-full space-y-2'>
                <div className='flex flex-row w-full'>
                    <TextField 
                        fullWidth
                        variant='outlined'
                        label="Enter UPI Id"
                        id='googlePay'
                        name='googlePay'
                        onChange={handleChangeGooglePay}
                        value={googlePayUPI}
                    />
                </div>
                <div className='flex flex-row w-full'>
                    <Button 
                        fullWidth
                        variant="contained"
                        onClick={updateGooglePay}
                        >Update</Button>
                </div>
            </div>
        </Box>
        <Box
            component="form"
            noValidate
            autoComplete='off'
            className='flex flex-col w-full space-y-2'
        >
            <h1>Pay Tm</h1>
            <div className='flex flex-col w-full space-y-2'>
                <div className='flex flex-row w-full'>
                    <TextField 
                        fullWidth
                        variant='outlined'
                        label="Enter UPI Id"
                        id='payTm'
                        name='payTm'
                        onChange={handleChangePayTm}
                        value={paytm}
                    />
                </div>
                <div className='flex flex-row w-full'>
                    <Button 
                        fullWidth
                        variant="contained"
                        onClick={updatePayTm}
                        >Update</Button>
                </div>
            </div>
        </Box>
        <Box
            component="form"
            noValidate
            autoComplete='off'
            className='flex flex-col w-full space-y-2'
        >
            <h1>All UPI</h1>
            <div className='flex flex-col w-full space-y-2'>
                <div className='flex flex-row w-full'>
                    <TextField 
                        fullWidth
                        variant='outlined'
                        label="Enter UPI Id"
                        id='allupi'
                        name='allupi'
                        onChange={handleChangeAllUPI}
                        value={allUpi}
                    />
                </div>
                <div className='flex flex-row w-full'>
                    <Button 
                        fullWidth
                        variant="contained"
                        onClick={updateAllUPI}
                        >Update</Button>
                </div>
            </div>
        </Box>
    </div>
    </>
  )
}

export default AddUPI