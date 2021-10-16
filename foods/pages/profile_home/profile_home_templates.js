import React,{useState,useContext} from 'react';
import {Link} from 'react-router-dom';
// import OrderImg from "../../../component/utilities/delivery-truck.png";
import HandiImg from "../../../component/utilities/hand.png";
import Store from '../../../store/managementstore/managementstore';
import NotificationList from './notifications';
import {BsFillCaretLeftFill,BsFillHouseFill} from 'react-icons/bs';
import {FaBell, FaBriefcase, FaDoorOpen, FaHandsHelping, FaKey, FaTruck, FaUser} from 'react-icons/fa';
// import { BiKey } from 'react-icons/bi';
import { ImUsers } from 'react-icons/im';
import { GiShop } from 'react-icons/gi';

const ProfileHomeTemplates = (props) => {

    const context = useContext(Store)
 
    const [ openSlider, setopenSlider ] = useState(false)

    if( props.referee ){

        if( props.referee.length !== 0 ){
            var referal_list = props.referee.map(
                ( refer , index ) =>{
                    return   <div key={index} className="profiletemplate_div_top_referal_link" >
                                <div className="profiletemplate_div_top_referal_link_name" > {refer.username} </div>
                                {/* <div className="profiletemplate_div_top_referal_link_amount" > ₦5000 </div> */}
                            </div>
                }
            );
        }else{
            referal_list =  <div className="profiletemplate_div_middle_main_empty" >
                                <img src={HandiImg} alt="" className="profiletemplate_div_middle_main_empty_img" />
                                <div className="profiletemplate_div_middle_main_empty_text" > You Have Not Refered Anyone </div>
                                <Link className="profiletemplate_div_middle_main_empty_btn" to="/referal" > Start Refering </Link>
                            </div>
        }
    }

      return ( 
          <>

          <div className="profiletemplate_div" >

            <div className="profiletemplate_div_top" >

                <div className="profiletemplate_div_top_profile" >
                    
                    <div className="profiletemplate_div_top_profile_img" >

                    { props.profile_img ? 

                        <img className="profiletemplate_mobile_top_img-img" alt="" src={props.profile_img} />

                        : <FaUser className="profiletemplate_div_top_profile_img-ic" /> }

                    </div>

                    <div className="profiletemplate_div_top_profile_welcome" > Welcome </div>
                    <div className="profiletemplate_div_top_profile_name" > {props.first_name} {props.last_name} </div>
                </div>

                <div className="profiletemplate_div_top_referal" >

                    <div className="profiletemplate_div_middle_top" >
                        My Referal List ({props.referee?props.referee.length:null})

                        <Link className="profiletemplate_div_middle_top_right" to="/" > View All </Link>
 
                    </div>

                    <div className="profiletemplate_div_middle_main" >
                        {referal_list}
                    </div>  

                </div>

            </div>

            <div className="profiletemplate_div_last" >

                <div className="profiletemplate_div_last_notifications" >
                    <div className="profiletemplate_div_middle_top" >
                         Notifications
                    </div>
                    <div className="profiletemplate_div_middle_main" >
                        <NotificationList evry={props.evry} />
                    </div>
                </div>

                <div className="profiletemplate_div_last_toolbox" >
                    <div className="profiletemplate_div_middle_top" >
                        My Tools
                    </div>
                    
                    <Link className="profiletemplate_div_last_toolbox_link" to='/' >
                        <BsFillHouseFill className="profiletemplate_div_last_toolbox_link_ic" />
                        <span className="profiletemplate_div_last_toolbox_link_span" > Home </span>
                    </Link>

                    <Link className="profiletemplate_div_last_toolbox_link" to='/profile/editprofile' >
                        <FaUser className="profiletemplate_div_last_toolbox_link_ic" />
                        <span className="profiletemplate_div_last_toolbox_link_span" > Edit Profile </span>
                    </Link>

                    <Link className="profiletemplate_div_last_toolbox_link" to='/profile/editprofile' >
                        <FaKey className="profiletemplate_div_last_toolbox_link_ic" />
                        <span className="profiletemplate_div_last_toolbox_link_span" > Change Password </span>
                    </Link>

                    <Link className="profiletemplate_div_last_toolbox_link" to='/my_referrals' >
                        <ImUsers className="profiletemplate_div_last_toolbox_link_ic" />
                        <span className="profiletemplate_div_last_toolbox_link_span" > Referals </span>
                    </Link>

                    <Link className="profiletemplate_div_last_toolbox_link" to='/profile/myorders' >
                        <FaTruck className="profiletemplate_div_last_toolbox_link_ic" />
                        <span className="profiletemplate_div_last_toolbox_link_span" > My Orders </span>
                    </Link>

                    <div style={{ border:'1px solid lightgray',margin:'1rem auto' , width:'80%' }} ></div>


                    <Link className="profiletemplate_div_last_toolbox_link" to='/profile/my_products' >
                        <GiShop className="profiletemplate_div_last_toolbox_link_ic" />
                        <span className="profiletemplate_div_last_toolbox_link_span" > My Store </span>
                    </Link>

                    <Link className="profiletemplate_div_last_toolbox_link" to='/mypendingproducts' >
                        <FaTruck className="profiletemplate_div_last_toolbox_link_ic" />
                        <span className="profiletemplate_div_last_toolbox_link_span" > My Products Ordered </span>
                    </Link>

                    <div style={{ border:'1px solid lightgray',margin:'1rem auto' , width:'80%' }} ></div>

                        <Link className="profiletemplate_div_last_toolbox_link" to='/profile/my_services' >
                            <FaHandsHelping className="profiletemplate_div_last_toolbox_link_ic" />
                            <span className="profiletemplate_div_last_toolbox_link_span" > My Services </span>
                        </Link>

                        <Link className="profiletemplate_div_last_toolbox_link" to='/mypendingservices' >
                            <FaBriefcase className="profiletemplate_div_last_toolbox_link_ic" />
                            <span className="profiletemplate_div_last_toolbox_link_span" > My Services Ordered </span>
                        </Link>

                    <div style={{ border:'1px solid lightgray',margin:'1rem auto' , width:'80%' }} ></div>

                    <Link className="profiletemplate_div_last_toolbox_link" to='#' onClick={ props.logout_btn } >
                        <FaDoorOpen className="profiletemplate_div_last_toolbox_link_ic" />
                        <span className="profiletemplate_div_last_toolbox_link_span" > Log Out </span>
                    </Link>

                </div>

            </div>

          </div>
          
          <div className="profiletemplate_mobile" >
                
                <div className="profiletemplate_mobile_top" >
                    
                    <div className="profiletemplate_mobile_top_img" >
                        
                        { props.profile_img ? 

                            <img className="profiletemplate_mobile_top_img-img" alt="" src={props.profile_img} />
                        
                        : <FaUser className="profiletemplate_mobile_top_img-ic" />  }

                    </div>

                    <div className="profiletemplate_mobile_top_welcome" >Welcome</div>

                    <div className="profiletemplate_mobile_top_name" > {props.first_name} {props.last_name} </div>

                </div>

                <div className="profiletemplate_mobile_box" >
                        
                    <div className="profiletemplate_div_middle_top" >
                        My Tools
                    </div>   

                    <Link className="profiletemplate_div_last_toolbox_link" to='/' >
                        <BsFillHouseFill className="profiletemplate_div_last_toolbox_link_ic" />
                        <span className="profiletemplate_div_last_toolbox_link_span" > Home </span>
                    </Link>

                    <Link className="profiletemplate_div_last_toolbox_link" to='/profile/editprofile' >
                        <FaUser className="profiletemplate_div_last_toolbox_link_ic" />
                        <span className="profiletemplate_div_last_toolbox_link_span" > Edit Profile </span>
                    </Link>

                    <Link className="profiletemplate_div_last_toolbox_link" to='/profile/editprofile' >
                        <FaKey className="profiletemplate_div_last_toolbox_link_ic" />
                        <span className="profiletemplate_div_last_toolbox_link_span" > Change Password </span>
                    </Link>

                    <Link className="profiletemplate_div_last_toolbox_link" to='/my_referrals' >
                        <ImUsers className="profiletemplate_div_last_toolbox_link_ic" />
                        <span className="profiletemplate_div_last_toolbox_link_span" > Referals </span>
                    </Link>

                    <Link className="profiletemplate_div_last_toolbox_link" to='/profile/myorders' >
                        <FaTruck className="profiletemplate_div_last_toolbox_link_ic" />
                        <span className="profiletemplate_div_last_toolbox_link_span" > My Orders </span>
                    </Link>

                    <div className="profiletemplate_div_last_toolbox_link" onClick={() => setopenSlider(true)} to='/mypendingservices' >
                        <FaBell className="profiletemplate_div_last_toolbox_link_ic" />
                        <span className="profiletemplate_div_last_toolbox_link_span" > Notifications </span>
                            { context.Unread_Notification_List ? 
                                context.Unread_Notification_List.length > 0 ?
                                <div className="profiletemplate_div_last_toolbox_link_badge" ></div>

                                : null

                            : null}
                    </div>

                    <div style={{ border:'1px solid lightgray',margin:'1rem auto' , width:'80%' }} ></div>


                    <Link className="profiletemplate_div_last_toolbox_link" to='/profile/my_products' >
                        <GiShop className="profiletemplate_div_last_toolbox_link_ic" />
                        <span className="profiletemplate_div_last_toolbox_link_span" > My Store </span>
                    </Link>

                    <Link className="profiletemplate_div_last_toolbox_link" to='/mypendingproducts' >
                        <FaTruck className="profiletemplate_div_last_toolbox_link_ic" />
                        <span className="profiletemplate_div_last_toolbox_link_span" > My Products Ordered </span>
                    </Link>

                    <div style={{ border:'1px solid lightgray',margin:'1rem auto' , width:'80%' }} ></div>

                        <Link className="profiletemplate_div_last_toolbox_link" to='/myservices' >
                            <FaHandsHelping className="profiletemplate_div_last_toolbox_link_ic" />
                            <span className="profiletemplate_div_last_toolbox_link_span" > My Services </span>
                        </Link>

                        <Link className="profiletemplate_div_last_toolbox_link" to='/mypendingservices' >
                            <FaBriefcase className="profiletemplate_div_last_toolbox_link_ic" />
                            <span className="profiletemplate_div_last_toolbox_link_span" > My Services Ordered </span>
                        </Link>

                    <div style={{ border:'1px solid lightgray',margin:'1rem auto' , width:'80%' }} ></div>

                    <Link className="profiletemplate_div_last_toolbox_link" to='#' onClick={ props.logout_btn } >
                        <FaDoorOpen className="profiletemplate_div_last_toolbox_link_ic" />
                        <span className="profiletemplate_div_last_toolbox_link_span" > Log Out </span>
                    </Link>

                </div>

          </div>





          <div className="profiletemplate_mobile_slider" style={{
              transform: openSlider ? 'translateX(0)' : 'translateX(100%)'
          }} >
                <div className="profile_header" style={{
                    position:'fixed',
                    top:'0',
                    left:'0',
                    width:'100%',
                    boxSizing:'border-box'
                }} >
                    
                    <div className="profile_header_logo" >
                            <BsFillCaretLeftFill className="profile_header_logo_back" onClick={ () => setopenSlider(false) }  />
                    </div>

                    <div className="profile_header_mid" >
                            Notifications
                    </div>


                    <div className="profile_header_cart" >

                    </div>

                </div>

                <div style={{
                    paddingTop:'7rem'
                }} >

<NotificationList evry={props.evry} />

                </div>

          </div>


          </>
      );

}

export default ProfileHomeTemplates;