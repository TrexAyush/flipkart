import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Payments from '../pages/Payments/Payments';
import Home from '../pages/Home/Home';
import Address from '../pages/Address/Address';
import Order from '../pages/OrderSummary/Order';
import Products from '../pages/Products/Products';
import ProductDetails from '../pages/ProductDetails/ProductDetails'
import Shipping from '../pages/Cart/Shipping'
import OrderConfirm from '../pages/Cart/OrderConfirm';
import CardPayment from '../pages/Card/CardPayment'
import Cart from '../pages/Cart/Cart'

const Routing = () => {
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
       {/* <Route exact path="/order/confirm" element={<OrderConfirm />}/> */}
      <Route exact path="/card-payments" element={<CardPayment/>}/>
    </Routes>
  )
}

export default Routing