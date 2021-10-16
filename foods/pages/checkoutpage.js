import React,{useState,useEffect,useContext} from 'react';
import { FoodCartHeader, CheckOutItem, FoodCartTotal, useMonth } from '../components/cartpagecomponents';
import { Textwithbottom } from '../components/productlistcomponents';
import Store from '../../store/managementstore/managementstore';
import Axios from 'axios';
import LoadingPage from '../components/loading/loading';
import OppsPage from '../components/oppspage/oppspage';
import { store } from 'react-notifications-component';
import BtnSpin from '../../component/utilities/btnSpin/btnSpin';
import {PaystackButton } from 'react-paystack';     

const FoodCheckoutPage = (props) => {

    const Orid = props.match.params.id
    const context = useContext(Store)
    const REACT_APP_PAYSTACK_TEST_KEY = process.env.REACT_APP_PAYSTACK_KEY


    const [ Loadingpage , setLoadingpage ] = useState(false)
    const [ Errorpage , setErrorpage ] = useState(false)
    const [ Order , setOrder ] = useState(null)
    const [ UserDetails , setUserDetails ] = useState(null)
    const [ AddressStatus , setAddressStatus ] = useState({
        state:'Oyo',
        country:'Nigeria',
        address:'',
        lga:''
    })
    const [ PhoneNumber , setPhoneNumber ] = useState(null)
    const [ Process , setProcess ] = useState(null)
    const [ OpenPayStack , setOpenPayStack ] = useState(false)
    const [ wallet_balance , setwallet_balance ] = useState(false)


    


    useEffect( () => {

      setErrorpage(false)
      setLoadingpage(true)


      Axios.get('/myorder/myorder/' + Orid + '/' ).then(

          response => {

                if ( response.data.status === 'paid' || response.data.status === 'in_transit' || response.data.status === 'delivered' ) {
                    props.history.push('/profile/retail_order/' + response.data.id )
                }else{

                  var another_response = response.data

                  Axios.get('/account/userpro/' +  context.User_id + '/' ).then(

                    response => {

                        var second_response = response.data

                        Axios.get('/account/myaddress/?limit=100000&offset=0').then(
                            
                            response => {
                                setOrder(another_response)
                                setUserDetails(second_response)
                                setPhoneNumber(second_response.pro.phone_number)

                                for (let k = 0; k < response.data.results.length ; k++) {

                                    if ( response.data.results[k].users === second_response.id  ) {
                                        SettheAddressStatus(response.data.results[k])
                                        break
                                    }

                                }
                                getIncomedetails()
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




    

    const getIncomedetails = () => {

        Axios.get('account/income/?limit=100000&offset=0').then(

            response => {

                var res = response.data.results
                var accum_income = 0

                for (let r = 0; r < res.length ; r++) {

                    if ( res[r].profile === parseInt(context.User_id) ) {
                        accum_income = parseInt(accum_income) + parseInt(res[r].amount)
                    }

                }

                Axios.get('account/payment/?limit=100000&offset=0').then(

                    response => {

                        var debt = response.data.results
                        var accum_debt = 0
        
                        for (let r = 0; r < debt.length ; r++) {
        
                            if ( debt[r].profile === parseInt(context.User_id) ) {
                                accum_debt = parseInt(accum_debt) + parseInt(debt[r].amount)
                            }
        
                        }

                        var wallet_balanced = accum_income - accum_debt
                        setwallet_balance(wallet_balanced)
                        setLoadingpage(false)
                        setErrorpage(false)

                    }

                ).catch(
                    e => {
                        setLoadingpage(false)
                        setErrorpage(true)
                    }
                )

            }

        ).catch(
            e => {
                setLoadingpage(false)
                setErrorpage(true)
            }
        )

    }







    const SettheAddressStatus = (address) => {
        
        setAddressStatus({
            state:'Oyo',
            country:'Nigeria',
            lga:address.lga,
            address:address.address,
            id:address.id
        })

    }



    const updateOrderdetails = () => {

        Axios.patch('/myorder/myorder/' + Orid + '/' , { status: 'paid' } ).then(

            response => {
                props.history.push('/profile/retail_order/' + response.data.id )
            }

        ).catch(
            e => {
                store.addNotification({
                    title: "Completing Order",
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
            }
        )

    }


    const PostAddressHandler = () => {

        if ( AddressStatus.address === '' ) {
            store.addNotification({
                title: "Address",
                message: 'Fill In Your Address' ,
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
            setProcess(false)
        }else{

            if ( AddressStatus.id ) {
                
                Axios.patch('/account/myaddress/' + AddressStatus.id + '/' , {users:context.User_id,address:AddressStatus.address,lga:AddressStatus.lga} ).then(
                    resonse => {
                        // 
                        setProcess(false)
                        setOpenPayStack(true)
                    }
                )
                .catch(
                    e => {
                        store.addNotification({
                            title: "Address",
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
                        setProcess(false)
                    }
                )

            }else{
                
                var what_to_post = {state:AddressStatus.state,users:context.User_id,lga:AddressStatus.lga,address:AddressStatus.address}

                Axios.post('/account/myaddress/',what_to_post).then(
                    resonse => {
                        // updateOrderdetails()
                        setProcess(false)
                        setOpenPayStack(true)
                    }
                )
                .catch(
                    e => {
                        store.addNotification({
                            title: "Address",
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
                        setProcess(false)
                    }
                )

            }

        }

    } 



    const fixphonenumber = () => {

        if ( PhoneNumber === '' ) {
            store.addNotification({
                title: "Completion Of Profile Details",
                message: 'Fill In Your Phone Number' ,
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
            setProcess(false)
        }else{

            Axios.patch('/account/profile/' + UserDetails.pro.id + '/' , {phone_number:PhoneNumber} ).then(
                response => {
                    setUserDetails({
                        ...UserDetails,
                        pro:{
                            ...response.data
                        }
                    })
                    PostAddressHandler()
                }
            ).catch(
                e => {
                    store.addNotification({
                        title: "Completion Of Profile Details",
                        message: 'Something Went Wrong',
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
                    setProcess(false)
                }
            )

        }

    }




    const CheckitoutHandler = () => {
        setProcess(true)
        if ( UserDetails.pro.phone_number ) {
            PostAddressHandler()
        }else{
            fixphonenumber()
        }
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
                                    onChange={ (event) => setAddressStatus({...AddressStatus,address:event.target.value}) } />
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
                                    onChange={ (event) => setAddressStatus({...AddressStatus,lga:event.target.value}) } />
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
                                    onChange={ (event) => setPhoneNumber(event.target.value) }
                                    disabled={ UserDetails.pro.phone_number ? true : false } 
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
                            {title:'Shipping Charge',value:Order.get_tfare},
                            {title:'Product Total',value: Order.total_cost },
                            {title:'Wallet Balance',value: wallet_balance },
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

                            { OpenPayStack ?
                            
                                <PaystackButton
                                    reference = { (new Date()).getTime() }
                                    email = { UserDetails.email }
                                    amount = {Order.absolute_total + '00'}
                                    publicKey={ REACT_APP_PAYSTACK_TEST_KEY }
                                    text = { 'Pay ₦' + new Intl.NumberFormat({ style: 'currency', currency: 'EUR' }).format(Order.absolute_total)}
                                    onSuccess={ () => updateOrderdetails() }
                                    className='retailcartpage-btm-link'
                                />

                            :
                                <button disabled={Process} className="retailcartpage-btm-link" onClick={CheckitoutHandler} >
                                    { Process ? <BtnSpin bgColor="white" /> : 'Place Order' }
                                </button>
                            }

                    </div>

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

export default FoodCheckoutPage;