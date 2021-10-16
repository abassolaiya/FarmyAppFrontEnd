import React,{useState} from 'react';
import { Route , Switch } from 'react-router-dom';
import Axios from 'axios';
import Ourproductindex from '../pages/ourproducts/ourproductindex';
import EditFoodProduct from '../pages/editfoodproduct';
import MoreOurproductindex from '../pages/ourproducts/moreourproductindex';
import WholesaleFooterdiv from '../../layout/footer/wholesaleFooter';
import OurMoreSearchRetailProduct from '../pages/ourproducts/ourmoresearchindex';
import OurSearchRetailProduct from '../pages/ourproducts/oursearchindex';
import EditFoodHeader from '../layout_components/EditproductHeader';
import SellFoodProduct from '../pages/sellfoodproduct';
import FoodLoginpage from '../../pages/login-page/Foodloginpage';
import OurCategoryHomePage from '../pages/ourproducts/ourhomecategory';
import OurAllSeingOrderPage from '../pages/ourproducts/OurAllSeingOrderPage';
import OurChangeOrderPage from '../pages/ourproducts/OurChangeOrderPage';

const OurFoodProducts = (props) => {

    const [ searchquery , setsearchquery ] = useState({
        value:'',
    })

    const SearchProductHandler = (e) => {

        e.preventDefault()

        if ( searchquery.value !== '' ) {
            
            props.history.push('/retail/oursearch/query='+searchquery.value )

        }

    }





    if( Axios.defaults.headers.common['Authorization'] ){

        var Availabe_link = <Switch>
                                <Route path="/retail/productedit" exact component={Ourproductindex}  />
                                <Route path="/retail/selling_is_product" exact component={SellFoodProduct}  />
                                <Route path="/retail/productedit/product/:slug/:id" exact component={EditFoodProduct}  />
                                <Route path="/retail/productedit/:offset" exact component={MoreOurproductindex}  />
                                <Route path="/retail/oursearch/query=:query" exact component={OurSearchRetailProduct} />
                                <Route path="/retail/oursearch/query/:query/:offset" exact component={OurMoreSearchRetailProduct} />
                                <Route path="/retail/selling" exact component={SellFoodProduct}  />
                                <Route path="/retail/ourcategory/:id/:category/" exact component={OurCategoryHomePage} /> 
                                <Route path="/retail/products/allorders/" exact component={OurAllSeingOrderPage} /> 
                                <Route path="/retail/products/allorders/:id/" exact component={OurChangeOrderPage} /> 
                                {/* <Route path="/retail/ourcategory/:id/:category/:offset" exact component={} />  */}
                            </Switch>

    }else{
        Availabe_link = <Switch>
                            <Route path="/retail/productedit" exact component={FoodLoginpage}  />
                            <Route path="/retail/selling_is_product" exact component={FoodLoginpage}  />
                            <Route path="/retail/productedit/product/:slug/:id" exact component={FoodLoginpage}  />
                            <Route path="/retail/productedit/:offset" exact component={FoodLoginpage}  />
                            <Route path="/retail/oursearch/query=:query" exact component={FoodLoginpage} />
                            <Route path="/retail/oursearch/query/:query/:offset" exact component={FoodLoginpage} />
                            <Route path="/retail/selling" exact component={FoodLoginpage}  />
                            <Route path="/retail/ourcategory/:id/:category/" exact component={FoodLoginpage} /> 
                            <Route path="/retail/products/allorders/" exact component={FoodLoginpage} /> 
                            <Route path="/retail/products/allorders/:id/" exact component={FoodLoginpage} /> 
                            {/* <Route path="/retail/ourcategory/:id/:category/:offset" exact component={FoodLoginpage} />  */}
                        </Switch>
    }







  return (

    <>


        <EditFoodHeader
            searchit={SearchProductHandler}
            searchvalue={searchquery.value}
            searchvalueonchange={(event) => setsearchquery({
                ...searchquery,
                value:event.target.value
            })}
        />

        {Availabe_link}

        <WholesaleFooterdiv/>

    </>

  );


 }


export default OurFoodProducts;
