import React,{useContext} from 'react';
import {Link} from 'react-router-dom'; 
import { BsFillCaretLeftFill, BsFillHouseFill } from 'react-icons/bs';
import LogoImage from '../../../layout/header/logo/headerleftslide/olaiya1.png';
import {ImUsers} from 'react-icons/im';
import Store from '../../../store/managementstore/managementstore';
import { FaShoppingCart, FaTruck } from 'react-icons/fa';
import { GiShop } from 'react-icons/gi';

const ProfileHeader = (props) => { 

    const context = useContext(Store) 

      return ( 
          <div className="profile_header" >
               
               <Link to="#" onClick={props.goback} className="profile_header_logo" >
                    <img src={LogoImage} alt="" className="main_header_top_logo-img" />

                     <BsFillCaretLeftFill className="profile_header_logo_back"  />
               </Link>

               <div className="profile_header_mid" >
                    {props.title}
               </div>

               <div className="profile_header_right" >

                    <Link to={'/'} className="profile_header_right_link" >
                        <BsFillHouseFill className="profile_header_right_link_ic" />
                        <div className="profile_header_right_link_txt" > Home </div>
                    </Link>

                    <div style={{ border:'1px solid gray',margin:'1rem .5rem' }} ></div>

                    <Link to={'/retail/cart'} className="profile_header_right_link" >
                    { context.FoodCart && context.User_details ? 
                            
                            context.FoodCart && context.User_details ?
                                <div className="main_header_top_right_link_dot" > { context.FoodCart && context.User_details ? context.FoodCart.items.length + context.User_details.detail.carts[0].items.length : 0 } </div>
                            : null

                            : null }
                        <FaShoppingCart className="profile_header_right_link_ic" />
                        <div className="profile_header_right_link_txt" > Cart </div>
                    </Link>

                    <div style={{ border:'1px solid gray',margin:'1rem .5rem' }} ></div>
                    
                    <Link to={'/profile/myorders'} className="profile_header_right_link" >
                        <FaTruck className="profile_header_right_link_ic" />
                        <div className="profile_header_right_link_txt" > My Orders </div>
                    </Link>  

                    <div style={{ border:'1px solid gray',margin:'1rem .5rem' }} ></div>

                    <Link to='/my_referrals' className="profile_header_right_link" >
                        <ImUsers className="profile_header_right_link_ic" />
                        <div className="profile_header_right_link_txt" > Referals </div>
                    </Link>

                    <div style={{ border:'1px solid gray',margin:'1rem .5rem' }} ></div>

                    <Link to='/sell' className="profile_header_right_link" >
                        <GiShop className="profile_header_right_link_ic" />
                        <div className="profile_header_right_link_txt" > Sell </div>
                    </Link>

               </div>

               <div className="profile_header_cart" >
                        <Link to="/retail/cart" className="profile_header_cart_link" >
                        { context.FoodCart && context.User_details ? 
                            
                            context.FoodCart && context.User_details ?
                                <div className="main_header_top_right_link_dot profile_header_top_right_link_dot" > { context.FoodCart && context.User_details ? context.FoodCart.items.length + context.User_details.detail.carts[0].items.length : 0 } </div>
                            : null

                            : null }
                            <FaShoppingCart className="profile_header_cart_link_ic" />
                        </Link>
               </div>

          </div>
      );

}

export default ProfileHeader;