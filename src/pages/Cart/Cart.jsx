import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../../Layouts/MetaData';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import PriceSidebar from './PriceSidebar';
import SaveForLaterItem from './SaveForLaterItem';
import Header from '../../components/Header/Header';

const Cart = () => {

    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { saveForLaterItems } = useSelector((state) => state.saveForLater);

    const placeOrderHandler = () => {
        navigate('/shipping');
    }

    return (
        <>
            <MetaData title="Shopping Cart | Flipkart" />
            <Header title="Shopping Cart | Flipkart" />
            <main className="w-full">

                {/* <!-- row --> */}
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 m-auto sm:mb-7">

                    {/* <!-- cart column --> */}
                    <div className="flex-1">

                        {/* <!-- cart items container --> */}
                        <div className="flex flex-col bg-white shadow-lg">
                            <span className="px-2 py-4 text-lg font-medium border-b sm:px-8">My Cart ({cartItems.length})</span>

                            {cartItems && cartItems.length === 0 && (
                                <EmptyCart />
                            )}

                            {cartItems && cartItems.map((item) => (
                                <CartItem {...item} inCart={true} />
                            )
                            )}

                            {/* <!-- place order btn --> */}
                            <div className="flex justify-end">
                                <button onClick={placeOrderHandler} disabled={cartItems.length < 1 ? true : false} className={`${cartItems.length < 1 ? "bg-gray-500 cursor-not-allowed" : "bg-orange-500 "} w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-3 font-medium text-white shadow hover:shadow-lg rounded-sm`}>PLACE ORDER</button>
                            </div>
                            {/* <!-- place order btn --> */}

                        </div>
                        {/* <!-- cart items container --> */}

                        {/* <!-- saved for later items container --> */}
                        <div className="flex flex-col mt-5 bg-white shadow">
                            <span className="px-2 py-4 text-lg font-medium border-b sm:px-8">Saved For Later ({saveForLaterItems.length})</span>
                            {saveForLaterItems && saveForLaterItems.map((item) => (
                                <SaveForLaterItem {...item} />
                            )
                            )}
                        </div>
                        {/* <!-- saved for later container --> */}

                    </div>
                    {/* <!-- cart column --> */}

                    <PriceSidebar cartItems={cartItems} />

                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );
};

export default Cart;
