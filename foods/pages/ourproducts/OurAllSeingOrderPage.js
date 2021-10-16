import Axios from 'axios';
import React, { useEffect,useState } from 'react';
// import { AiFillEdit } from 'react-icons/ai';
import LoadingPage from '../../components/loading/loading';
import OppsPage from '../../components/oppspage/oppspage';
import { FoodCartHeader, FoodAllOrderList, useMonth } from '../../components/cartpagecomponents';
import { EmptyCartDiv } from '../../components/empty/no_product';


const OurAllSeingOrderPage = (props) => {

    const [ Errorpage , setErrorpage ] = useState(false)
    const [ Loadingpage , setLoadingpage ] = useState(false)
    const [ AllOrders , setAllOrders ] = useState(null)
    const [ WhichOrdersToShow , setOrdersToShow ] = useState(1)


    useEffect( () => {

        setLoadingpage(true)
        setErrorpage(false)

        Axios.get('/myorder/myorder/?limit=100000&offset=0').then(

            response => {

                setLoadingpage(false)
                setErrorpage(false)
                setAllOrders(response.data.results)
            }

        ).catch(

            e => {
                setLoadingpage(false)
                setErrorpage(true)
            }

        )

    } , [] )



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
    
    
      if( Loadingpage && !AllOrders && !Errorpage ){
        var what_to_return = <LoadingPage/>
      }else{
        if ( !Loadingpage && Errorpage && !AllOrders ) {
          what_to_return = <OppsPage tryagain={gogo} goback={goBack} />
        }else{
          if ( !Loadingpage && !Errorpage && AllOrders ) {
            what_to_return = <>
            


            
                                    <div className="retailcartpage" >


                                        <div className="retailproductpage-specs-top" >

                                            <div className="retailproductpage-specs-top-li" onClick={ () => setOrdersToShow(1) } style={{
                                                borderBottom: WhichOrdersToShow === 1 ? '2px solid #49A010' : '2px solid transparent'
                                            }} > Pendding </div>
                                            <div className="retailproductpage-specs-top-li" onClick={ () => setOrdersToShow(2) } style={{
                                                borderBottom: WhichOrdersToShow === 2 ? '2px solid #49A010' : '2px solid transparent'
                                            }}> In-Transit </div>
                                            <div className="retailproductpage-specs-top-li" onClick={ () => setOrdersToShow(3) } style={{
                                                borderBottom: WhichOrdersToShow === 3 ? '2px solid #49A010' : '2px solid transparent'
                                            }}> Delivered </div>

                                        </div>

                                        { WhichOrdersToShow === 1 ? 
                                        
                                         AllOrders.length > 0 ? 
                                        
                                          <>
                                              <div className="tablescroll" id="tablescroll" >

                                                  <table className="retailcartpage-cart" >

                                                      <FoodCartHeader
                                                          lists={['Order','Date','Status','Product','Total']}
                                                      />

                                                      { AllOrders.map( ( order , index ) => {

                                                          if ( order.status === 'paid' ) {
                                                            
                                                            var some = new Date(order.create_date)

                                                            some.setDate(some.getDate() + 1);

                                                            const theyear = some.getFullYear()
                                                            const themonth = some.getMonth()

                                                            const readymonth = GetMonth(themonth)

                                                            return (

                                                              <FoodAllOrderList
                                                                  key={index}
                                                                  index={ index + 1 }
                                                                  date={ readymonth + ' ' + some.getDate() + ',' + theyear }
                                                                  status='Pendding'
                                                                  product={ order.items.length }
                                                                  color='orange'
                                                                  total_price={order.absolute_total}
                                                                  to={ '/retail/products/allorders/' + order.id }     
                                                              />

                                                          );

                                                          }

                                                          return null


                                                      } ) }

                                                  </table>

                                              </div>

                                          </>

                                          : <EmptyCartDiv/> 
                                            
                                            : null }


                                      { WhichOrdersToShow === 2 ? 
                                        
                                        AllOrders.length > 0 ? 
                                       
                                         <>
                                             <div className="tablescroll" id="tablescroll" >

                                                 <table className="retailcartpage-cart" >

                                                     <FoodCartHeader
                                                         lists={['Order','Date','Status','Product','Total']}
                                                     />

                                                     { AllOrders.map( ( order , index ) => {

                                                         if ( order.status === 'in_transit' ) {
                                                           
                                                           var some = new Date(order.create_date)

                                                           some.setDate(some.getDate() + 1);

                                                           const theyear = some.getFullYear()
                                                           const themonth = some.getMonth()

                                                           const readymonth = GetMonth(themonth)

                                                           return (

                                                             <FoodAllOrderList
                                                                 key={index}
                                                                 index={ index + 1 }
                                                                 date={ readymonth + ' ' + some.getDate() + ',' + theyear }
                                                                 status='In-Transit'
                                                                 product={ order.items.length }
                                                                 color='blue'
                                                                 total_price={order.absolute_total}
                                                                 to={ '/retail/products/allorders/' + order.id }     
                                                             />

                                                         );

                                                         }

                                                         return null


                                                     } ) }

                                                 </table>

                                             </div>

                                         </>

                                        : <EmptyCartDiv/> 
                                          
                                          : null }

                                      { WhichOrdersToShow === 3 ? 
                                        
                                        AllOrders.length > 0 ? 
                                       
                                         <>
                                             <div className="tablescroll" id="tablescroll" >

                                                 <table className="retailcartpage-cart" >

                                                     <FoodCartHeader
                                                         lists={['Order','Date','Status','Product','Total']}
                                                     />

                                                     { AllOrders.map( ( order , index ) => {

                                                         if ( order.status === 'delivered' ) {
                                                           
                                                           var some = new Date(order.create_date)

                                                           some.setDate(some.getDate() + 1);

                                                           const theyear = some.getFullYear()
                                                           const themonth = some.getMonth()

                                                           const readymonth = GetMonth(themonth)

                                                           return (

                                                             <FoodAllOrderList
                                                                 key={index}
                                                                 index={ index + 1 }
                                                                 date={ readymonth + ' ' + some.getDate() + ',' + theyear }
                                                                 status='Delivered'
                                                                 product={ order.items.length }
                                                                 color="green"
                                                                 total_price={order.absolute_total}
                                                                 to={ '/retail/products/allorders/' + order.id }     
                                                             />

                                                         );

                                                         }

                                                         return null


                                                     } ) }

                                                 </table>

                                             </div>

                                         </>

                                        : <EmptyCartDiv/> 
                                          
                                          : null }

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

export default OurAllSeingOrderPage;