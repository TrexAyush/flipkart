import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { addItemsToCart } from '../../actions/cartAction';
import { removeFromSaveForLater } from '../../actions/saveForLaterAction';
import { getDiscount } from '../../utils/functions';

const SaveForLaterItem = ({ product, name, seller, price, cuttedPrice, image, stock, quantity }) => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const removeFromSaveForLaterHandler = (id) => {
        dispatch(removeFromSaveForLater(id));
        enqueueSnackbar("Removed From Save For Later", { variant: "success" });
    }

    const moveToCartHandler = (id, quantity) => {
        dispatch(addItemsToCart(id, quantity));
        removeFromSaveForLaterHandler(id);
        enqueueSnackbar("Product Added To Cart", { variant: "success" });
    }

    return (
        <div className="flex flex-col gap-3 py-5 pl-2 border-b sm:pl-6" key={product}>

            <div className="flex flex-col items-stretch w-full gap-5 sm:flex-row" href="#">
                {/* <!-- product image --> */}
                <div className="flex-shrink-0 w-full sm:w-1/6 h-28">
                    <img draggable="false" className="object-contain w-full h-full" src={image} alt={name} />
                </div>
                {/* <!-- product image --> */}

                {/* <!-- description --> */}
                <div className="flex flex-col w-full gap-1 p-1 pr-6 sm:gap-5">
                    {/* <!-- product title --> */}
                    <div className="flex items-start justify-between pr-5">
                        <div className="flex flex-col gap-0.5 w-11/12 sm:w-full">
                            <p>{name.length > 50 ? `${name.substring(0, 50)}...` : name}</p>
                            <span className="text-sm text-gray-500">Seller: {seller}</span>
                        </div>
                    </div>
                    {/* <!-- product title --> */}

                    {/* <!-- price desc --> */}
                    <div className="flex items-baseline gap-2 text-xl font-medium">
                        <span>₹{(price * quantity).toLocaleString()}</span>
                        <span className="text-sm font-normal text-gray-500 line-through">₹{(cuttedPrice * quantity).toLocaleString()}</span>
                        <span className="text-sm text-green-500">{getDiscount(price, cuttedPrice)}%&nbsp;off</span>
                    </div>
                    {/* <!-- price desc --> */}

                </div>
                {/* <!-- description --> */}
            </div>

            {/* <!-- move to cart --> */}
            <div className="flex justify-evenly sm:justify-start sm:gap-6">
                {/* <!-- quantity --> */}
                <div className="flex items-center gap-1">
                    <span className="flex items-center justify-center text-3xl font-light border rounded-full cursor-not-allowed w-7 h-7 bg-gray-50"><p>-</p></span>
                    <input className="w-11 border outline-none text-center rounded-sm py-0.5 text-gray-700 font-medium text-sm" value={quantity} disabled />
                    <span className="flex items-center justify-center text-xl font-light border rounded-full cursor-not-allowed w-7 h-7 bg-gray-50">+</span>
                </div>
                {/* <!-- quantity --> */}
                <button onClick={() => moveToCartHandler(product, quantity)} className="font-medium sm:ml-4 hover:text-primary-blue">MOVE TO CART</button>
                <button onClick={() => removeFromSaveForLaterHandler(product)} className="font-medium hover:text-red-600">REMOVE</button>
            </div>
            {/* <!-- move to cart --> */}

        </div>
    );
};

export default SaveForLaterItem;
