import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { clearErrors, getProductDetails, getSimilarProducts, newReview } from '../../actions/productAction';
import { NextBtn, PreviousBtn } from '../../components/Home/Banner/Banner';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import Loader from '../../Layouts/Loader';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import StarIcon from '@mui/icons-material/Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CachedIcon from '@mui/icons-material/Cached';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import { addItemsToCart } from '../../actions/cartAction';
import { getDeliveryDate, getDiscount } from '../../utils/functions';
import { addToWishlist, removeFromWishlist } from '../../actions/wishlistAction';
import MinCategory from '../../Layouts/MinCategory';
import MetaData from '../../Layouts/MetaData';
import Header from '../../components/Header/Header';
import Countdown from 'react-countdown';

const ProductDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();

    // reviews toggle
    const [open, setOpen] = useState(false);
    const [viewAll, setViewAll] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const { cartItems } = useSelector((state) => state.cart);
    const { wishlistItems } = useSelector((state) => state.wishlist);

    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };

    const productId = params.id;
    const itemInWishlist = wishlistItems.some((i) => i.product === productId);

    const addToWishlistHandler = () => {
        if (itemInWishlist) {
            dispatch(removeFromWishlist(productId));
            enqueueSnackbar("Remove From Wishlist", { variant: "success" });
        } else {
            dispatch(addToWishlist(productId));
            enqueueSnackbar("Added To Wishlist", { variant: "success" });
        }
    }

    const reviewSubmitHandler = () => {
        if (rating === 0 || !comment.trim()) {
            enqueueSnackbar("Empty Review", { variant: "error" });
            return;
        }
        const formData = new FormData();
        formData.set("rating", rating);
        formData.set("comment", comment);
        formData.set("productId", productId);
        dispatch(newReview(formData));
        setOpen(false);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(productId));
        enqueueSnackbar("Product Added To Cart", { variant: "success" });
    }

    const handleDialogClose = () => {
        setOpen(!open);
    }

    const itemInCart = cartItems.some((i) => i.product === productId);

    const goToCart = () => {
        navigate('/cart');
    }

    const buyNow = () => {
        addToCartHandler();
        navigate('/shipping');
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (reviewError) {
            enqueueSnackbar(reviewError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar("Review Submitted Successfully", { variant: "success" });
            dispatch({ type: NEW_REVIEW_RESET });
        }
        dispatch(getProductDetails(productId));
        // eslint-disable-next-line
    }, [dispatch, productId, error, reviewError, success, enqueueSnackbar]);

    useEffect(() => {
        dispatch(getSimilarProducts(product?.category));
    }, [dispatch, product, product.category]);

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={product.name} />
                    <Header title={product.name}/>
                    <MinCategory />
                    <main className="w-full">

                        {/* <!-- product image & description container --> */}
                        <div className="relative flex flex-col w-full bg-white sm:flex-row sm:p-2">

                            {/* <!-- image wrapper --> */}
                            <div className="w-full sm:w-2/5 sm:sticky top-16 sm:h-screen">
                                {/* <!-- imgbox --> */}
                                <div className="flex flex-col gap-3 m-3">
                                    <div className="relative w-full h-full pb-6 border">
                                        <Slider {...settings}>
                                            {product.images && product.images.map((item, i) => (
                                                <img draggable="false" className="object-contain w-full h-96" src={item.url} alt={product.name} key={i} />
                                            ))}
                                        </Slider>
                                        <div className="absolute flex items-center justify-center bg-white border rounded-full shadow-lg top-4 right-4 w-9 h-9">
                                            <span onClick={addToWishlistHandler} className={`${itemInWishlist ? "text-red-500" : "hover:text-red-500 text-gray-300"} cursor-pointer`}><FavoriteIcon sx={{ fontSize: "18px" }} /></span>
                                        </div>
                                    </div>

                                    

                                </div>
                                {/* <!-- imgbox --> */}
                            </div>
                            {/* <!-- image wrapper --> */}

                            {/* <!-- product desc wrapper --> */}
                            <div className="flex-1 px-3 py-2">

                                {/* <!-- whole product description --> */}
                                <div className="flex flex-col gap-2 mb-4">

                                    <h2 className="text-xl">{product.name}</h2>
                                    {/* <!-- rating badge --> */}
                                    <span className="flex items-center gap-2 text-sm font-medium text-gray-500">
                                        <span className="text-xs px-1.5 py-0.5 bg-green-600 rounded-sm text-white flex items-center gap-0.5">{product.ratings && product.ratings.toFixed(1)} <StarIcon sx={{ fontSize: "12px" }} /></span>
                                        <span>{product.numOfReviews} Reviews</span>
                                    </span>
                                    {/* <!-- rating badge --> */}

                                    {/* <!-- price desc --> */}
                                    <span className="text-sm font-medium text-green-600">Special Price</span>
                                    <div className="flex items-baseline gap-2 text-3xl font-medium">
                                        <span className="text-gray-800">???{product.price?.toLocaleString()}</span>
                                        <span className="text-base text-gray-500 line-through">???{product.cuttedPrice?.toLocaleString()}</span>
                                        <span className="text-base text-green-600">{getDiscount(product.price, product.cuttedPrice)}%&nbsp;off</span>
                                    </div>
                                    {product.stock <= 10 && product.stock > 0 && (
                                        <span className="text-sm font-medium text-red-500">Hurry, Only {product.stock} left!</span>
                                    )}
                                    {/* <!-- price desc --> */}
                                    <span className="text-sm font-medium text-red-500">Deal ends in <Countdown date={Date.now() + 800000}/></span>
                                    {/* <!-- banks offers --> */}
                                    <p className="font-medium text-md">Available offers</p>
                                    {/* {Array(3).fill("").map((el, i) => ( */}
                                        <p className="flex items-center gap-1 text-sm">
                                            <span className="text-green-600"><LocalOfferIcon sx={{ fontSize: "20px" }} /></span>
                                            <span className="ml-2 font-medium">Bank Offer</span>5% Cashback on Flipkart Axis Bank Card <Link className="font-medium text-blue-600" to="/">T&C</Link>
                                        </p>
                                        <p className="flex items-center gap-1 text-sm">
                                            <span className="text-green-600"><LocalOfferIcon sx={{ fontSize: "20px" }} /></span>
                                            <span className="ml-2 font-medium">Bank Offer</span>10% off on HDFC Bank Credit and Debit Card EMI on orders of ???5,000 and above <Link className="font-medium text-blue-600" to="/">T&C</Link>
                                        </p>
                                        <p className="flex items-center gap-1 text-sm">
                                            <span className="text-green-600"><LocalOfferIcon sx={{ fontSize: "20px" }} /></span>
                                            <span className="ml-2 font-medium">Bank Offer</span>Extra ???250 off on HDFC Bank Credit and Debit Card EMI on order value of ???12,499 and above <Link className="font-medium text-blue-600" to="/">T&C</Link>
                                        </p>
                                        <p className="flex items-center gap-1 text-sm">
                                            <span className="text-green-600"><LocalOfferIcon sx={{ fontSize: "20px" }} /></span>
                                            <span className="ml-2 font-medium">Special Price</span>Get extra {getDiscount(product.price, product.cuttedPrice)} off (price inclusive of cashback/coupon) <Link className="font-medium text-blue-600" to="/">T&C</Link>
                                        </p> 
                                    {/* ))} */}
                                    {/* <!-- banks offers --> */}

                                    {/* <!-- warranty & brand --> */}
                                    <div className="flex items-center gap-8 mt-2 text-sm">
                                        <img draggable="false" className="w-20 h-8 p-0.5 border object-contain" src={product.brand?.logo.url} alt={product.brand && product.brand.name} />
                                        <span>{product.warranty} Year Warranty <Link className="font-medium text-blue-600" to="/">Know More</Link></span>
                                    </div>
                                    {/* <!-- warranty & brand --> */}

                                    {/* <!-- delivery details --> */}
                                    <div className="flex items-center gap-16 mt-4 text-sm font-medium">
                                        <p className="text-gray-500">Delivery</p>
                                        <span>Delivery by {getDeliveryDate()}</span>
                                    </div>
                                    {/* <!-- delivery details --> */}

                                    {/* <!-- highlights & services details --> */}
                                    <div className="flex flex-col justify-between sm:flex-row">
                                        {/* <!-- highlights details --> */}
                                        <div className="flex items-stretch gap-16 mt-4 text-sm">
                                            <p className="font-medium text-gray-500">Highlights</p>

                                            <ul className="flex flex-col w-64 gap-2 list-disc">
                                                {product.highlights?.map((highlight, i) => (
                                                    <li key={i}>
                                                        <p>{highlight}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {/* <!-- highlights details --> */}

                                        {/* <!-- services details --> */}
                                        <div className="flex items-stretch gap-16 mt-4 mr-6 text-sm">
                                            <p className="font-medium text-gray-500">Services</p>
                                            <ul className="flex flex-col gap-2">
                                                <li>
                                                    <p className="flex items-center gap-3"><span className="text-blue-600"><VerifiedUserIcon sx={{ fontSize: "18px" }} /></span> {product.warranty} Year</p>
                                                </li>
                                                <li>
                                                    <p className="flex items-center gap-3"><span className="text-blue-600"><CachedIcon sx={{ fontSize: "18px" }} /></span> 7 Days Replacement Policy</p>
                                                </li>
                                                <li>
                                                    <p className="flex items-center gap-3"><span className="text-blue-600"><CurrencyRupeeIcon sx={{ fontSize: "18px" }} /></span> Cash on Delivery available</p>
                                                </li>
                                            </ul>
                                        </div>
                                        {/* <!-- services details --> */}
                                    </div>
                                    {/* <!-- highlights & services details --> */}

                                    {/* <!-- seller details --> */}
                                    <div className="flex items-center gap-16 mt-4 text-sm font-medium">
                                        <p className="text-gray-500">Seller</p>
                                        <Link className="ml-3 font-medium text-primary-blue" to="/">{product.brand && product.brand.name}</Link>
                                    </div>
                                    {/* <!-- seller details --> */}

                                    {/* <!-- flipkart plus banner --> */}
                                    <div className="mt-4 border sm:w-1/2">
                                        <img draggable="false" className="object-contain w-full h-full" src="https://rukminim1.flixcart.com/lockin/763/305/images/promotion_banner_v2_active.png" alt="" />
                                    </div>
                                    {/* <!-- flipkart plus banner --> */}

                                    {/* <!-- description details --> */}
                                    <div className="flex flex-col items-stretch gap-1 mt-4 text-sm sm:flex-row sm:gap-14">
                                        <p className="font-medium text-gray-500">Description</p>
                                        <span>{product.description}</span>
                                    </div>
                                    {/* <!-- description details --> */}

                                    {/* <!-- border box --> */}
                                    <div className="flex flex-col w-full mt-6 border rounded-sm">
                                        <h1 className="px-6 py-4 text-xl font-medium border-b">Product Description</h1>
                                        <div className="p-6">
                                            <p className="text-sm">{product.description}</p>
                                        </div>
                                    </div>
                                    {/* <!-- border box --> */}

                                    {/* <!-- specifications border box --> */}
                                    <div className="flex flex-col w-full pb-4 mt-4 border rounded-sm">
                                        <h1 className="px-6 py-4 text-xl font-medium border-b">Specifications</h1>
                                        <h1 className="px-6 py-3 text-lg">General</h1>

                                        {/* <!-- specs list --> */}
                                        {product.specifications?.map((spec, i) => (
                                            <div className="flex items-center px-6 py-2 text-sm" key={i}>
                                                <p className="w-3/12 text-gray-500">{spec.title}</p>
                                                <p className="flex-1">{spec.description}</p>
                                            </div>
                                        ))}
                                        {/* <!-- specs list --> */}

                                    </div>
                                    {/* <!-- specifications border box --> */}

                                    {/* <!-- reviews border box --> */}
                                    <div className="flex flex-col w-full mt-4 border rounded-sm">
                                        <div className="flex items-center justify-between px-6 py-4 border-b">
                                            <h1 className="text-xl font-medium">Ratings & Reviews</h1>
                                            <button onClick={handleDialogClose} className="px-4 py-2 text-white bg-yellow-500 rounded-sm shadow hover:shadow-lg">Rate Product</button>
                                        </div>

                                        <Dialog
                                            aria-labelledby='review-dialog'
                                            open={open}
                                            onClose={handleDialogClose}
                                        >
                                            <DialogTitle className="border-b">Submit Review</DialogTitle>
                                            <DialogContent className="flex flex-col gap-4 m-1">
                                                <Rating
                                                    onChange={(e) => setRating(e.target.value)}
                                                    value={rating}
                                                    size='large'
                                                    precision={0.5}
                                                />
                                                <TextField
                                                    label="Review"
                                                    multiline
                                                    rows={3}
                                                    sx={{ width: 400 }}
                                                    size="small"
                                                    variant="outlined"
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <button onClick={handleDialogClose} className="px-6 py-2 text-red-600 uppercase bg-white border border-red-500 rounded shadow hover:bg-red-100">Cancel</button>
                                                <button onClick={reviewSubmitHandler} className="px-6 py-2 text-white uppercase bg-green-600 rounded shadow hover:bg-green-700">Submit</button>
                                            </DialogActions>
                                        </Dialog>

                                        <div className="flex items-center border-b">
                                            <h1 className="px-6 py-3 text-3xl font-semibold">{product.ratings && product.ratings.toFixed(1)}<StarIcon /></h1>
                                            <p className="text-lg text-gray-500">({product.numOfReviews}) Reviews</p>
                                        </div>

                                        {viewAll ?
                                            product.reviews?.map((rev, i) => (
                                                <div className="flex flex-col gap-2 px-6 py-4 border-b" key={i}>
                                                    <Rating name="read-only" value={rev.rating} readOnly size="small" precision={0.5} />
                                                    <p>{rev.comment}</p>
                                                    <span className="text-sm text-gray-500">by {rev.name}</span>
                                                </div>
                                            )).reverse()
                                            :
                                            product.reviews?.slice(-3).map((rev, i) => (
                                                <div className="flex flex-col gap-2 px-6 py-4 border-b" key={i}>
                                                    <Rating name="read-only" value={rev.rating} readOnly size="small" precision={0.5} />
                                                    <p>{rev.comment}</p>
                                                    <span className="text-sm text-gray-500">by {rev.name}</span>
                                                </div>
                                            )).reverse()
                                        }
                                        {product.reviews?.length > 3 &&
                                            <button onClick={() => setViewAll(!viewAll)} className="w-1/3 py-2 m-2 text-white rounded-sm shadow hover:shadow-lg bg-primary-blue">{viewAll ? "View Less" : "View All"}</button>
                                        }
                                    </div>
                                    {/* <!-- reviews border box --> */}

                                </div>

                            </div>
                            {/* <!-- product desc wrapper --> */}

                        </div>
                        {/* <!-- product image & description container --> */}

                        {/* Sliders */}
                        <div className="flex flex-col gap-3 mt-6">
                            <ProductSlider title={"Similar Products"} tagline={"Based on the category"} />
                        </div>
                        <div className="sticky bottom-0 z-10 flex w-full font-serif text-sm">
                            {/* <!-- add to cart btn --> */}
                            {product.stock > 0 && (
                                <button onClick={itemInCart ? goToCart : addToCartHandler} className="flex items-center justify-center w-1/2 gap-2 p-2 text-black bg-white rounded-sm shadow hover:shadow-lg">
                                    <ShoppingCartIcon />
                                    {itemInCart ? "GO TO CART" : "ADD TO CART"}
                                </button>
                            )}
                            <button onClick={buyNow} disabled={product.stock < 1 ? true : false} className={product.stock < 1 ? "p-2 w-full flex items-center justify-center gap-2 text-white bg-red-600 cursor-not-allowed rounded-sm shadow hover:shadow-lg" : "p-2 w-1/2 flex items-center justify-center gap-2 text-white bg-orange-600 rounded-sm shadow hover:shadow-lg"}>
                                <FlashOnIcon />
                                {product.stock < 1 ? "OUT OF STOCK" : "BUY NOW"}
                            </button>
                            {/* <!-- add to cart btn --> */}
                        </div>
                    </main>
                </>
            )}
        </>
    );
};

export default ProductDetails;
