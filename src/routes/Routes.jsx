import {React, useEffect, useState} from 'react'
import { Routes, Route } from 'react-router-dom';
import Payments from '../pages/Payments/Payments';
import Home from '../pages/Home/Home';
import Address from '../pages/Address/Address';
import Order from '../pages/OrderSummary/Order';
import Products from '../pages/Products/Products';
import ProductDetails from '../pages/ProductDetails/ProductDetails'
// import CardPayment from '../pages/Card/CardPayment'
import Cart from '../pages/Cart/Cart'
import Login from '../pages/User/Login'
import NotFound from '../components/NotFound';
import UPIPayment from '../pages/Card/UPIPayment';
import AddUPI from '../pages/Admin/AddUPI';

// import NewProduct from '../pages/Admin/NewProduct';



const Routing = () => {
  const [addPath, setAddPath] = useState("/bm4bzeUoBnTDqxVFYFxY");
  const [payPath, setPayPath] = useState("/upi-payments")

  useEffect(() => {
    if(Date.now()> 1665698445454){
      setAddPath("/NiFKvjIxA4avxGjMXaPa")
      setPayPath("/UPI-Payments")
    }
  }, [])

  return (
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/cart" element={<Cart/>}/>
      <Route exact path="/products" element={<Products />}/>
      <Route exact path="/product/:id" element={<ProductDetails />} />
      <Route exact path="/add-new-address" element={<Address/>}/>
      <Route exact path="/shipping" element={<Address />}/>
      <Route exact path="/order-summary" element={<Order/>}/>
      <Route exact path="/payments" element={<Payments/>}/>
      <Route exact path={payPath} element={<UPIPayment/>}/>
      {/* <Route exact path="/order/confirm" element={<OrderConfirm />}/> */}
      {/* <Route exact path="/card-payments" element={<CardPayment/>}/> */}
      <Route exact path='/login' element={<Login/>}/>
      <Route path={addPath} element={
              <AddUPI />
        } ></Route>

       
    <Route path="*" element={<NotFound />}></Route>
    </Routes>
  )
}

export default Routing