import { products } from "./constants";
// import {USEREMAIL,PASSWORD} from '../.env';


export const getDiscount = (price, cuttedPrice) => {
    return (((cuttedPrice - price) / cuttedPrice) * 100).toFixed();
}

export const getDeliveryDate = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(new Date().getDate() + 7)
    return deliveryDate.toUTCString().substring(0, 11);
}

export const formatDate = (dt) => {
    return new Date(dt).toUTCString().substring(0,16);
}

export const getRandomProducts = (prodsArray, n) => {
    return prodsArray.sort(() => 0.5 - Math.random()).slice(0, n)
}

export const userLogin = (userData) => {
    const response = {
            "success": true,
            "user": {
            "avatar": {
                "public_id": "avatars/vqujiyqxe9w9v81ae4to",
                "url": "https://res.cloudinary.com/dsthtg2ks/image/upload/v1664392790/avatars/vqujiyqxe9w9v81ae4to.jpg"
            },
            "_id": "63349ed104c8ffa64d233174",
            "name": "ayushAdmin",
            "email": "ayushAdmin@gmail.com",
            "gender": "male",
            "password": "$2a$10$w6Cyc1QoLoDvrfqfchL3mO5tff.n.M.Fe1slgWdkt9FM5yWtzo5IO",
            "role": "admin",
            "createdAt": "2022-09-28T19:19:50.407Z",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMzQ5ZWQxMDRjOGZmYTY0ZDIzMzE3NCIsImlhdCI6MTY2NTAzNDk5MiwiZXhwIjoxNjY1NjM5NzkyfQ.C75I6XFgBwfnzBLeSeW-7Ewe-b4RsU607Vl6DfOSHi4"
    }

    return response
}

export const addProduct = (newProduct) =>{
    
    products.push(newProduct)
    const response ={
            "success": true,
            "product": {
                "name": "sdsjkhkj",
                "description": "jkhdjkshkshk",
                "highlights": [
                    "fdfhdjk"
                ],
                "specifications": [
                    {
                        "title": "jsdhfsd",
                        "description": "hjdshfskj",
                        "_id": "633eaf010de020980dafbe9c"
                    },
                    {
                        "title": "sdhgsd",
                        "description": "gsdhsgf",
                        "_id": "633eaf010de020980dafbe9d"
                    }
                ],
                "price": 10,
                "cuttedPrice": 10,
                "images": [
                    {
                        "public_id": "products/yjomfhc5kbgweicr1y0d",
                        "url": "https://res.cloudinary.com/dsthtg2ks/image/upload/v1665052410/products/yjomfhc5kbgweicr1y0d.webp",
                        "_id": "633eaf010de020980dafbe9e"
                    }
                ],
                "brand": {
                    "name": "hdsf",
                    "logo": {
                        "public_id": "brands/nvvtg1jvmegv5eiseuzb",
                        "url": "https://res.cloudinary.com/dsthtg2ks/image/upload/v1665052412/brands/nvvtg1jvmegv5eiseuzb.png"
                    }
                },
                "category": "Electronics",
                "stock": 10,
                "warranty": 10,
                "ratings": 0,
                "numOfReviews": 0,
                "user": "63349ed104c8ffa64d233174",
                "_id": "633eaf010de020980dafbe9b",
                "reviews": [],
                "createdAt": "2022-10-06T10:33:37.294Z",
                "__v": 0
            }
        }
    return response
}

export const getAllProducts = () => {
    let productLength = products.length;

    const response = {
        "success": true,
        "products": products,
        "productsCount": productLength,
        "resultPerPage": 12,
        "filteredProductsCount": 1
    }

    return response;
}

export const getProductData= (productId) => {
    const data = {
        "success": true,
        "product": {
            "brand": {
                "logo": {
                    "public_id": "brands/q1deuyohzbf49xyhnuyi",
                    "url": "https://res.cloudinary.com/dsthtg2ks/image/upload/v1664474354/brands/q1deuyohzbf49xyhnuyi.png"
                },
                "name": "Poco"
            },
            "_id": "6335dcf212b8174eb83bf6ec",
            "name": "POCO M4 Pro (Cool Blue, 128 GB)  (6 GB RAM)#JustHere",
            "description": "This phone has a triple camera configuration, that includes a 64 MP primary camera and an 8 MP Ultra-wide camera with a 118-degree field of vision, making it an ideal companion for photography enthusiasts, especially content developers. It also boasts a 16 MP front camera to suffice your selfie obsession.",
            "highlights": [
                "6 GB RAM | 128 GB ROM | Expandable Upto 1 TB",
                "16.33 cm (6.43 inch) Full HD+ AMOLED Display",
                "64MP + 8MP + 2MP | 16MP Front Camera",
                "5000 mAh Lithium-ion Polymer Battery",
                "Mediatek Helio G96 Processor"
            ],
            "specifications": [
                {
                    "title": " In The Box",
                    "description": " In The Box Handset, 33W Power Adapter, USB Type A-C Cable, Sim Ejector Tool, Transparent Case, Pre-Applied Screen Protector, User Guide, Warranty Card",
                    "_id": "6335dcf212b8174eb83bf6ed"
                },
                {
                    "title": "Model Number",
                    "description": "MZB0B5VIN",
                    "_id": "6335dcf212b8174eb83bf6ee"
                },
                {
                    "title": "Browse Type",
                    "description": "Smartphones",
                    "_id": "6335dcf212b8174eb83bf6ef"
                },
                {
                    "title": "Color",
                    "description": "Cool Blue",
                    "_id": "6335dcf212b8174eb83bf6f0"
                }
            ],
            "price": 999,
            "cuttedPrice": 19999,
            "images": [
                {
                    "public_id": "products/fqpgakfkhroemehgtkmt",
                    "url": "https://res.cloudinary.com/dsthtg2ks/image/upload/v1664474345/products/fqpgakfkhroemehgtkmt.webp",
                    "_id": "6335dcf212b8174eb83bf6f1"
                },
                {
                    "public_id": "products/ioi0ygrronyf5d2s8r5h",
                    "url": "https://res.cloudinary.com/dsthtg2ks/image/upload/v1664474347/products/ioi0ygrronyf5d2s8r5h.webp",
                    "_id": "6335dcf212b8174eb83bf6f2"
                },
                {
                    "public_id": "products/rcnmjclbd9rbmimx465b",
                    "url": "https://res.cloudinary.com/dsthtg2ks/image/upload/v1664474348/products/rcnmjclbd9rbmimx465b.webp",
                    "_id": "6335dcf212b8174eb83bf6f3"
                },
                {
                    "public_id": "products/dxmhxywmtl0iv1mkq69u",
                    "url": "https://res.cloudinary.com/dsthtg2ks/image/upload/v1664474349/products/dxmhxywmtl0iv1mkq69u.webp",
                    "_id": "6335dcf212b8174eb83bf6f4"
                },
                {
                    "public_id": "products/sznrupef4nkxozo7zpqc",
                    "url": "https://res.cloudinary.com/dsthtg2ks/image/upload/v1664474351/products/sznrupef4nkxozo7zpqc.webp",
                    "_id": "6335dcf212b8174eb83bf6f5"
                },
                {
                    "public_id": "products/ny7hhnvmgmkbd7xepy5w",
                    "url": "https://res.cloudinary.com/dsthtg2ks/image/upload/v1664474352/products/ny7hhnvmgmkbd7xepy5w.webp",
                    "_id": "6335dcf212b8174eb83bf6f6"
                }
            ],
            "category": "Mobiles",
            "stock": 18,
            "warranty": 1,
            "ratings": 0,
            "numOfReviews": 0,
            "user": "63349ed104c8ffa64d233174",
            "reviews": [],
            "createdAt": "2022-09-29T17:59:14.978Z",
            "__v": 0
        }
    }

    return data
}