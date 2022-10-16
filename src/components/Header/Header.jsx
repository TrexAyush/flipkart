import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '../../assets/images/Header/add.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {TextField} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
const Header  = (props) => {

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }


    return(
        <>
        <header className='sticky top-0 w-full flex z-10  shadow-md'>
            {props.home ?(
                <div className="flex flex-col w-full bg-[#2874f0] items-center p-2 space-y-1">
                    <div className="flex flex-row items-center p-1 space-x-2 w-full">
                        <div>
                            <MenuIcon className="text-white "/>
                        </div>
                        <div>
                            <img className="w-[100px] h-auto" src="logo.png" alt="logo" />
                        </div>
                        <div className="flex text-white flex-row justify-end w-full space-x-2">
                            <IconButton
                                sx={{ color:"#FFFFFF",
                                padding:"0"
                            }}
                            >
                                <img className="w-[25px]" src={AddIcon} alt="card"/>
                            </IconButton>
                            <IconButton
                                sx={{ color:"#FFFFFF",
                                        padding:"0"
                                }}
                                onClick={() =>{navigate("/cart")}}
                            >
                                <ShoppingCartIcon  />
                            </IconButton>
                            <IconButton
                                sx={{ color:"#FFFFFF",
                                        padding:"0"
                            }}
                            >
                                <PersonIcon/>
                            </IconButton>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <TextField 
                            fullWidth
                            id="searchField"
                            variant="outlined"
                            size="small"
                            value='Search'
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
                            sx={{ 
                                backgroundColor:"#FFFFFF",
                                borderRadius:"5px"
                            }}
                        />
                    </div>
                </div>

            ) : (
                <div className="flex flex-row w-full items-center bg-[#2874f0]">
                    <div className="flex p-2">
                        <IconButton
                                onClick={handleBack}
                        >
                            <ArrowBackIcon className="text-white"/> 
                        </IconButton>
                    </div>
                    <div className="flex justify-start">
                        <h1 className="text-white text-sm font-normal">{props.title}</h1>
                    </div>
                </div>
            )}
        </header>
        </>
    );
}

export default Header