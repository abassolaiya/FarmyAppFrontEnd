import React from 'react';
import {AiFillSave,AiFillDelete} from 'react-icons/ai';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export const FoodCartItem = (props) => {

  if( props.product_name.length > 20 ){
    var pname = []
    for( var i = 0 ; i < 20 ; i++ ){
        pname.push(props.product_name[i])
    } 
    pname.push('...')
}else{
    pname = props.product_name
}

    return (


        <tr className="retailcartpage-cart-body" >
            <td className="retailcartpage-cart-body-index" > {props.index} </td>
            <td className="retailcartpage-cart-body-pic" >
                <div className="retailcartpage-cart-body-pic-img" >
                    <img alt="" className="retailcartpage-cart-body-pic-img-img" src={props.img} />
                </div>
            </td>
            <td className="retailcartpage-cart-body-name" > <Link to={props.to} className="retailcartpage-cart-body-name-link" > { props.product_name ? pname : '' } </Link> </td>
            <td className="retailcartpage-cart-body-name" >
                ₦ {new Intl.NumberFormat({ style: 'currency', currency: 'EUR' }).format(props.price) }
            </td>
            <td className="retailcartpage-cart-body-qty">
                <input type="number" className="retailcartpage-cart-body-qty-input" min="0" value={props.quantity} onChange={props.changeQuantity} />
            </td>
            <td className="retailcartpage-cart-body-name" >
                ₦ {new Intl.NumberFormat({ style: 'currency', currency: 'EUR' }).format(props.total_price) }
            </td>
            <td className="retailcartpage-cart-body-name" style={{borderRight:'0px'}} >
                <button className="retailcartpage-cart-body-action-btn" onClick={ props.save } >
                    <AiFillSave className="retailcartpage-cart-body-action-btn-ic" />
                </button>
                <button className="retailcartpage-cart-body-action-btn" onClick={ props.delete } >
                    <AiFillDelete className="retailcartpage-cart-body-action-btn-ic" />
                </button>
            </td>
        </tr>

        
    );

}

export const FoodCartHeader = (props) => {

    return(

        <tr className="retailcartpage-cart-head" >
            { props.lists ? props.lists.map((list,index) => {
               return <th className="retailcartpage-cart-head-th" key={index} > {list} </th> 
            } ) : null}
        </tr>

    );

}


export const FoodCartTotal = (props) => {

    return(

        <div className="foodcart-totaldiv" >

            {props.totals ? props.totals.map((list,index) => {

                if ( list.normal ) {
                    return  <div className="foodcart-totaldiv-list" key={index} >
                                <div className="foodcart-totaldiv-list-title" > {list.title} </div>
                                <div className="foodcart-totaldiv-list-value" >
                                    {list.value}
                                </div>
                            </div>
                }else{
                    return  <div className="foodcart-totaldiv-list" key={index} >
                                <div className="foodcart-totaldiv-list-title" > {list.title} </div>
                                <div className="foodcart-totaldiv-list-value" >
                                    ₦ {new Intl.NumberFormat({ style: 'currency', currency: 'EUR' }).format(list.value) }
                                </div>
                            </div>
                }


            } ) : null }

        </div>

    );

}



export const SelectWhichCartToShowLink = (props) => {

  return(

    <div className="retailproductpage-specs-top-li" style={{
        backgroundColor: props.current ? '#DDFFD5' : 'transparent',
        color: props.current ? '#49A010' : 'black' ,
        borderBottom: props.current ? '2px solid #49A010' : '2px solid transparent' ,
    }} onClick={props.changeit} > 
      {props.txt}({props.count}) 
    </div>

  );

}





