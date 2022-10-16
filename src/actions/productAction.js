import axios from "axios";
import { addProduct} from "../utils/functions";
import { products } from "../utils/constants";

import {
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAIL,
    CLEAR_ERRORS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    ALL_REVIEWS_REQUEST,
    ALL_REVIEWS_SUCCESS,
    ALL_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    SLIDER_PRODUCTS_REQUEST,
    SLIDER_PRODUCTS_SUCCESS,
    SLIDER_PRODUCTS_FAIL,
} from "../constants/productConstants";

// Get All Products --- Filter/Search/Sort
export const getProducts =
    (keyword = "", category, price = [0, 200000], ratings = 0, currentPage = 1) => async (dispatch) => {
       
            dispatch({ type: ALL_PRODUCTS_REQUEST });

            // let url = `http://localhost:4000/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&page=${currentPage}`;
            // if (category) {
            //     url = `http://localhost:4000/api/v1/products?keyword=${keyword}&category=${category}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&page=${currentPage}`;
            // }

            // var config = {
            //     method: 'get',
            //     url: 'https://parseapi.back4app.com/classes/Product',
            //     headers: { 
            //       'X-Parse-Application-Id': 'OcRT8lralxaX4rBhe7rA40qjC6swrH3pymxVKoP5', 
            //       'X-Parse-REST-API-Key': 'koetkVpvdmcklY8621tKdDGEkrUj4UZOHD4ogeIt'
            //     }
            //   };
            //   axios(config)
            //     .then(function (response) {
                    const resArray = [];
                    // console.log(response.data.results)
                    const response = products;

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
                            "numOfReviews": 5000,
                            "reviews": [],
                        }
                        resArray.push(productRES)
                    })

                //    console.log(resArray,"finalArray")
                    function shuffle(array) {
                        array.sort(() => Math.random() - 0.5);
                        return array
                    }
                
                    
                    const data = {
                        "success": true,
                        "products": shuffle(resArray),
                        "productsCount": 3,
                        "resultPerPage": 12,
                        "filteredProductsCount": 3
                    }
                    dispatch({
                        type: ALL_PRODUCTS_SUCCESS,
                        payload: data,
                    });
                }
                // .catch(function (error) {
                //     console.log(error);
                //     dispatch({
                //         type: ALL_PRODUCTS_FAIL,
                //         payload: error.response.data.message,
                //     });
                // });
            //   console.log(data);
            // const { data } = await axios.get("https://parseapi.back4app.com/classes/MyCustomClassName");
            // const data = getAllProducts();
            
       

// Get All Products Of Same Category
export const getSimilarProducts = (category) => async (dispatch) => {

        dispatch({ type: ALL_PRODUCTS_REQUEST });
    
        // const { data } = await axios.get(`http://localhost:4000/api/v1/products?category=${category}`);
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
                const resArray = [];
                // console.log(response.data.results)
                const response = products;
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

                    resArray.push(productRES)

                })

            //    console.log(resArray,"finalArray")
                const data = {

                    "success": true,
                    "products": resArray,
                    "productsCount": 3,
                    "resultPerPage": 12,
                    "filteredProductsCount": 3
                }


                dispatch({
                    type: ALL_PRODUCTS_SUCCESS,
                    payload: data,
                });
            }
            // .catch(function (error) {
            //     // console.log(error);
            //     dispatch({
            //         type: ALL_PRODUCTS_FAIL,
            //         payload: error.response.data.message,
            //     });
            // });
        


// Get Product Details
export const getProductDetails = (id) => async (dispatch) => {
   
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
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
                    
                })
                
                const data = {

                    "success": true,
                    "product": resArray[0],
                }


        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        });
    // }).catch((error)=> {
    //     dispatch({
    //         type: PRODUCT_DETAILS_FAIL,
    //         payload: error.response.data.message,
    //     });
    // })
};

// New/Update Review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.put("http://localhost:4000/api/v1/review", reviewData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Get All Products ---PRODUCT SLIDER
export const getSliderProducts = () => async (dispatch) => {
    try {
        dispatch({ type: SLIDER_PRODUCTS_REQUEST });

        const { data } = await axios.get('http://localhost:4000/api/v1/products/all');

        dispatch({
            type: SLIDER_PRODUCTS_SUCCESS,
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: SLIDER_PRODUCTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get All Products ---ADMIN
export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST });

        const { data } = await axios.get('http://localhost:4000/api/v1/admin/products');

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// New Product ---ADMIN
export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });

        // const config = { header: { "Content-Type": "application/json" } }
       
        var object = {};
        productData.forEach((value,key) => object[key]=value);
        var json = JSON.stringify(object)
        // console.log(json)

        const data = addProduct(json);
        // const { data } = await axios.post("http://localhost:4000/api/v1/admin/product/new", productData, config);

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Update Product ---ADMIN
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });
        const config = { header: { "Content-Type": "application/json" } }
        const { data } = await axios.put(`http://localhost:4000/api/v1/admin/product/${id}`, productData, config);

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Delete Product ---ADMIN
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });
        const { data } = await axios.delete(`http://localhost:4000/api/v1/admin/product/${id}`);

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Get Product Reviews ---ADMIN
export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEWS_REQUEST });
        const { data } = await axios.get(`http://localhost:4000/api/v1/admin/reviews?id=${id}`);

        dispatch({
            type: ALL_REVIEWS_SUCCESS,
            payload: data.reviews,
        });
    } catch (error) {
        dispatch({
            type: ALL_REVIEWS_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Delete Product Review ---ADMIN
export const deleteReview = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST });
        const { data } = await axios.delete(`http://localhost:4000/api/v1/admin/reviews?id=${reviewId}&productId=${productId}`);

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Clear All Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}