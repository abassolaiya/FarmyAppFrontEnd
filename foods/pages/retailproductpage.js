import React, { useContext,useState,useEffect } from 'react';
import {Carousel} from 'react-responsive-carousel';
import {AiFillStar} from 'react-icons/ai';
import { store } from 'react-notifications-component';
import { FaFacebook, FaLinkedinIn, FaShoppingBasket, FaShoppingCart, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import LoadingPage from '../components/loading/loading';
import OppsPage from '../components/oppspage/oppspage';
import Store from '../../store/managementstore/managementstore';
import Axios from 'axios';
import BtnSpin from '../../component/utilities/btnSpin/btnSpin';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton
  } from "react-share";
import { OtherCatLayout, ProductList } from '../components/productlistcomponents';

const RetailproductPage = (props) => {

    const product_Id = props.match.params.id
    const context = useContext(Store) 

    const [ Errorpage , setErrorpage ] = useState(false)
    const [ Loading , setLoadingpage ] = useState(false)
    const [ currentproduct , setcurrentproduct ] = useState(null)
    const [ Addtocart , setAddtocart ] = useState({
        value:1,
        loading: false
    })
    const [ Otherproducts , setOtherproducts ] = useState(null)

    useEffect( () => {

        setLoadingpage(true)
        setErrorpage(false)

        Axios.get('/myproducts/myproduct/' + product_Id + '/' ).then(

            response => {

                setcurrentproduct(response.data)
                setErrorpage(false)
                setLoadingpage(false)
                GetOtherProducts(response.data.category)
            }

        ).catch(
            
            e => {

                setErrorpage(true)
                setLoadingpage(false)

            }

        )

    } , [product_Id] )





    const GetOtherProducts = (id) => {

        Axios.get('/myproducts/category/' + id + '/').then(

            response => {

                setOtherproducts(response.data.myproducts)

            }

        )

    }



    if ( Otherproducts ) {

        var newlistit = []

        if ( Otherproducts.length > 9 ) {
            for (let i = 0; i < 9; i++) {
                newlistit.push(Otherproducts[i])
            }
        }else{
            for (let i = 0; i < Otherproducts.length; i++) {
                newlistit.push(Otherproducts[i])
            }
        }

    }



    const AddtocartHandler = () => {

        setAddtocart({
            ...Addtocart,
            loading:true
        })

        if ( !context.User_id || !context.Token ) {
            props.history.push('/signup')
        }

        else{

            
        if ( Addtocart.value > 0 ) {
            
                
            Axios.post( '/mycarts/mycart/' + context.FoodCart.id + '/add_to_cart/' , { quantity:Addtocart.value , myproduct_id: currentproduct.id } ).then(
              response => {
                  store.addNotification({
                      title: "Add To Cart",
                      message: currentproduct.myproduct_name + " Was Successfully Added To Cart" ,
                      type: "success",
                      insert: "top",
                      container: "top-left",
                      animationIn: ["animate__animated", "animate__fadeIn"],
                      animationOut: ["animate__animated", "animate__fadeOut"],
                      dismiss: {
                        duration: 5000,
                        onScreen: true
                      }
                    });
                    context.FoodCartUpdateRemove()
                    setAddtocart({
                      ...Addtocart,
                      loading:false
                  })
              }
            ).catch( e => {
  
                store.addNotification({
                  title: "Updating Cart",
                  message: "Something Went Wrong When Adding " + currentproduct.myproduct_name + " To Cart" ,
                  type: "danger",
                  insert: "top",
                  container: "top-left",
                  animationIn: ["animate__animated", "animate__fadeIn"],
                  animationOut: ["animate__animated", "animate__fadeOut"],
                  dismiss: {
                    duration: 5000,
                    onScreen: true
                  }
                });
                setAddtocart({
                  ...Addtocart,
                  loading:false
              })
                
            } )
    
  
          }
  
          else{
              setAddtocart({
                  ...Addtocart,
                  loading:false
              })
          }
  

        }

    }

























    const gogo = () => {
        props.history.go()
    } 

    const goBack = () => {
        props.history.goBack()
    }

    
    if ( !currentproduct && !Errorpage && Loading ) {
        var todisplay = <LoadingPage/>
    }else{
        if ( !currentproduct && Errorpage && !Loading ) {
            todisplay = <OppsPage tryagain={gogo} goback={goBack} />
        }else{
            if ( currentproduct && !Errorpage && !Loading ) {

                var shareurl = "https://farmyapp.com/retail/product/" + currentproduct.slug + "/" + product_Id

                 todisplay = <>
                            

                            <div className="retailproductpage" >

                                <div className="retailproductpage-product" >

                                    <div className="retailproductpage-product-ibox" >
                                        <Carousel
                                            autoPlay={true}
                                            interval="5000"
                                            infiniteLoop={true}
                                            useKeyboardArrows={true}
                                            emulateTouch={true}
                                            showStatus={false}
                                            showThumbs={false}
                                            className="retailproductpage-product-ibox-top"
                                        >

                                            { currentproduct.product_img1 ? 
                                                <div className="retailproductpage-product-ibox-top-img" >
                                                    <img className="retailproductpage-product-ibox-top-img-img" src={currentproduct.product_img1} alt="" />
                                                </div>
                                            : null }

                                            { currentproduct.product_img2 ? 
                                                <div className="retailproductpage-product-ibox-top-img" >
                                                    <img className="retailproductpage-product-ibox-top-img-img" src={currentproduct.product_img2} alt="" />
                                                </div>
                                            : 
                                                <div className="retailproductpage-product-ibox-top-img" >
                                                    <img className="retailproductpage-product-ibox-top-img-img" src={currentproduct.product_img1} alt="" />
                                                </div>
                                            }

                                            { currentproduct.product_img3 ? 
                                                <div className="retailproductpage-product-ibox-top-img" >
                                                    <img className="retailproductpage-product-ibox-top-img-img" src={currentproduct.product_img3} alt="" />
                                                </div>
                                            : 
                                                <div className="retailproductpage-product-ibox-top-img" >
                                                    <img className="retailproductpage-product-ibox-top-img-img" src={currentproduct.product_img1} alt="" />
                                                </div>
                                            }

                                            
                                        </Carousel>
                                    </div>

                                    <div className="retailproductpage-product-pdet" >

                                        <div className="retailproductpage-product-pdet-name" > {currentproduct.myproduct_name} </div>
                                        

                                        <div className="retailproductpage-product-pdet-star" >
                                            <AiFillStar className="retailproductpage-product-pdet-star-ic" />
                                            <AiFillStar className="retailproductpage-product-pdet-star-ic" />
                                            <AiFillStar className="retailproductpage-product-pdet-star-ic" />
                                            <AiFillStar className="retailproductpage-product-pdet-star-ic" />
                                            <AiFillStar className="retailproductpage-product-pdet-star-ic" />
                                            {/* (2 Reviews) */}
                                        </div>

                                        <div className="retailproductpage-product-pdet-price" >
                                            ₦{new Intl.NumberFormat({ style: 'currency', currency: 'EUR' }).format(currentproduct.selling_price) } <sub style={{
                                                fontSize:'1.3rem',
                                                color:'gray'
                                            }} > per {currentproduct.scale}</sub>
                                        </div>

                                        <div className="retailproductpage-product-pdet-dec" >
                                            {currentproduct.description}
                                        </div>

                                        <div className="retailproductpage-product-pdet-cart" >

                                            <input min="1" type="number" className="retailproductpage-product-pdet-cart-input"
                                                value={ Addtocart.value }
                                                onChange={ (event) => setAddtocart({
                                                    ...Addtocart,
                                                    value:event.target.value
                                                }) }  />
                                            <button className="retailproductpage-product-pdet-cart-btn" 
                                              onClick={ () => AddtocartHandler() } disabled={Addtocart.loading} >
                                                { Addtocart.loading ? <BtnSpin bgColor="white" /> : 
                                                    <> 
                                                        <FaShoppingBasket className="retailproductpage-product-pdet-cart-btn-ic" />
                                                         Add To Cart 
                                                    </> }
                                            </button>
                                            <Link to="/retail/cart" className="retailproductpage-product-pdet-cart-link" >
                                                <FaShoppingCart className="retailproductpage-product-pdet-cart-link-ic" />
                                                <div className="retailproductpage-product-pdet-cart-link-ta" > { context.FoodCart ? context.FoodCart.items.length : '0' } </div>
                                            </Link>

                                        </div>

                                        <div className="retailproductpage-product-pdet-share" >
                                            <div className="retailproductpage-product-pdet-share-txt" > Share: </div>
                                            <div className="retailproductpage-product-pdet-share-ul" >

                                            <WhatsappShareButton className="referf" url={ shareurl } >
                                                    <div className="retailproductpage-product-pdet-share-ul-li" >
                                                        <FaWhatsapp className="retailproductpage-product-pdet-share-ul-li-ic" />
                                                    </div>
                                            </WhatsappShareButton>

                                            <FacebookShareButton  className="referf" url={ shareurl }>
                                                <div className="retailproductpage-product-pdet-share-ul-li" >
                                                    <FaFacebook className="retailproductpage-product-pdet-share-ul-li-ic" />
                                                </div>  
                                            </FacebookShareButton> 

                                            <TwitterShareButton className="referf" url={shareurl}>
                                                <div className="retailproductpage-product-pdet-share-ul-li" >
                                                    <FaTwitter className="retailproductpage-product-pdet-share-ul-li-ic" />
                                                </div>
                                            </TwitterShareButton>


                                            <LinkedinShareButton className="referf" url={ shareurl }>
                                                <div className="retailproductpage-product-pdet-share-ul-li" >
                                                    <FaLinkedinIn className="retailproductpage-product-pdet-share-ul-li-ic" />
                                                </div>
                                            </LinkedinShareButton>

                                            <TelegramShareButton className="referf" url={ shareurl }>
                                                <div className="retailproductpage-product-pdet-share-ul-li" >
                                                    <FaTelegram className="retailproductpage-product-pdet-share-ul-li-ic" />
                                                </div>
                                            </TelegramShareButton>

{/* 
                                                <div className="retailproductpage-product-pdet-share-ul-li" >
                                                    <FaInstagram className="retailproductpage-product-pdet-share-ul-li-ic" />
                                                </div> */}
                                            </div>
                                        </div>

                                    </div>

                                </div>

{/* 
                                <div className="retailproductpage-specs" >

                                    <div className="retailproductpage-specs-top" >

                                        <div className="retailproductpage-specs-top-li" > Description </div>
                                        <div className="retailproductpage-specs-top-li" > Specifications </div>
                                        <div className="retailproductpage-specs-top-li" > Reviews(2) </div>

                                    </div>


                                    <div className="retailproductpage-specs-desc" >
                                        {currentproduct.description}
                                    </div>


                                
                                    <div className="retailproductpage-specs-table" >

                                        <div className="retailproductpage-specs-table-row" >
                                            <div className="retailproductpage-specs-table-row-left" >
                                                <span>Product code</span>
                                            </div>
                                            <div className="retailproductpage-specs-table-row-left" > yu7rew </div>
                                        </div>

                                        <div className="retailproductpage-specs-table-row" >
                                            <div className="retailproductpage-specs-table-row-left" >
                                                <span>Weight</span>
                                            </div>
                                            <div className="retailproductpage-specs-table-row-left" > 14kg </div>
                                        </div>
                                        <div className="retailproductpage-specs-table-row" >
                                            <div className="retailproductpage-specs-table-row-left" >
                                                <span>Weight</span>
                                            </div>
                                            <div className="retailproductpage-specs-table-row-left" > 14kg </div>
                                        </div>

                                    </div>

                                    <div className="retailproductpage-specs-rev" >
                                        <div className="retailproductpage-specs-rev-img" ></div>
                                        <div className="retailproductpage-specs-rev-div" >
                                            <div className="retailproductpage-specs-rev-div-top" >
                                                Miron Mahmud - <span> 1 hour ago </span>
                                            </div>
                                            <div className="retailproductpage-specs-rev-div-reviews" >
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                                sed do eiusmod tempor incididunt ut labore et dolore 
                                                magna aliqua. Ut enim ad minim veniam, quis nostrud 
                                                exercitation ullamco laboris nisi ut aliquip ex ea 
                                                commodo consequat. Duis aute irure dolor in reprehenderit in 
                                                voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                                                Excepteur sint occaecat cupidatat non proident, 
                                                sunt in culpa qui officia deserunt mollit anim id est laborum
                                            </div>
                                        </div>
                                    </div>

                                </div>
 */}

                            </div>

                                { Otherproducts && Otherproducts.length > 1 ?
                                
                                    <OtherCatLayout
                                        category_name="Related Products"
                                        to={'/retail/category/' +  currentproduct.category + '/' + currentproduct.category }                                   
                                    >

                                        { newlistit.map( ( product , index ) => {

                                                return (

                                                    <ProductList
                                                    
                                                        key={index}
                                                        productname={product.myproduct_name}
                                                        img={product.product_img1}
                                                        price={product.selling_price}
                                                        avg_rating={product.avg_rating}
                                                        to={'/retail/product/' + product.slug + '/' + product.id}
                                                        scale={product.scale}
                                                    />

                                                );

                                        } )  }

                                    </OtherCatLayout>

                                : null } 


                 </>
            }
        }  
    }



    return (

        <>

            {todisplay}

        </>

    );
}

export default RetailproductPage;