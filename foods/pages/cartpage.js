import Axios from 'axios';
import React, { useEffect,useState ,useContext } from 'react';
// import { AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { store } from 'react-notifications-component';
import LoadingPage from '../components/loading/loading';
import OppsPage from '../components/oppspage/oppspage';
import { FoodCartHeader, FoodCartItem, FoodCartTotal } from '../components/cartpagecomponents';
import { EmptyCartDiv } from '../components/empty/no_product';
import Store from '../../store/managementstore/managementstore';
import WholeSaleCart from '../../component/cart-components/WholeSaleCart';


const RetailCartPage = (props) => {

    const context = useContext(Store)

    const [ Errorpage , setErrorpage ] = useState(false)
    const [ Loadingpage , setLoadingpage ] = useState(false)
    const [ myCart , setmyCart ] = useState(null)
    const [ WhichCartToShow , setWhichCartToShow ] = useState(1)


    useEffect( () => {

        setLoadingpage(true)
        setErrorpage(false)

        Axios.get('/mycarts/mycart/').then(

            response => {

                setLoadingpage(false)
                setErrorpage(false)
                setmyCart(response.data.results[0])
            }

        ).catch(

            e => {
                setLoadingpage(false)
                setErrorpage(true)
            }

        )

    } , [] )






    const change_item_quantity = ( event , id ) => {

        const itemIndex = myCart.items.findIndex( i => {
          return i.myproduct.id === id
        } )
    
          const item = {...myCart.items[itemIndex]}
    
          item.quantity = event.target.value
    
          const newlist = [...myCart.items]
    
          newlist[itemIndex] = item
    
          setmyCart({...myCart,items:newlist})    
  
    }




    const UpdateCartdetails = (id,name,qty) => {

        store.addNotification({
            title: "Updating Cart",
            message: " Updating " + name + " Quantity " ,
            type: "warning",
            insert: "top",
            container: "top-left",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 2000,
              onScreen: true
            }
          });
  
          const itemIndex = myCart.items.findIndex( i => {
            return i.myproduct.id === id
          } )
    
          const item = {...myCart.items[itemIndex]}
  
  
          if( item.quantity < 1 ){

            store.addNotification({
                title: "Updating Cart",
                message: name + " Quantity Field Must Be Filled " ,
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

          }else{
  
    
          Axios.post( '/mycarts/mycart/' + myCart.id + '/add_to_cart/' , { quantity:qty , myproduct_id: id } ).then(
            response => {
                  Axios({ method: 'GET',url:'mycarts/mycart/' })
                  .then( response => {
                      setmyCart({...myCart,get_total_cost:response.data.results[0].get_total_cost})
                      
                      context.updatefoodcartHandler(response.data.results[0])

                      store.addNotification({
                        title: "Updating Cart",
                        message: name + " Quantity Was Successfully Updated" ,
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
                      
                      } ).catch( e => {
                        store.addNotification({
                            title: "Updating Cart",
                            message: "Something Went Wrong When Updating " + name + " Quantity" ,
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
                      } )
            }
          ).catch( e => {

              store.addNotification({
                title: "Updating Cart",
                message: "Something Went Wrong When Updating " + name + " Quantity" ,
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
              
          } )
  
          }
  
      }















      const  remove_from_cart = ( productIndex , itemid ) => {
  
        store.addNotification({
          title: " Deleting... ",
          message:"Deleting An Item From Your Cart" ,
          type: "warning",
          insert: "top",
          container: "top-left",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true
          }
        });

          const prodId = { myproduct_id: itemid }  
          Axios.post( '/mycarts/mycart/' + myCart.id + '/remove_from_cart/' , prodId ).then(
            response => {

                const item = [ ...myCart.items ]
    
                item.splice(productIndex,1);
                setmyCart({...myCart,get_total_cost:response.data.get_total_cost,items:item})

               store.addNotification({
                title: "Updating Cart",
                message:" One Item In Your Cart Was removed " ,
                type: "success",
                insert: "top",
                container: "top-left",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
              })

              context.FoodCartUpdateRemove()
                
            }
           ).catch(

            e => {
              store.addNotification({
                title: "Updating Cart",
                message: "Something Went Wrong When Deleting An Item " ,
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
            }

          )
    
      }









      const moveForward = () => {

        if ( myCart.items.length > 0 ) {

          Axios.post( 'myorder/myorder/' , ''  ).then(

            response => {

              context.FoodCartUpdateRemove()
              props.history.push('/retail/checkout/' + context.User_id + '/' +  response.data.id ) 

            }

          ).catch()

        }

      }





    const gogo = () => { 
        props.history.go()
      } 
    
      const goBack = () => {
        props.history.goBack()
      }
    
    
      if( Loadingpage && !myCart && !Errorpage ){
        var what_to_return = <LoadingPage/>
      }else{
        if ( !Loadingpage && Errorpage && !myCart ) {
          what_to_return = <OppsPage tryagain={gogo} goback={goBack} />
        }else{
          if ( !Loadingpage && !Errorpage && myCart ) {
            what_to_return = <>
            


            
                                    <div className="retailcartpage" >


                                        <div className="retailproductpage-specs-top" >

                                            <div className="retailproductpage-specs-top-li" onClick={ () => setWhichCartToShow(1) } style={{
                                                borderBottom: WhichCartToShow === 1 ? '2px solid #49A010' : '2px solid transparent'
                                            }} > Retail ({myCart.items.length}) </div>
                                            <div className="retailproductpage-specs-top-li" onClick={ () => setWhichCartToShow(2) } style={{
                                                borderBottom: WhichCartToShow === 2 ? '2px solid #49A010' : '2px solid transparent'
                                            }}> Wholesale ({context.User_details ? context.User_details.detail.carts[0].items.length : false}) </div>

                                        </div>

                                        { WhichCartToShow === 1 ? 
                                        
                                         myCart.items.length > 0 ? 
                                        
                                          <>
                                              <div className="tablescroll" id="tablescroll" >

                                                  <table className="retailcartpage-cart" >

                                                      <FoodCartHeader
                                                          lists={['#','Product','Name','Price','Quantity','Total','Action']}
                                                      />

                                                      { myCart.items.map( ( item , index ) => {

                                                          return (

                                                              <FoodCartItem
                                                                  key={index}
                                                                  index={ index + 1 }
                                                                  to={ '/retail/product/' + item.myproduct.slug + '/' + item.myproduct.id }
                                                                  img={item.myproduct.product_img1}
                                                                  product_name={ item.myproduct.myproduct_name }
                                                                  price={ item.myproduct.selling_price }
                                                                  quantity={ item.quantity }
                                                                  changeQuantity={(event) => change_item_quantity(event,item.myproduct.id)}
                                                                  total_price={ item.myproduct.selling_price * item.quantity }
                                                                  save={ () => UpdateCartdetails(item.id,item.myproduct.myproduct_name,item.quantity) }
                                                                  delete={ () => remove_from_cart(index,item.myproduct.id) }
                                                              />

                                                          );

                                                      } ) }

                                                  </table>

                                              </div>

                                              <FoodCartTotal
                                                  totals={[
                                                      // {title:'Shipping Charge',value:'4590'},
                                                      // {title:'Subtotal',value:'89590'},
                                                      {title:'Total',value:myCart.get_total_cost},
                                                  ]}
                                              />

                                              <div className="retailcartpage-btm" >
                                                  <Link to="/" className="retailcartpage-btm-link" >
                                                      Continue Shopping
                                                  </Link>
                                                  <button to="#" onClick={ () => moveForward() } className="retailcartpage-btm-link" >
                                                      Proceed To Checkout
                                                  </button>
                                              </div>

                                          </>

                                      : <EmptyCartDiv/> 
                                        
                                        : null }

                                        { WhichCartToShow === 2 ? <WholeSaleCart gotofront={ () => props.history.push('/checkout') } /> : null }

                                    </div>


            </>
          }
        }
      }


















    return (

            <>
                {what_to_return}
            </>

    );
}

export default RetailCartPage;