export const CheckOutItem = (props) => {

  if( props.product_name.length > 20 ){
    var pname = []
    for( var i = 0 ; i < 20 ; i++ ){
        pname.push(props.product_name[i])
    } 
    pname.push('...')
}else{
    pname = props.product_name
}

    return (


        <tr className="retailcartpage-cart-body" >
            <td className="retailcartpage-cart-body-index" > {props.index} </td>
            <td className="retailcartpage-cart-body-pic" >
                <div className="retailcartpage-cart-body-pic-img" >
                    <img alt="" className="retailcartpage-cart-body-pic-img-img" src={props.img} />
                </div>
            </td>
            <td className="retailcartpage-cart-body-name" > <Link to={props.to} className="retailcartpage-cart-body-name-link" > { props.product_name ? pname : '' } </Link> </td>
            <td className="retailcartpage-cart-body-name" >
                ₦ {new Intl.NumberFormat({ style: 'currency', currency: 'EUR' }).format(props.price) }
            </td>
            <td className="retailcartpage-cart-body-name">
                {props.quantity}
            </td>
            <td className="retailcartpage-cart-body-name" >
                ₦ {new Intl.NumberFormat({ style: 'currency', currency: 'EUR' }).format(props.total_price) }
            </td>
        </tr>

        
    );

}






export const ReceiptItem = (props) => {

    if( props.product_name.length > 20 ){
      var pname = []
      for( var i = 0 ; i < 20 ; i++ ){
          pname.push(props.product_name[i])
      } 
      pname.push('...')
  }else{
      pname = props.product_name
  }
  
      return (
  
  
          <tr className="retailcartpage-cart-body" >
              <td className="retailcartpage-cart-body-index" > {props.index} </td>
              <td className="retailcartpage-cart-body-name" > <Link to={props.to} className="retailcartpage-cart-body-name-link" > { props.product_name ? pname : '' } </Link> </td>
              <td className="retailcartpage-cart-body-name" >
                  ₦ {new Intl.NumberFormat({ style: 'currency', currency: 'EUR' }).format(props.price) }
              </td>
              <td className="retailcartpage-cart-body-name">
                  {props.quantity}
              </td>
              <td className="retailcartpage-cart-body-name" >
                  ₦ {new Intl.NumberFormat({ style: 'currency', currency: 'EUR' }).format(props.total_price) }
              </td>
          </tr>
  
          
      );
  
  }
  
  
  
  




export const FoodAllOrderList = (props) => {

    return (


        <tr className="retailcartpage-cart-body" >
            <td className="retailcartpage-cart-body-index" style={{color:'gray',borderLeft:'1px solid lightgray'}} > {props.index} </td>

            <td className="retailcartpage-cart-body-name" style={{color:'gray'}} > <Link to={props.to} className="retailcartpage-cart-body-name-link" style={{color:'gray'}} > {props.date} </Link> </td>
            <td className="retailcartpage-cart-body-name" style={{color:'gray'}} > <Link to={props.to} className="retailcartpage-cart-body-name-link" style={{color: props.color ? props.color : 'gray' ,textTransform:'uppercase'}} > { props.status } </Link> </td>
            <td className="retailcartpage-cart-body-name" style={{color:'gray'}} >
                {props.product}
            </td>
            <td className="retailcartpage-cart-body-name" style={{color:'gray'}} >
                ₦ {new Intl.NumberFormat({ style: 'currency', currency: 'EUR' }).format(props.total_price) }
            </td>
        </tr>

        
    );

}



export const ServiceOrderList = (props) => {

  if( props.service.length > 20 ){
    var pname = []
    for( var i = 0 ; i < 20 ; i++ ){
        pname.push(props.service[i])
    } 
    pname.push('...')
}else{
    pname = props.service
}


  return (


      <tr className="retailcartpage-cart-body" >
          <td className="retailcartpage-cart-body-index" style={{color:'gray',borderLeft:'1px solid lightgray'}} > {props.index} </td>

          <td className="retailcartpage-cart-body-name" style={{color:'gray'}} > <Link to={props.to} className="retailcartpage-cart-body-name-link" style={{color:'gray'}} > {props.date} </Link> </td>
          <td className="retailcartpage-cart-body-name" style={{color:'gray'}} > <Link to={props.productlink} className="retailcartpage-cart-body-name-link" style={{color:'gray'}} > {pname} </Link> </td>
          <td className="retailcartpage-cart-body-name" style={{color:'gray'}} >
             {props.status}
          </td>
          <td className="retailcartpage-cart-body-name" style={{color:'gray'}} >
              {props.hrs}
          </td>
          <td className="retailcartpage-cart-body-name" style={{color:'gray'}} >
              ₦ {new Intl.NumberFormat({ style: 'currency', currency: 'EUR' }).format(props.total_price) }
          </td>
      </tr>

      
  );

}




