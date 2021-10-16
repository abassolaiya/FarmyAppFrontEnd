import React from 'react';
import EmptyImg from './empty.png';

const OppsPage = (props) => {

      return ( 
          <div className="oppsPage" >
              
              <img className="oppsPage-img" src={EmptyImg} alt="" />

             <div className="oppsPage-txt" > Page not available </div>

             <div className="oppsPage-str" >
                 This page could not be rendered , either the url is incorrect <br/> or some other error occured
             </div>

             <div className="oppsPage-split" >
                <button className="oppsPage-btn oppsPage-btn2" onClick={props.goback} > Go Back </button>
                <button className="oppsPage-btn" onClick={props.tryagain} > Try Again </button>
             </div>

          </div>
      );

}

export default OppsPage;