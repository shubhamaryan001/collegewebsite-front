import React from 'react';
import { Route ,Switch} from "react-router-dom";
import Home from "./core/Home";
import Menu from "./core/Menu";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import SingleProduct from "./product/SingleProduct";
import Cart from "./cart/Cart"
import EditProfile from "./user/EditProfile";
import PrivateRoute from "./auth/PrivateRoute";
import NewProduct from "./product/NewProduct"
import Confirmation from './cart/Confirmation'
import EditProduct from "./product/EditProduct";
import Shopproduct from "./product/Shopproduct";
import Footer from './core/Footer';
import AboutUs from './core/AboutUs'






const MainRouter = () =>(
    
    
    <div>

        <Menu />
        <Switch>
            
            
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/users" component={Users}></Route>
            <Route exact path="/signup" component={Signup}></Route>
            <Route exact path="/signin" component={Signin}></Route>
            <Route exact path="/about" component={AboutUs}></Route>



            <Route exact path="/shop" component={Shopproduct}></Route>
            <Route path="/cart" component={Cart}/>
            <PrivateRoute exact path="/confirmation" component={Confirmation}/>
            <PrivateRoute
                exact
                path="/product/edit/:productId"
                component={EditProduct}
            />

            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile}/>
            <PrivateRoute exact path="/user/:userId" component={Profile}/>
            <Route exact path="/product/:productId" component={SingleProduct} />

            <PrivateRoute path="/products/new" component={NewProduct}/>





        </Switch>
        <Footer/>

        

    </div>
);



export default MainRouter;