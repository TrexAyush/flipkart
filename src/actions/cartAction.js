import axios from "axios"
import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";
import { products } from "../utils/constants";


// add to cart
export const addItemsToCart = (id, quantity = 1) => async (dispatch, getState) => {
    // var config = {
    //     method: 'get',
    //     url: 'https://parseapi.back4app.com/classes/Product',
    //     headers: { 
    //       'X-Parse-Application-Id': 'OcRT8lralxaX4rBhe7rA40qjC6swrH3pymxVKoP5', 
    //       'X-Parse-REST-API-Key': 'koetkVpvdmcklY8621tKdDGEkrUj4UZOHD4ogeIt'
    //     }
    //   };
    //   axios(config)
        // .then(function (response) {
            const response = products;
            const resArray = [];
            // console.log(response.data.results)

            response.results.map((product)=>{
                var imageArr = []
                product.images.map((image)=>{
                    // var id = Date.now();
                    const imageObj = {
                        // "public_id": id,
                        "url": image,
                        // "_id": id,
                    }
                    imageArr.push(imageObj);
                })

                const productRES = {
                    "brand":{
                        "logo":{
                            "public_id":"brands/"+Date.now(),
                            "url":product.logo,
                        },
                        "name":product.brandname,
                    },
                    "_id":product.objectId,
                    "name":product.name,
                    "description":product.description,
                    "highlights":product.highlights,
                    "specifications":product.specifications,
                    "price": product.price,
                    "cuttedPrice": product.cuttedPrice,
                    "images":imageArr,
                    "category": product.category,
                    "stock": product.stock,
                    "warranty": product.warranty,
                    "ratings": 5,
                    "numOfReviews": 1,
                    "reviews": [],
                }
                if(product.objectId === id){
                    resArray.push(productRES)
                }
                // return resArray
            })
            
            const data = {

                "success": true,
                "product": resArray[0],
            }
                dispatch({
                type: ADD_TO_CART,
                payload: {
                    product: data.product._id,
                    name: data.product.name,
                    seller: data.product.brand.name,
                    price: data.product.price,
                    cuttedPrice: data.product.cuttedPrice,
                    image: data.product.images[0].url,
                    stock: data.product.stock,
                    quantity,
                },
            });
            localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

        // }).catch((error)=>{
        //     console.log(error)
        // })
}

// remove cart item
export const removeItemsFromCart = (id) => async (dispatch, getState) => {

    dispatch({
        type: REMOVE_FROM_CART,
        payload: id,
    });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// empty cart
export const emptyCart = () => async (dispatch, getState) => {

    dispatch({ type: EMPTY_CART });

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

// save shipping info
export const saveShippingInfo = (data) => async (dispatch) => {

    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem('shippingInfo', JSON.stringify(data));
}