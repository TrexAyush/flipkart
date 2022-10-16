import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { getDiscount } from '../../utils/functions';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../actions/wishlistAction';
import { useSnackbar } from 'notistack';
const Product = ({ _id, name, images, ratings, numOfReviews, price, cuttedPrice,highlights}) => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const { wishlistItems } = useSelector((state) => state.wishlist);

    const itemInWishlist = wishlistItems.some((i) => i.product === _id);

    const addToWishlistHandler = () => {
        if (itemInWishlist) {
            dispatch(removeFromWishlist(_id));
            enqueueSnackbar("Remove From Wishlist", { variant: "success" });
        } else {
            dispatch(addToWishlist(_id));
            enqueueSnackbar("Added To Wishlist", { variant: "success" });
        }
    }

    return (
        <div className="relative flex flex-col items-start gap-2 px-4 py-6 border rounded-sm hover:shadow-lg">
            {/* <!-- image & product title --> */}
            <Link to={`/product/${_id}`} className="flex flex-col items-center w-full text-center group">
                <div className="h-48 w-44">
                    <img draggable="false" className="object-contain w-full h-full" src={images && images[0].url} alt="" />
                </div>
                <h2 className="flex justify-start w-full mt-4 text-sm text-left group-hover:text-blue-600">{name.length > 85 ? `${name.substring(0, 85)}...` : name}</h2>
            </Link>
            {/* <!-- image & product title --> */}
            <div className='flex flex-row w-full'>
                <div className="flex flex-col items-start w-full gap-2">
                    {/* <!-- rating badge --> */}
                    <span className="flex flex-row items-center gap-2 text-sm font-medium text-gray-500">
                        <span className="text-xs justify-start px-1.5 py-0.5 bg-green-600 rounded-sm text-white flex items-center gap-0.5">{ratings.toFixed(1)} <StarIcon sx={{ fontSize: "14px" }} /></span>
                        <span className='flex'>({numOfReviews})</span>
                        <span className="flex justify-end float-right" ><img className='w-[70px]' src='assets/flipassured.png' alt='Flipkart Assured'/></span>
                    </span>
                    {/* <!-- rating badge --> */}
                    
                    {/* <!-- price container --> */}
                    <div className="flex items-center gap-1.5 text-md font-medium">
                        <span className='text-[20px]'>₹{price.toLocaleString()}</span>
                        <span className="text-xs text-gray-500 line-through">₹{cuttedPrice.toLocaleString()}</span>
                        <span className="text-xs text-green-600">{getDiscount(price, cuttedPrice)}%&nbsp;off</span>
                    </div>
                    
                    {/* <!-- price container --> */}
                    
                </div>
                <div className='flex items-center justify-end w-full p-2'>
                <Link to={`/product/${_id}`} className="px-4 py-2 text-xs font-medium text-white uppercase bg-blue-600 rounded-sm shadow-lg">Buy Now</Link>
                </div>
            </div>
            {/* <!-- product description --> */}
            
            {/* <!-- product description --> */}
            
            {/* <!-- wishlist badge --> */}
            <span onClick={addToWishlistHandler} className={`${itemInWishlist ? "text-red-500" : "hover:text-red-500 text-gray-300"} absolute top-6 right-6 cursor-pointer`}><FavoriteIcon sx={{ fontSize: "18px" }} /></span>
            {/* <!-- wishlist badge --> */}
            
        </div>
    );
};

export default Product;
