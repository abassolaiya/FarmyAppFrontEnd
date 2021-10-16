import React,{useState} from 'react';
import { Route , Switch } from 'react-router-dom';
import FoodsHome from '../pages';
import Axios from 'axios';
import RetailproductPage from '../pages/retailproductpage';
import RetailCartPage from '../pages/cartpage';
import FoodCheckoutPage from '../pages/checkoutpage';
import SearchRetailProduct from '../pages/searchindex';
import MoreSearchRetailProduct from '../pages/moresearchindex';
import FoodHeader from '../layout_components/Foodheader';
import WholesaleFooterdiv from '../../layout/footer/wholesaleFooter';
import {BiArrowBack} from 'react-icons/bi';
import FoodLoginpage from '../../pages/login-page/Foodloginpage';
import CategoryHomePage from '../pages/homecategory';


const FoodIndexLayout = (props) => {


    const [ searchquery , setsearchquery ] = useState({
        value:'',
    })

    const SearchProductHandler = (e) => {

        e.preventDefault()

        if ( searchquery.value !== '' ) {
            
            props.history.push('/retail/search/query='+searchquery.value )

        }

    }






    if( Axios.defaults.headers.common['Authorization'] ){

        var Availabe_link = <Switch>
                                <Route path="/" exact component={FoodsHome} />
                                <Route path="/retail/cart" exact component={RetailCartPage}  /> 
                                <Route path="/retail/signin" exact component={FoodsHome}  />
                                <Route path="/retail/product/:slug/:id" exact component={RetailproductPage}  />
                                <Route path="/retail/checkout/:user/:id" exact component={FoodCheckoutPage}  />
                                <Route path="/retail/search/query=:query" exact component={SearchRetailProduct} /> 
                                <Route path="/retail/search/query/:query/:offset" exact component={MoreSearchRetailProduct} /> 
                                <Route path="/retail/category/:id/:category/" exact component={CategoryHomePage} /> 
                                {/* <Route path="/retail/category/:category/:offset" exact component={FoodIndexLayout} />  */}
                            </Switch>

    }else{
        Availabe_link = <Switch>
                                <Route path="/" exact component={FoodsHome} />
                                <Route path="/retail/cart" exact component={FoodLoginpage}  /> 
                                <Route path="/retail/signin" exact component={FoodLoginpage}  />
                                <Route path="/retail/product/:slug/:id" exact component={RetailproductPage}  />
                                <Route path="/retail/checkout/:user/:id" exact component={FoodLoginpage}  />
                                <Route path="/retail/search/query=:query" exact component={SearchRetailProduct} /> 
                                <Route path="/retail/search/query/:query/:offset" exact component={MoreSearchRetailProduct} /> 
                                <Route path="/retail/category/:id/:category/" exact component={CategoryHomePage} /> 
                                {/* <Route path="/retail/category/:category/:offset" exact component={FoodIndexLayout} />  */}
                            </Switch>
    }




  return (

    <>

        <FoodHeader
            searchit={SearchProductHandler}
            searchvalue={searchquery.value}
            searchvalueonchange={(event) => setsearchquery({
                ...searchquery,
                value:event.target.value
            })}
        />

            {Availabe_link}

            <div className="main_body-back" onClick={ () => props.history.goBack() } >
                <BiArrowBack className="main_body-back-ic" />
            </div>

            <WholesaleFooterdiv/>

    </>

  );


 }


export default FoodIndexLayout;
