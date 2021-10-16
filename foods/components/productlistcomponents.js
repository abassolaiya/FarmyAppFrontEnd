import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {AiFillStar} from 'react-icons/ai';
import { FaShoppingBasket } from 'react-icons/fa';

const doubleline = <>

    <div className="double-line" >
        <div className="double-line-top" ></div>
        <div className="double-line-btm" ></div>
    </div>

</>

export const CatLayout = (props) => {

    return (
            <>

                <div className="catlayout-div" >

                    <div className="catlayout-div-top" >
                        <div className="catlayout-div-top-title" >
                            <Link to={props.to} className="catlayout-div-top-title-category_name" > {props.category_name} </Link>
                            {doubleline}
                        </div>
                        <Link to={props.to} className="catlayout-div-top-more" > show more </Link>
                    </div>

                    <div className="catlayout-div-btm" >
                        {props.children}
                    </div>

                </div>

            </>
    );
}



export const OtherCatLayout = (props) => {

    return (
            <>

                <div className="catlayout-div" >

                    <div className="catlayout-div-top" >
                        <div className="catlayout-div-top-title" >
                            <Link to={props.to} className="catlayout-div-top-title-category_name" > {props.category_name} </Link>
                            {doubleline}
                        </div>
                        <Link to={props.to} className="catlayout-div-top-more" > show more </Link>
                    </div>

                    <div className="catlayout-div-btm" id="catlayout-div-scroll" >
                        {props.children}
                    </div>

                </div>

            </>
    );
}



export const NormalLayout = (props) => {

    return (
            <>

                <div className="catlayout-div" >

                    {/* <div className="catlayout-div-top" >
                        <div className="catlayout-div-top-title" >
                            <Link to={props.to} className="catlayout-div-top-title-category_name" > {props.category_name} </Link>
                            {doubleline}
                        </div>
                        <Link to={props.to} className="catlayout-div-top-more" > show more </Link>
                    </div> */}

                    <div className="catlayout-div-btm" >
                        {props.children}
                    </div>

                </div> 

            </>
    );
}


export const ProductList = (props) => {

    if( props.productname.length > 20 ){
        var pname = []
        for( var i = 0 ; i < 20 ; i++ ){
            pname.push(props.productname[i])
        } 
        pname.push('...')
    }else{
        pname = props.productname
    }

    return (

        <div className="retail-productlist-div" >
            <Link to={props.to} className="retail-productlist-div-img" >
                <img className="retail-productlist-div-img-img" src={props.img} alt="" />
            </Link>
            <div className="retail-productlist-div-det" >
                <Link className="retail-productlist-div-det-name" to={props.to} > {pname} </Link>
                <div className="retail-productlist-div-det-pr" >
                    <div className="retail-productlist-div-det-pr-price" >
                        ₦{new Intl.NumberFormat({ style: 'currency', currency: 'EUR' }).format(props.price) }<span style={{
                            fontSize:'1.1rem',
                            color:'gray'
                        }} > per {props.scale}</span>
                    </div>
                    <div className="retail-productlist-div-det-pr-star" >
                        <AiFillStar className="retail-productlist-div-det-pr-star-ic" /> {props.avg_rating}
                    </div>
                </div>
                <Link className="retail-productlist-div-det-cart" to={props.to} >
                    <FaShoppingBasket className="retail-productlist-div-det-cart-ic" /> Add to Cart
                </Link>
            </div>
        </div>

    );
}


export const Textwithbottom = (props) => {

    return (

        <div className="textwithbottom" >
            <div className="textwithbottom-txt" > {props.txt} </div>
            <div className="textwithbottom-btm" >
                <div className="textwithbottom-btm-left" ></div>
                <div className="textwithbottom-btm-right" ></div>
            </div>
        </div>

    );

}




export const EditProductList = (props) => {

    if( props.productname.length > 20 ){
        var pname = []
        for( var i = 0 ; i < 20 ; i++ ){
            pname.push(props.productname[i])
        } 
        pname.push('...')
    }else{
        pname = props.productname
    }

    return (

        <div className="retail-productlist-div" >
            <div className="retail-productlist-div-img" >
                <img className="retail-productlist-div-img-img" src={props.img} alt="" />
            </div>
            <div className="retail-productlist-div-det" >
                <Link className="retail-productlist-div-det-name" to={props.to} > {pname} </Link>
                <div className="retail-productlist-div-det-pr" >
                    <div className="retail-productlist-div-det-pr-price" >
                        ₦{new Intl.NumberFormat({ style: 'currency', currency: 'EUR' }).format(props.price) }
                    </div>
                    <div className="retail-productlist-div-det-pr-star" >
                        <AiFillStar className="retail-productlist-div-det-pr-star-ic" /> {props.avg_rating}
                    </div>
                </div>
                <Link className="retail-productlist-div-det-cart" to={props.to} >
                    <FaShoppingBasket className="retail-productlist-div-det-cart-ic" /> Edit Product
                </Link>
            </div>
        </div>

    );

}


export const ProductBigBox = (props) => {

    return (

        <div className="producteditbigbox" >
            {props.children}
        </div>

    );

}