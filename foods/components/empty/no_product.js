import React from 'react';
import EmptyImg from '../../../component/utilities/delivery-man.png';
import SearchImg from '../../../component/utilities/Search.png';
import EmptyCart from '../../../component/utilities/cart.png';
import {Link} from 'react-router-dom'; 

export const EmptyProduct = (props) => {

      return ( 
                <div className="oppsPage" >
                    
                    <img className="oppsPage-img" src={EmptyImg} alt="" />

                    <div className="oppsPage-txt" > No Product Available At The Moment </div>

                    <div className="oppsPage-str" >
                        We dont have poducts available for sale now  <br/> check back later 
                    </div>

                    {/* <button className="oppsPage-btn" onClick={props.tryagain} > Try Again </button> */}

                </div>
      );

}



export const EmptyProductSearch = (props) => {

    return ( 
              <div className="oppsPage" >
                  
                  <img className="oppsPage-img" src={SearchImg} alt="" />

                  <div className="oppsPage-txt" > Found No Result Related to "{props.query}" </div>

                  {/* <button className="oppsPage-btn" onClick={props.tryagain} > Try Again </button> */}

              </div>
    );

}


export const EmptyCartDiv = (props) => {

    return ( 
              <div className="empty-cart-div" >
                  
                  <img className="empty-cart-div-img" src={EmptyCart} alt="" />

                  <div className="empty-cart-div-txt" > Your Cart Is Currently Empty </div>

                  <Link to="/" className="empty-cart-div-btn" > Start Shopping </Link>

              </div>
    );

}



export const EmptyOrder = (props) => {

    return ( 
              <div className="oppsPage" >
                  
                  <img className="oppsPage-img" src={EmptyImg} alt="" />

                  <div className="oppsPage-txt" > No Order At The Moment </div>

                  <div className="oppsPage-str" >
                      We dont have any order available for now  <br/> 
                  </div>

                  <Link to={ props.to ? props.to : "/retail/cart" } className="empty-cart-div-btn" > Place An Order </Link>

              </div>
    );

}