export const useMonth = (number) => {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    var month = months[number]

      return [ month ]

}


const MonthIdentifier = (number) => {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    var month = months[number]

      return  month

}




export const WhichdeliveryDay = (items,createdate) =>{


    var longest = 0

    for (let u = 0; u < items.length; u++) {
      
      var day_to = parseInt(items[u].product.days_to)

      if ( day_to > longest ) {
          longest = day_to
      }

    }

    const event = new Date(createdate);

    event.setDate(event.getDate() + longest);

    const first_day = event.getDay()

      if ( first_day === 0 ) {

        var some = new Date(createdate)
        var newlongest = longest + 3

        some.setDate(some.getDate() + newlongest)

        const theyear = some.getFullYear()
        const themonth = some.getMonth()

        const readymonth = MonthIdentifier(themonth)
    
        
        var Datetosend = {
          day:some.getDate(),
          month:readymonth,
          year:theyear
        }

      }

      if ( first_day === 1 ) {

         some = new Date(createdate)
        newlongest = longest + 5
        some.setDate(some.getDate() + newlongest)

        const theyear = some.getFullYear()
        const themonth = some.getMonth()

        const readymonth = MonthIdentifier(themonth)
    
        
         Datetosend = {
          day:some.getDate(),
          month:readymonth,
          year:theyear
        }

      }

      if ( first_day === 2 ) {

        some = new Date(createdate)

        newlongest = longest + 4

        some.setDate(some.getDate() + newlongest)

        const theyear = some.getFullYear()
        const themonth = some.getMonth()

        const readymonth = MonthIdentifier(themonth)
    
        
         Datetosend = {
          day:some.getDate(),
          month:readymonth,
          year:theyear
        }

      }

      if ( first_day === 3 ) {

        some = new Date(createdate)

        newlongest = longest + 3

        some.setDate(some.getDate() + newlongest)

        const theyear = some.getFullYear()
        const themonth = some.getMonth()

        const readymonth = MonthIdentifier(themonth)
    
        
        Datetosend = {
          day:some.getDate(),
          month:readymonth,
          year:theyear
        }

      }

      if ( first_day === 4 ) {

        some = new Date(createdate)

        newlongest = longest + 6

        some.setDate(some.getDate() + newlongest)

        const theyear = some.getFullYear()
        const themonth = some.getMonth()

        const readymonth = MonthIdentifier(themonth)
        
        Datetosend = {
          day:some.getDate(),
          month:readymonth,
          year:theyear
        }

      }

      if ( first_day === 5 ) {

        some = new Date(createdate)
        
        newlongest = longest + 5

        some.setDate(some.getDate() + newlongest)

        const theyear = some.getFullYear()
        const themonth = some.getMonth()

        const readymonth = MonthIdentifier(themonth)
    
        
        Datetosend = {
          day:some.getDate(),
          month:readymonth,
          year:theyear
        }

      }

      if ( first_day === 6 ) {

        some = new Date(createdate)

        newlongest = longest + 4

        some.setDate(some.getDate() + newlongest)

        const theyear = some.getFullYear()
        const themonth = some.getMonth()

        const readymonth = MonthIdentifier(themonth)
    
        
        Datetosend = {
          day:some.getDate(),
          month:readymonth,
          year:theyear
        }

      }

    


    return[Datetosend]

}