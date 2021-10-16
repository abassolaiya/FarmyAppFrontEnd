import React,{useState,useEffect} from 'react';
import Axios from 'axios';
import LoadingPage from '../components/loading/loading';
import OppsPage from '../components/oppspage/oppspage';
import Logo from '../../layout/header/logo/headerleftslide/olaiya1.png';
import { ReceiptItem, FoodCartHeader, FoodCartTotal,useMonth } from '../components/cartpagecomponents';
import { EmptyCartDiv } from '../components/empty/no_product';


const ReceiptComponent = (props) => {


  const [ Loadingpage , setLoadingpage ] = useState(false)
  const [ Errorpage , setErrorpage ] = useState(false)
  const [ Orders , setOrders ] = useState(null)
  const [ Address , setAddress ] = useState(null)
  const [ Dately , setDately ] = useState(null)


  useEffect( () => {

    setErrorpage(false)
    setLoadingpage(true)


    Axios.get('/myorder/myorder/?limit=20004&offset=0/' ).then(
        

        response => {

                var another_response = response.data.results 


                Axios.get('/account/myaddress/?limit=20004&offset=0/').then(

                    response => {
  
                        const newlybaked = new Date();

                        setDately(newlybaked) 

                        var second_response = response.data.results
                        setOrders(another_response)
                        setAddress(second_response)
                        setLoadingpage(false)
                        setErrorpage(false)
  
                    }).catch(
  
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
// eslint-disable-next-line
  },[] )








const GetMonth = (number) => {
    const [month] = useMonth(number)
    return month
}




  if ( Orders ) {
    
    var AllReceipts = []

    const filter = new Date(Dately);
    filter.setDate(filter.getDate() + 1);
    var filteryear = filter.getFullYear()
    var filtermonth = filter.getMonth()
    var filterday = filter.getDate()

    for (let o = 0; o < Orders.length; o++) {
        
        var Orderit = Orders[o]

        const partydate = new Date(Orderit.create_date);
        partydate.setDate(partydate.getDate() + 1);

        var orderyear = partydate.getFullYear()
        var ordermonth = partydate.getMonth()
        var orderday = partydate.getDate()
        
        if ( filteryear === orderyear && filtermonth === ordermonth && filterday === orderday ) {
            

            for (let u = 0; u < Address.length; u++) {

                var daddress = Address[u]

                if ( daddress.users === Orderit.user.id ) {
                    var sendit = {...Orderit,address:daddress}
                    AllReceipts.push(sendit)
                }
                
            }

        }

    }



  }


  setInterval(() => {
      console.log(AllReceipts)
  }, 4000);

  const gogo = () => {
    props.history.go()
  } 

  const goBack = () => {
    props.history.goBack()
  }


  if( Loadingpage && !Errorpage  && !Orders ){
    var what_to_return = <LoadingPage/>
  }else{
    if ( !Loadingpage && Errorpage  && !Orders ) {
      what_to_return = <OppsPage tryagain={gogo} goback={goBack} />
    }else{
      if ( !Loadingpage && !Errorpage && Orders ) {

 


        what_to_return = <>
        
                                     <div className="receipts_page" >

                                        <div style={{
                                            boxSizing:'border-box',
                                            width:'100%',
                                            display:'flex',
                                            justifyContent:"center",
                                            padding:'2rem 0rem'
                                        }} >
                                            <input style={{boxSizing:'border-box',width:'10%',padding:'1rem'}} placeholder="Select Date" type='date' onChange={ (event) => setDately(event.target.value) } />
                                        </div>


                                        { Orders && AllReceipts.length > 0 ?
                                        
                                        
                                            AllReceipts.map( ( Order , index ) => {
                                                   
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

                                                    return (

                                                        
                                                                <div className="receipts_page_part" key={index} >
                                                                    
                                                                <div style={{
                                                                    display:'flex',
                                                                    justifyContent:'space-between',
                                                                    alignItems:'center',
                                                                    padding:'1rem 4rem',
                                                                }} >

                                                                    <div className="receipts_page_part-top" >
                                                                        <img className="receipts_page_part-top-img" alt="" src={Logo} />
                                                                    </div>

                                                                    <div style={{
                                                                        fontSize:'2.3rem',
                                                                        fontWeight:'600'
                                                                    }} >invoice</div>

                                                                </div>

                                                                <div className="receipts_page_part-info" style={{
                                                                    borderBottom:'1px solid gray'
                                                                }} >

                                                                    <div className="receipts_page_part-info-part" >
                                                                        <div className="receipts_page_part-info-part-email" > info@farmyapp.com </div>
                                                                        <div className="receipts_page_part-info-part-email" > Ola Jesu house, Agbofieti, Apata, Ibadan, Nigeria </div>
                                                                        <div className="receipts_page_part-info-part-email" > Phone: 07042995949 </div>
                                                                    </div>

                                                                </div>


                                                                <div className="receipts_page_part-buyer" >

                                                                    <div className="receipts_page_part-buyer-top" > Buyer's Information </div>

                                                                    <div className="" style={{
                                                                        paddingLeft:'0rem',
                                                                        marginTop:'2rem'
                                                                    }} >

                                                                        <div className="receipts_page_part-info-part" >
                                                                            <div className="receipts_page_part-info-part-company" > {Order.user.first_name} {Order.user.last_name} </div>
                                                                            <div className="receipts_page_part-info-part-email" > {Order.user.email} </div>
                                                                            <div className="receipts_page_part-info-part-email" > { Order.address ? Order.address.address : '' }, { Order.address ? Order.address.lga : '' } ,{ Order.address ? Order.address.state : '' }, Nigeria </div>
                                                                            <div className="receipts_page_part-info-part-email" > Phone: {Order.user.pro.phone_number} </div>
                                                                        </div>

                                                                    </div>

                                                                </div>

                                                                
                                                                <div className="tablescroll" id="tablescroll" >

                                                                    <table className="foodcheckoutpage-div-order" >

                                                                        <FoodCartHeader
                                                                            lists={[
                                                                                '#','Name','Price','Quantity','Total',
                                                                            ]}
                                                                        />



                                                                                { Order.items.map( ( item , index ) => {

                                                                                    return (

                                                                                        <ReceiptItem
                                                                                            key={index}
                                                                                            index={ index + 1 }
                                                                                            to={ '/retail/product/' + item.product.slug + '/' + item.product.id }
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

                                                            </div>

                                                    );

                                            } )

                                        
                                        : <EmptyCartDiv/> }



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

export default ReceiptComponent;