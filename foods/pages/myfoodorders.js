import Axios from 'axios';
import React, { useEffect,useState,useContext } from 'react';
import LoadingPage from '../components/loading/loading';
import OppsPage from '../components/oppspage/oppspage';
import { FoodAllOrderList, FoodCartHeader, useMonth ,ServiceOrderList} from '../components/cartpagecomponents';
import { EmptyOrder } from '../components/empty/no_product';
import Store from '../../store/managementstore/managementstore';
import ProfileHeader from '../layout_components/profile_header/profile_header';


const MyFoodAllOrders = (props) => {

    const context = useContext(Store)

    const [ Errorpage , setErrorpage ] = useState(false)
    const [ Loadingpage , setLoadingpage ] = useState(false)
    const [ MyFoodOrders , setMyFoodOrders ] = useState(null)
    const [ WholeSaleOrders , setWholeSaleOrders ] = useState(null)
    const [ Sorders , setSorders ] = useState(null)
    const [ Showorders , setShoworders ] = useState(1)


    useEffect( () => {

        setLoadingpage(true)
        setErrorpage(false)

        if ( context.User_id !== null ) {
            getdataHandler()
        }
// eslint-disable-next-line
    } , [context.User_id] )


    const getdataHandler = () => {

        Axios.get('/account/users/' + context.User_id + '/').then(

            response => {

                setLoadingpage(false)
                setErrorpage(false)
                setMyFoodOrders(response.data.myorder)
                setSorders(response.data.sorders)
                setWholeSaleOrders(response.data.orders)

            }

        ).catch(

            e => {
                setLoadingpage(false)
                setErrorpage(true)
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
    
    
      if( Loadingpage && !MyFoodOrders && !WholeSaleOrders && !Errorpage ){
        var what_to_return = <LoadingPage/>
      }else{
        if ( !Loadingpage && Errorpage && !MyFoodOrders && !WholeSaleOrders ) {
          what_to_return = <OppsPage tryagain={gogo} goback={goBack} />
        }else{
          if ( !Loadingpage && !Errorpage && MyFoodOrders && WholeSaleOrders ) {
            what_to_return = <>
            


            
                                    <div className="retailcartpage" >


                                        <div className="retailproductpage-specs-top" >

                                            <div className="retailproductpage-specs-top-li" onClick={ () => setShoworders(1) } style={{
                                                borderBottom: Showorders === 1 ? '2px solid #49A010' : '2px solid transparent'
                                            }} > Retail Orders ({MyFoodOrders.length}) </div>
                                            <div className="retailproductpage-specs-top-li" onClick={ () => setShoworders(2) } style={{
                                                borderBottom: Showorders === 2 ? '2px solid #49A010' : '2px solid transparent'
                                            }} > Wholesale Orders ({WholeSaleOrders.length}) </div>
                                            <div className="retailproductpage-specs-top-li" onClick={ () => setShoworders(3) } style={{
                                                borderBottom: Showorders === 3 ? '2px solid #49A010' : '2px solid transparent'
                                            }} > Services Orders ({Sorders.length}) </div>

                                        </div>


                                        { Showorders === 1 ? 

                                             MyFoodOrders.length > 0 ? 
                                            
                                                <>

                                                    <div className="tablescroll" id="tablescroll" >

                                                        <table className="retailcartpage-cart" >

                                                            <FoodCartHeader
                                                                lists={['Order','Date','Status','Product','Total']}
                                                            />

                                                            { MyFoodOrders.map( ( item , index ) => {

                                                                var some = new Date(item.create_date)

                                                                some.setDate(some.getDate() + 1);

                                                                const theyear = some.getFullYear()
                                                                const themonth = some.getMonth()
    
                                                                const readymonth = GetMonth(themonth)

                                                                if ( item.status === 'paid' ) {
                                                                    var color = 'orange'
                                                                    var statusthing = 'Pendding'
                                                                    var url = '/profile/retail_order/' + item.id
                                                                }

                                                                if ( item.status === 'created' ){
                                                                    color = 'red'
                                                                    statusthing = 'Unpaid'
                                                                    url = '/retail/checkout/' + context.User_id + '/' + item.id
                                                                }

                                                                if ( item.status === 'in-transit' ){
                                                                    color = 'blue'
                                                                    statusthing = 'In-transit'
                                                                    url = '/profile/retail_order/' + item.id
                                                                }

                                                                if ( item.status === 'delivered' ){
                                                                    color = 'green'
                                                                    statusthing = 'Delivered'
                                                                    url = '/profile/retail_order/' + item.id
                                                                }

                                                                return (

                                                                    <FoodAllOrderList
                                                                        key={index}
                                                                        index={ index + 1 }
                                                                        date={ readymonth + ' ' + some.getDate() + ',' + theyear }
                                                                        status={ statusthing }
                                                                        product={ item.items.length }
                                                                        color={color}
                                                                        total_price={item.absolute_total}
                                                                        to={ url }
                                                                    />

                                                                );

                                                            } ) }

                                                        </table>

                                                    </div>

                                                </>

                                            : <EmptyOrder/>

                                        : null }

                                        { Showorders === 2 ? 

                                            WholeSaleOrders.length > 0  ? 
                                            
                                                <>

                                                <div className="tablescroll" id="tablescroll" >

                                                    <table className="retailcartpage-cart" >

                                                        <FoodCartHeader
                                                            lists={['Order','Date','Status','Product','Total']}
                                                        />

                                                        { WholeSaleOrders.map( ( item , index ) => {

                                                            var some = new Date(item.create_date)

                                                            const theyear = some.getFullYear()
                                                            const themonth = some.getMonth()

                                                            var statuslistPendding = []
                                                            var statuslistCreated = []
                                                            var statuslistDelivered = []

                                                            const readymonth = GetMonth(themonth)

                                                            for (let p = 0; p < item.items.length; p++) {
                                                                const itemitself = item.items[p]

                                                                if( itemitself.status === 'paid' ){
                                                                    statuslistPendding.push(itemitself)
                                                                }else{
                                                                    if( itemitself.status === 'in_transit' || itemitself.status === 'refunded' ){
                                                                        statuslistPendding.push(itemitself)
                                                                    }else{
                                                                        if( itemitself.status === 'created' ){
                                                                            statuslistCreated.push(itemitself)
                                                                        }else{
                                                                            if( itemitself.status === 'delivered' ){
                                                                                statuslistDelivered.push(itemitself)
                                                                            }
                                                                        }
                                                                    }

                                                                }
                                                            }

                                                            if ( statuslistPendding.length > 0 ) {
                                                                var statusit = 'Pendding'
                                                            }else{
                                                                if ( statuslistCreated.length > 0 && statuslistPendding.length < 1 ) {
                                                                    statusit = ' UnPaid '
                                                                }else{
                                                                    if ( statuslistCreated.length < 1 && statuslistPendding.length < 1 && statuslistDelivered.length === item.items.length ) {
                                                                        statusit = ' Delivered '
                                                                    }
                                                                }
                                                            }


                                                            return (

                                                                <FoodAllOrderList
                                                                    key={index}
                                                                    index={ index + 1 }
                                                                    date={ readymonth + ' ' + some.getDate() + ',' + theyear }
                                                                    status={ statusit }
                                                                    product={ item.items.length }
                                                                    total_price={item.get_total_cost}
                                                                    to={ '/profile/wholesale_order/' + item.id }
                                                                />

                                                            );

                                                        } ) }

                                                    </table>

                                                </div>

                                            </>   
                                                
                                            : <EmptyOrder to='/wholesale' />
                                        
                                        : null }

                                        { Showorders === 3 ? 

                                            Sorders.length > 0 ? 
                                            
                                                <>

                                                <div className="tablescroll" id="tablescroll" >

                                                    <table className="retailcartpage-cart" >

                                                        <FoodCartHeader
                                                            lists={['Order','Date','Service','Status','Hours','Total']}
                                                        />

                                                        { Sorders.map( ( item , index ) => {

                                                            var some = new Date(item.date)

                                                            const theyear = some.getFullYear()
                                                            const themonth = some.getMonth()

                                                            const readymonth = GetMonth(themonth)


                                                            return (

                                                                <ServiceOrderList
                                                                    key={index}
                                                                    index={ index + 1 }
                                                                    date={ readymonth + ' ' + some.getDate() + ',' + theyear }
                                                                    service={ item.service.service_name }
                                                                    hrs={ item.duration }
                                                                    productlink={ '/fullserv' + item.service.slug + ':' + item.service.id }
                                                                    status={item.status}
                                                                    total_price={item.paying}
                                                                    to={ '/services_hired' }
                                                                />

                                                            );

                                                        } ) }

                                                    </table>

                                                </div>

                                            </>

                                            : <EmptyOrder to={'/services'} /> 

                                        : null }

                                    </div>


            </>
          }
        }
      }


















    return (

            
            <>

                <ProfileHeader
                title="My Orders"
                goback={ goBack }
                />

                {what_to_return}
            </>

    );
}

export default MyFoodAllOrders;