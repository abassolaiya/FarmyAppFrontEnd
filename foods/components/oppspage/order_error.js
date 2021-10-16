import React from 'react';
import EmptyImg from '../img/empty.png';

const OrderErrorPage = (props) => {

      return ( 
          <div className="oppsPage" >
              
              <img className="oppsPage-img" src={EmptyImg} alt="" />

             <div className="oppsPage-txt" > Something Went Wrong </div>

             <div className="oppsPage-str" >
                 Something went wrong while trying to process your order <br/> kindly press the "Refresh" button inorder to start the proces again.
                 <br/> If after pressing the "Refresh" button and this error pops up again, please reach out to us through our customer care line or through our email.
             </div>

             <div className="oppsPage-split" >
                <button className="oppsPage-btn" onClick={props.tryagain} > Refresh </button>
             </div>

          </div>
      );

}

export default OrderErrorPage;