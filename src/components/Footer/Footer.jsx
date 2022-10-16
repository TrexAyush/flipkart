import React from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Footer = ({ cartItems,navigation,UPI}) => {
    const navigate = useNavigate();

    // console.log(navigation)
    
    const handleNavi = () =>{
        navigate(navigation)
    }

  return (
    <div className="sticky bottom-0 z-10 flex p-2 bg-white shadow-md">
        <div className="flex flex-row justify-start w-full font-sans">
            <div className="flex flex-col w-3/4 ">
                <h1 className="text-[12px] pb-0 mb-0 line-through">{cartItems.reduce((sum, item) => sum + ((item.cuttedPrice * item.quantity) - (item.price * item.quantity)), 0).toLocaleString()}</h1>
                <div className="flex flex-row items-center space-x-2">
                <h1 className="text-base font-semibold">{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</h1>
                    <img className='w-[12px] h-[12px]' src="info.png" alt="info" />
                </div>
            </div>
            <div className="flex justify-end w-3/4">
            {UPI ? 
            <a href={navigation} className="w-full px-4 py-2 ml-4 text-xl font-semibold text-center text-white align-middle bg-orange-500 rounded-md">
                <button>Continue</button>
            </a> :
                <Button
                disabled={cartItems.length < 1 ? true : false}
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
            }
            </div>
        </div>
    </div>
  )
}

export default Footer