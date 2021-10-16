import React,{useState} from 'react';
import { Route , Switch } from 'react-router-dom';
import WholesaleFooterdiv from '../../layout/footer/wholesaleFooter';
import {BiArrowBack} from 'react-icons/bi';
import Axios from 'axios';
import MyFoodAllOrders from '../pages/myfoodorders';
import FoodLoginpage from '../../pages/login-page/Foodloginpage';
import ProfileHome from '../pages/profile_home/profile_home';
import Userprofiledetails from '../../component/user-profile-box/middle-div/profile-details/profile_details';
import Referal_page from '../../pages/refarals_page/referal_page';
import UserproductPage from '../../pages/userprofileproducts/user_products';
import PendingProductPage from '../../pages/pending_products_page/pending_products';
import FullpendingProduct from '../../pages/Fullpendingproduct/Fullpendingproduct';
import FullOrderDiv from '../../pages/FullMyorder/fullmyorder';
import UserservicesPage from '../../pages/userprofileservices/user_services';
import PendingServicesPage from '../../pages/pending_services_page/pending_services';
import FullpendindServPage from '../../pages/FullpendingServ/fullpendingserv';
import ServiceHiredpage from '../../pages/serviceHiredpage/serviceHiredpage';
import FoodHeader from '../layout_components/Foodheader';
import UserRetailOrder from '../pages/UserRetailOrder';


const UserProfileIndexLayout = (props) => {


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
                            <Route path="/profile/myorders" exact component={MyFoodAllOrders} /> 
                            <Route path="/profile" exact component={ProfileHome} />
                            <Route path="/profile/editprofile" exact component={Userprofiledetails} /> 
                            <Route path="/profile/my_products" exact component={UserproductPage} />
                            <Route path="/mypendingproducts" exact component={PendingProductPage} />
                            <Route path="/allordersfull:id" exact component={FullpendingProduct} />
                            <Route path="/profile/wholesale_order/:id" exact component={FullOrderDiv} />
                            <Route path="/my_referrals" exact component={Referal_page} />
                            <Route path="/profile/my_services" exact component={UserservicesPage} />
                            <Route path="/servfull:id" exact component={FullpendindServPage} />
                            <Route path="/mypendingservices" exact component={PendingServicesPage} />
                            <Route path="/services_hired" exact component={ServiceHiredpage} />
                            <Route path="/profile/retail_order/:id" exact component={UserRetailOrder} /> 
                        </Switch>

}else{
    Availabe_link = <Switch>
                        <Route path="/profile/myorders" exact component={FoodLoginpage} /> 
                        <Route path="/profile" exact component={FoodLoginpage} />
                        <Route path="/profile/editprofile" exact component={FoodLoginpage} /> 
                        <Route path="/profile/my_products" exact component={FoodLoginpage} />
                        <Route path="/mypendingproducts" exact component={FoodLoginpage} />
                        <Route path="/allordersfull:id" exact component={FoodLoginpage} />
                        <Route path="/profile/wholesale_order/:id" exact component={FoodLoginpage} />
                        <Route path="/my_referrals" exact component={FoodLoginpage} />
                        <Route path="/profile/my_services" exact component={FoodLoginpage} />
                        <Route path="/servfull:id" exact component={FoodLoginpage} />
                        <Route path="/mypendingservices" exact component={FoodLoginpage} />
                        <Route path="/services_hired" exact component={FoodLoginpage} />
                        <Route path="/profile/retail_order/':id" exact component={FoodLoginpage} /> 
                    </Switch>
}










  return (

    <>

            { Axios.defaults.headers.common['Authorization'] ? null : 
            
                <FoodHeader
                    searchit={SearchProductHandler}
                    searchvalue={searchquery.value}
                    searchvalueonchange={(event) => setsearchquery({
                        ...searchquery,
                        value:event.target.value
                    })}
                />

            }

            {Availabe_link}

            <div className="main_body-back" onClick={ () => props.history.goBack() } >
                <BiArrowBack className="main_body-back-ic" />
            </div>

            <WholesaleFooterdiv showbtmlinks />

    </>

  );


 }


export default UserProfileIndexLayout;