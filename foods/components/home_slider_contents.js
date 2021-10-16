import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Img1 from '../../component/utilities/bakery.jpg';
import Img2 from '../../component/utilities/pasta.jpg';


export const Homeslidercontent = (props) => {

    return (

        <div className="homeslider-div" >
            <img className="homeslider-div-img" style={{
                objectPosition:'top'
            }} src={Img2} alt="" />
            <div className="homeslider-div-ab" >
                <div className="homeslider-div-ab-p" >
                    <div className="homeslider-div-ab-p-top" style={{
                        color:'#49A010'
                    }} >
                        Refer someone to FarmyApp 
                        <br/>
                        and start making money
                        <br/>
                        today
                    </div>
                    <Link to="/my_referrals" className="homeslider-div-ab-p-btn" >
                         Get Started
                    </Link>
                </div>
            </div>
        </div>

    );
}


export const Homeslidercontent2 = (props) => {

    return (

        <div className="homeslider-div" >
            <img className="homeslider-div-img" src={Img1} alt="" />
            <div className="homeslider-div-ab" >
                <div className="homeslider-div-ab-p" >
                    <div className="homeslider-div-ab-p-top" style={{
                        color:'black'
                    }} >
                        Order For Various Pasteries
                        <br/>
                        At The Cheapest Price 
                        <br/>
                        Today
                    </div>
                    <Link to="/retail/category/12/pastries/" className="homeslider-div-ab-p-btn" >
                         Buy Now
                    </Link>
                </div>
            </div>
        </div>

    );
}