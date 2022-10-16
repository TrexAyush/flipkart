import {React} from 'react'
import { Button, TextField, Typography} from '@mui/material'
import { useForm } from 'react-hook-form'
import MyLocationIcon from '@mui/icons-material/MyLocation';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../actions/cartAction';
import axios from 'axios'

const Address = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { shippingInfo } = useSelector((state) => state.cart);

    const addressSchema = Yup.object().shape({ 
        name:Yup
            .string()
            .required("Please provide the necessary details."),
        number: Yup
            .string()
            .typeError("Enter valid phone number")
            .min(10,"Enter valid Phone Number.")
            .max(10)
            .required("Please provide the necessary details."),
        pincode: Yup
            .string()
            .min(6)
            .max(6)
            .typeError("Enter valid Pincode")
            .required("Please provide the necessary details."),
        state: Yup
            .string()
            .required("Please provide the necessary details."),
        city: Yup
            .string()
            .required("Please provide the necessary details."),
        addline1:Yup
            .string()
            .required("Please provide the necessary details."),
        addline2:Yup
            .string()
            .required("Please provide the necessary details."),
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
        resolver: yupResolver(addressSchema),
        defaultValues:{
            name:shippingInfo.name,
            number:shippingInfo.number,
            pincode:shippingInfo.pincode,
            city:shippingInfo.city,
            state:shippingInfo.state,
            addline1:shippingInfo.addline1,
            addline2:shippingInfo.addline2,
        }                                           

    });
    const getStateData=(pincode) => {
        axios.get(`https://api.postalpincode.in/pincode/${pincode}`)
        .then((response)=>{
            const {data}= response;
            // console.log(data)
            setValue("city",data[0].PostOffice[0].District)
            setValue("state",data[0].PostOffice[0].State)
        }).catch((error)=>{
            console.log(error);
        })
    }


    const onSubmit = (data) => {
        dispatch(saveShippingInfo(data));
        enqueueSnackbar("Address saved", { variant: "success" });
        navigate("/order-summary")
        
        // console.log(data)
    }


  return (
    <>
    <Header title="Add delivery address"/>
    <div className="flex flex-col w-full">
        <div className="w-full">
            <img className="w-full shadow-md" src="steps.svg" alt='steps'/>
        </div>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col w-full p-2 space-y-3">
            <TextField
                id="name"
                {...register("name")}
                required
                fullWidth
                label="Full Name (Required)"
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
                type="text"
                error={Boolean(errors?.name)}
                helperText={errors.name?.message}
            />
            <TextField
                id="number"
                {...register("number")}
                required
                fullWidth
                label="Phone Number (Required)"
                type="number"
                InputLabelProps={{
                    style: { 
                        fontSize: "16px"
                      },
                }}
                inputProps={{
                    maxLength:10,
                    style: { 
                      fontSize: "16px"
                    },
                  }}
                error={Boolean(errors?.number)}
                helperText={errors.number?.message}
            />
            <div className="flex flex-row w-full space-x-4">
                <div className="flex w-full">
                <TextField
                    id="pincode"
                    {...register("pincode")}
                    required
                    fullWidth
                    label="Pincode (Required)"
                    type="number"
                    onKeyUp={((e)=>{
                        if( e.target.value.length === 6){
                            getStateData(e.target.value)
                        }
                     })}
                    InputLabelProps={{
                        style: { 
                            fontSize: "16px"
                          },
                    }}
                    inputProps={{
                        maxLength:6,
                        style: { 
                          fontSize: "16px"
                        },
                      }}
                    error={Boolean(errors?.pincode)}
                    helperText={errors.pincode?.message}
                    // { ...(Boolean(errors.pincode))? "":getStateData()}
                />
                </div>
                <div className="flex items-center">
                    <Button
                        id="locationBtn"
                        size="small"
                        variant="contained"
                        fullWidth
                        startIcon={<MyLocationIcon />}
                        >
                            <Typography variant="h1" sx={{fontSize:"14px"}}>Use my location</Typography>
                    </Button>
                </div>
            </div>
            <div className="flex flex-row w-full space-x-2">
                <div className="flex">
                    <TextField
                        id="state"
                        {...register("state")}
                        required
                        fullWidth
                        label="State (Required)"
                        type="text"
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
                        error={Boolean(errors?.state)}
                        helperText={errors.state?.message}
                    />
                </div>
                <div className="flex items-center">
                    <TextField
                        id="city"
                        {...register("city")}
                        required
                        fullWidth
                        label="City (Required)"
                        type="text"
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
                        error={Boolean(errors?.city)}
                        helperText={errors.city?.message}
                    />
                </div>
            </div>
            <TextField
                id="addline1"
                required
                fullWidth
                {...register("addline1")}
                label="House No., BuildingName (Required)"
                type="text"
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
                  error={Boolean(errors?.addline1)}
                  helperText={errors.addline1?.message}
            />
            <TextField
                id="addline2"
                required
                fullWidth
                {...register("addline2")}
                label="Road Name, Area, Colony (Required)"
                type="text"
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
                  error={Boolean(errors?.addline2)}
                  helperText={errors.addline2?.message}
            />
            <div className="flex flex-col ">
                <div className="flex">
                    <h1 className="font-serif text-xs text-left text-gray-500">Type of address</h1>
                </div>
                <div className="flex p-2 space-x-2">
                    <Button
                    variant="contained"
                    size="small"
                    sx={{ 
                        fontSize: "12px",
                        borderRadius: "25px"}}
                        startIcon={<HomeIcon />}
                    >
                        Home
                    </Button>
                    <Button
                    variant="outlined"
                    size="small"
                    sx={{ 
                        fontSize: "12px",
                        borderRadius: "25px"}}
                        startIcon={<ApartmentIcon />}
                    >
                        Work
                    </Button>
                </div>
            </div>
            <Button
            fullWidth
            variant='contained'
            type='submit'
            className="bottom-0 "
            sx={{ backgroundColor:"#FF5800"}}
            >
                Save Address
            </Button>
        </div>
        </form>
    </div>
    </>
  )
}

export default Address