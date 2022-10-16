import { products } from "./constants";

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