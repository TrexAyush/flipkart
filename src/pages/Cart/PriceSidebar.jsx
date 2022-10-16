import {Divider} from '@mui/material'

const PriceSidebar = ({ cartItems }) => {
    return (
        <div className="flex sticky top-16 sm:h-screen flex-col sm:w-4/12 sm:px-1">

            {/* <!-- nav tiles --> */}
            <div className="flex flex-col bg-white ">
                <h1 className="p-4 border-b font-serif ">Price Details</h1>

                <div className="flex flex-col space-y-1 p-4 pb-3 font-serif text-sm">
                    <p className="flex justify-between">Price ({cartItems.length} item) <span>₹{cartItems.reduce((sum, item) => sum + (item.cuttedPrice * item.quantity), 0).toLocaleString()}</span></p>
                    <p className="flex justify-between">Discount <span className="text-green-500">- ₹{cartItems.reduce((sum, item) => sum + ((item.cuttedPrice * item.quantity) - (item.price * item.quantity)), 0).toLocaleString()}</span></p>
                    <p className="flex justify-between">Delivery Charges <span className="text-green-500">Free Delivery</span></p>
                    <p className="flex justify-between">Secured Packing Fee <span className="text-green-500">Free</span></p>

                    <Divider/>
                    <p className="flex justify-between font-medium">Total Amount <span>₹{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</span></p>
                    <Divider/>

                    <p className="font-medium text-green-500">You will save ₹{cartItems.reduce((sum, item) => sum + ((item.cuttedPrice * item.quantity) - (item.price * item.quantity)), 0).toLocaleString()} on this order</p>

                </div>

            </div>
            {/* <!-- nav tiles --> */}

        </div>
    );
};

export default PriceSidebar;
