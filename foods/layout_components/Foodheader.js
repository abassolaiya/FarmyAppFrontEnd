import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart } from 'react-icons/fa';
import {RiOilLine} from 'react-icons/ri';
import {MdMoreHoriz} from 'react-icons/md';
import { GiWineBottle,GiRoastChicken,GiFruitBowl,GiCupcake,GiGrain,GiShop, GiWheat , GiFishCooked, GiNoodles, GiPotato } from 'react-icons/gi';
import Logo from '../../layout/header/logo/headerleftslide/olaiya1.png';
import Store from '../../store/managementstore/managementstore';
import { BiPackage } from 'react-icons/bi';


const FoodHeader = (props) => {

    const context = useContext(Store)


    return (
            <>


                <div className="foodheader" >

                    <div className="foodheader-top" >

                        <Link className="foodheader-top-logo" to="/" > 
                            <img src={Logo} alt="" className="foodheader-top-logo-img" />
                        </Link>

                        <form className="foodheader-top-form" onSubmit={ props.searchit } >

                            <input placeholder="Search anything..." value={ props.searchvalue } onChange={ props.searchvalueonchange } className="foodheader-top-form-input" />

                            <button className="foodheader-top-form-btn" >
                                <FaSearch className="foodheader-top-form-btn-ic" /> 
                            </button>

                        </form>

                        <div className="foodheader-top-right" >

                            <Link to="/profile" className="foodheader-top-right-link" >
                                <FaUser className="foodheader-top-right-link-ic" />
                            </Link>

                            <Link to="/sell" className="foodheader-top-right-link" >
                                {/* <div className="foodheader-top-right-link-top" > 0 </div> */}
                                <GiShop className="foodheader-top-right-link-ic" />
                            </Link>

                            <Link to="/retail/cart" className="foodheader-top-right-link" >
                                <div className="foodheader-top-right-link-top" > { context.FoodCart && context.User_details ? context.FoodCart.items.length + context.User_details.detail.carts[0].items.length : 0 } </div>
                                <FaShoppingCart className="foodheader-top-right-link-ic" />
                            </Link>

                        </div>

                        <div className="foodheader-top-gigi" >


                        <Link to="/sell" className="foodheader-top-right-link" >
                                {/* <div className="foodheader-top-right-link-top" > 0 </div> */}
                                <GiShop className="foodheader-top-right-link-ic" />
                            </Link>

                            <Link to="/retail/cart" className="foodheader-top-right-link" >
                                <div className="foodheader-top-right-link-top" > { context.FoodCart && context.User_details ? context.FoodCart.items.length + context.User_details.detail.carts[0].items.length : 0 } </div>
                                <FaShoppingCart className="foodheader-top-right-link-ic" />
                            </Link>

                        </div>

                    </div>

                    <div className="foodheader-btm" id="main_header_btm_list" >


                            <Link to="/retail/category/10/beverage/" className="foodheader-btm-right-link" >
                                <GiWineBottle className="foodheader-btm-right-link-ic" /> Beverages
                            </Link>

                            <Link to="/retail/category/4/fruit-vegetable/" className="foodheader-btm-right-link" >
                                <GiFruitBowl className="foodheader-btm-right-link-ic" /> Fruits & Vegetables
                            </Link>

                            <Link to="/retail/category/5/grains/" className="foodheader-btm-right-link" >
                                <GiWheat className="foodheader-btm-right-link-ic" /> Grains
                            </Link>

                            <Link to="/retail/category/9/meat-poultry/" className="foodheader-btm-right-link" >
                                <GiRoastChicken className="foodheader-btm-right-link-ic" /> Meat and Poultry
                            </Link>

                            <Link to="/retail/category/6/oil-and-seasoningy/" className="foodheader-btm-right-link" >
                                <RiOilLine className="foodheader-btm-right-link-ic" /> Oil and Seasoning
                            </Link>

                            <Link to="/retail/category/13/packages/" className="foodheader-btm-right-link" >
                                <BiPackage className="foodheader-btm-right-link-ic" /> Packages
                            </Link>

                            <Link to="/retail/category/11/pastries/" className="foodheader-btm-right-link" >
                                <GiCupcake className="foodheader-btm-right-link-ic" /> Pasteries
                            </Link>
                            
                            <Link to="/retail/category/7/pasta-and-noodles/" className="foodheader-btm-right-link" >
                                <GiNoodles className="foodheader-btm-right-link-ic" /> Pasta and Noodles
                            </Link>                            

                            <Link to="/retail/category/8/sea-food/" className="foodheader-btm-right-link" >
                                <GiFishCooked className="foodheader-btm-right-link-ic" /> Sea Foods
                            </Link>

                            <Link to="/retail/category/1/solid-food-variety/" className="foodheader-btm-right-link" >
                                <GiGrain className="foodheader-btm-right-link-ic" /> Solid Food Variety
                            </Link>

                            <Link to="/retail/category/3/tubers/" className="foodheader-btm-right-link" >
                                <GiPotato className="foodheader-btm-right-link-ic" /> Tubers
                            </Link>

                            <Link to="/retail/category/12/others/" className="foodheader-btm-right-link" style={{
                               paddingRight:'2rem'
                            }} >
                                <MdMoreHoriz className="foodheader-btm-right-link-ic" /> Others
                            </Link>                 
                   
                    </div>


                </div>


            </>
    );
}

export default FoodHeader;