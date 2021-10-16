import React,{useState,useEffect,useContext} from 'react';
import { FoodCartHeader, CheckOutItem, FoodCartTotal, useMonth } from '../../components/cartpagecomponents';
import { Textwithbottom } from '../../components/productlistcomponents';
import Store from '../../../store/managementstore/managementstore';
import Axios from 'axios';
import LoadingPage from '../../components/loading/loading';
import { store } from 'react-notifications-component';
import OppsPage from '../../components/oppspage/oppspage';
import BtnSpin from '../../../component/utilities/btnSpin/btnSpin';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const OurChangeOrderPage = (props) => {

    const Orid = props.match.params.id
    const context = useContext(Store)


    const [ Loadingpage , setLoadingpage ] = useState(false)
    const [ Errorpage , setErrorpage ] = useState(false)
    const [ Order , setOrder ] = useState(null)
    const [ UserDetails , setUserDetails ] = useState(null)
    const [ loadingprocess , setloadingprocess ] = useState(false)
    const [ AddressStatus , setAddressStatus ] = useState({
        state:'Oyo',
        country:'Nigeria',
        address:'',
        lga:''
    })
    const [ PhoneNumber , setPhoneNumber ] = useState(null)


    


    useEffect( () => {

      setErrorpage(false)
      setLoadingpage(true)


      Axios.get('/myorder/myorder/' + Orid + '/' ).then(

          response => {

                if ( response.data.status === 'created') {
                    props.history.push('/retail/checkout/' + context.User_id + '/' + response.data.id )
                }else{

                  var another_response = response.data

                        Axios.get('/account/myaddress/').then(
                            
                            response => {
                                setOrder(another_response)
                                setUserDetails(another_response.user)
                                setPhoneNumber(another_response.user.pro.phone_number)

                                for (let k = 0; k < response.data.results.length ; k++) {

                                    if ( response.data.results[k].users === another_response.user.id  ) {
                                        SettheAddressStatus(response.data.results[k])
                                        break
                                    }

                                }

                                setLoadingpage(false)
                                setErrorpage(false)
                            }

                        ).catch(
                            e => {
                                setErrorpage(true)
                                setLoadingpage(false)
                            } 
                        )

                    }
                
              }

      ).catch(

          e => {
              setErrorpage(true)
              setLoadingpage(false)
          }

      )
// eslint-disable-next-line
    },[context.User_id,Orid] )



    const SettheAddressStatus = (address) => {
        
        setAddressStatus({
            state:'Oyo',
            country:'Nigeria',
            lga:address.lga,
            address:address.address,
            id:address.id
        })

    }






    const UpdateOrderTo_Intransit = () => {

        setloadingprocess(true)

        Axios.patch('/myorder/myorder/' + Orid + '/' , { status: 'in_transit' } ).then(

            response => {
                store.addNotification({
                    title: "Changing Order Status",
                    message: 'Order Status Was Successfully Updated' ,
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
                setloadingprocess(false)
                setOrder(response.data)
            }

        ).catch(
            e => {
                store.addNotification({
                    title: "Changing Order Status",
                    message: 'Something Went Wrong' ,
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
                  setloadingprocess(false)
            }
        )
    }


    

    const UpdateOrderTo_Delivered = () => {

        setloadingprocess(true)

        Axios.patch('/myorder/myorder/' + Orid + '/' , { status: 'delivered' } ).then(

            response => {
                store.addNotification({
                    title: "Changing Order Status",
                    message: 'Order Status Was Successfully Updated' ,
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
                setloadingprocess(false)
                setOrder(response.data)
            }

        ).catch(
            e => {
                store.addNotification({
                    title: "Changing Order Status",
                    message: 'Something Went Wrong' ,
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
                  setloadingprocess(false)
            }
        )
    }




    const GetMonth = (number) => {
        const [month] = useMonth(number)
        return month
      }




    const gogo = () => { 
        props.history.go()
      } 
    
      const goBack = () => {
        props.history.goBack()
      }
    
    
      if( Loadingpage && !Errorpage && !Order && !UserDetails ){
        var what_to_return = <LoadingPage/>
      }else{
        if ( !Loadingpage && Errorpage && !Order && !UserDetails ) {
          what_to_return = <OppsPage tryagain={gogo} goback={goBack} />
        }else{
          if ( !Loadingpage && !Errorpage && Order && UserDetails ) {

            const freshdate = new Date(Order.create_date);
            freshdate.setDate(freshdate.getDate() + 1);

            var theyear = freshdate.getFullYear()
            var themonth = freshdate.getMonth()
            var readymonth =  GetMonth(themonth)

            var time = parseInt(Order.create_time[0] + Order.create_time[1])

            if ( time > 15 ) {

                freshdate.setDate(freshdate.getDate() + 1);

                theyear = freshdate.getFullYear()
                themonth = freshdate.getMonth()
                readymonth = GetMonth(themonth)
            }

            if ( Order.status === 'paid' ) {
                var statusthing = 'Pendding'
                var buttontopress = <button style={{backgroundColor:'blue'}} disabled={loadingprocess} className="retailcartpage-btm-link" onClick={UpdateOrderTo_Intransit} >
                                        { loadingprocess ? <BtnSpin bgColor="white" /> : 'Change Order Status To In-Transit' }
                                    </button>
            }

            if ( Order.status === 'created' ){
                statusthing = 'Unpaid'
            }

            if ( Order.status === 'in_transit' ){
                statusthing = 'In-transit'
                buttontopress = <button style={{backgroundColor:'green'}} disabled={loadingprocess} className="retailcartpage-btm-link" onClick={UpdateOrderTo_Delivered} >
                                    { loadingprocess ? <BtnSpin bgColor="white" /> : 'Change Order Status To Delivered' }
                                </button>
            }

            if ( Order.status === 'delivered' ){
                statusthing = 'Delivered'
                buttontopress = null
            }

            what_to_return = <>

            
                <div className="foodcheckoutpage-div" >
                    
                    <div className="foodcheckoutpage-div-half" >

                        <Textwithbottom txt="Order Details" />
                        
                        <form className="foodcheckoutpage-div-half-form" >

                            <div className="foodcheckoutpage-div-half-form-split" >
                                <div className="foodcheckoutpage-div-half-form-split-div" >
                                    <input type="text" placeholder="First Name" className="foodcheckoutpage-div-half-form-split-div-input" value={UserDetails.first_name} disabled={true} />
                                    <label className="foodcheckoutpage-div-half-form-split-div-label" >First Name</label> 
                                </div> 
                                <div className="foodcheckoutpage-div-half-form-split-div" >
                                    <input type="text" placeholder="Last Name" className="foodcheckoutpage-div-half-form-split-div-input" value={UserDetails.last_name} disabled={true} />
                                    <label className="foodcheckoutpage-div-half-form-split-div-label" >Last Name</label> 
                                </div> 
                            </div>
                            
                            <div className="foodcheckoutpage-div-half-form-split-div" style={{
                                width:'100%',
                                marginBottom:'1rem'
                            }} >
                                <input type="text" placeholder="Address" 
                                    className="foodcheckoutpage-div-half-form-split-div-input" 
                                    value={AddressStatus.address} 
                                    disabled={true} />
                                <label className="foodcheckoutpage-div-half-form-split-div-label" >Address</label> 
                            </div> 
                                                        
                            <div className="foodcheckoutpage-div-half-form-split" >
                                <div className="foodcheckoutpage-div-half-form-split-div" >
                                    <input type="text" placeholder="Country" className="foodcheckoutpage-div-half-form-split-div-input" value="Nigeria" disabled={true} />
                                    <label className="foodcheckoutpage-div-half-form-split-div-label" >Country</label> 
                                </div> 
                                <div className="foodcheckoutpage-div-half-form-split-div" >
                                    <input type="text" placeholder="State" className="foodcheckoutpage-div-half-form-split-div-input" value="Ibadan" disabled={true} />
                                    <label className="foodcheckoutpage-div-half-form-split-div-label" >City</label> 
                                </div> 
                            </div>

                            <div className="foodcheckoutpage-div-half-form-split-div" style={{
                                width:'100%',
                                marginBottom:'1rem'
                            }} >
                                <input type="text" placeholder="Local Government Area" 
                                    className="foodcheckoutpage-div-half-form-split-div-input" 
                                    value={AddressStatus.lga} 
                                    disabled={true} />
                                <label className="foodcheckoutpage-div-half-form-split-div-label" >Local Government Area</label> 
                            </div> 

                            <div className="foodcheckoutpage-div-half-form-split" >
                                <div className="foodcheckoutpage-div-half-form-split-div" >
                                    <input type="text" placeholder="Email Address" className="foodcheckoutpage-div-half-form-split-div-input" value={UserDetails.email} disabled={true} />
                                    <label className="foodcheckoutpage-div-half-form-split-div-label" >Email Address</label> 
                                </div> 
                                <div className="foodcheckoutpage-div-half-form-split-div" >
                                    <input type="text" placeholder="Phone Number" 
                                    className="foodcheckoutpage-div-half-form-split-div-input" 
                                    value={PhoneNumber} 
                                    disabled={true}
                                    />
                                    <label className="foodcheckoutpage-div-half-form-split-div-label" >Phone Number</label> 
                                </div> 
                            </div>
  
                        </form>

                    </div>

                    {/* <Textwithbottom  txt="Confirm Order" /> */}

                    <div className="tablescroll" id="tablescroll" >

                        <table className="foodcheckoutpage-div-order" >

                            <FoodCartHeader
                                lists={[
                                    '#','Product','Name','Price','Quantity','Total',
                                ]}
                            />


                                { Order.items.map( ( item , index ) => {

                                return (

                                    <CheckOutItem
                                        key={index}
                                        index={ index + 1 }
                                        to={ '/retail/product/' + item.product.slug + '/' + item.product.id }
                                        img={item.product.product_img1}
                                        product_name={ item.product.myproduct_name }
                                        price={ item.product.selling_price }
                                        quantity={ item.quantity }
                                        total_price={ item.product.selling_price * item.quantity }
                                    />

                                );

                                } ) }

                        </table>

                    </div>

                    <FoodCartTotal
                        totals={[
                            {title:'Order Status',normal:true,value:statusthing},
                            {title:'Shipping Charge',value:Order.get_tfare},
                            {title:'Product Total',value: Order.total_cost },
                            {title:'SubTotal',value:Order.absolute_total},
                            {title:'Delivery Date',normal:true,value:readymonth + ' ' + freshdate.getDate() + ',' + theyear},
                        ]}
                    />

                    <div className="disclaimer_order" >
                        <div className="disclaimer_order_top" >
                            Important Notice
                        </div>
                        <div className="disclaimer_order_btm" >
                            Please Note That food delivery is only available in Ibadan.
                        </div>
                    </div>


                    <div className="retailcartpage-btm" >

                        {buttontopress}

                    </div>

                    <Link to={'/retail/receipts'} style={{
                        display:'block',
                        border:'1px solid lightgray',
                        width:'fit-content',
                        backgroundColor:'tomato',
                        textDecoration:'none',
                        color:'white',
                        margin:'2rem auto',
                        padding:'1rem'
                    }} >
                        Print Receipt
                    </Link>

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

export default OurChangeOrderPage;