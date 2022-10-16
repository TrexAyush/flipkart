import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Footer = ({ cartItems,navigation}) => {
    const navigate = useNavigate();
    const handleNavi = () =>{
        navigate(navigation)
    }

  return (
    <div className="flex sticky bottom-0 z-10 shadow-md bg-white p-2">
        <div className="flex flex-row w-full justify-start font-sans">
            <div className="flex flex-col w-3/4 ">
                <h1 className="text-[12px] pb-0 mb-0 line-through">{cartItems.reduce((sum, item) => sum + ((item.cuttedPrice * item.quantity) - (item.price * item.quantity)), 0).toLocaleString()}</h1>
                <div className="flex flex-row items-center space-x-2">
                <h1 className="text-sm">{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</h1>
                    <img className='w-[12px] h-[12px]' src="info.png" alt="info" />
                </div>
            </div>
            <div className="flex justify-end w-3/4">
                <Button
                sx={{   
                    fontSize:"12px",
                    backgroundColor:"#FF5800"}}
                size='small'
                variant="contained"
                onClick={handleNavi}
                fullWidth
                >
                    Continue
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Footer