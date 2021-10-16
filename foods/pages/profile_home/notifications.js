import React,{useContext} from 'react';
import Store from "../../../store/managementstore/managementstore";
import NotiImg from "../../../component/utilities/notificationEmpty.png"; 
import {FaPen, FaQuestion} from 'react-icons/fa';
import {BiChat} from 'react-icons/bi';
import Axios from 'axios';

const NotificationList = (props) => {

    const evry = props.evry

    const context = useContext(Store)
    
    
      if( context.Notification_List ){

        if ( context.Notification_List.length > 0 ) {
            
            var what_to_show = <> 

                    { context.Notification_List.map( ( noti , index ) => {

                        if( noti.verb === ' answered your question ' ){

                            return <div className="notificationlist-link" key={index} onClick={ () => changeStatus(noti) } style={{
                                backgroundColor: noti.read ? '' : 'lightgray'
                            }}  >
                                        <div style={{
                                            display:'flex',
                                            alignItems:'center'
                                        }} >
                                            <div className="notificationlist-link-img" >
                                                <FaPen className="notificationlist-link-img-ic" />
                                            </div>
                                            <div className="notificationlist-link-txt" > Someone Attempted To Answer Your Question </div>
                                        </div>
                                            {/* <div className="notificationlist-link-time" > {noti.} </div> */}
                                    </div>

                        }

                        if( noti.verb === ' replied your answer ' ){

                            return <div className="notificationlist-link" key={index} onClick={ () => changeStatus(noti) } style={{
                                backgroundColor: noti.read ? '' : 'lightgray'
                            }}  >
                                        <div style={{
                                            display:'flex',
                                            alignItems:'center'
                                        }} >
                                            <div className="notificationlist-link-img" >
                                                <BiChat className="notificationlist-link-img-ic" />
                                            </div>
                                            <div className="notificationlist-link-txt" > Someone Replied To Your Answer </div>
                                        </div>
                                            {/* <div className="notificationlist-link-time" > {noti.} </div> */}
                                    </div>

                        }

                        if( noti.verb === ' needs clearification on your question '  ){

                            return <div className="notificationlist-link" key={index} onClick={ () => changeStatus(noti) } style={{
                                backgroundColor: noti.read ? '' : 'lightgray'
                            }}  >
                                        <div style={{
                                            display:'flex',
                                            alignItems:'center'
                                        }} >
                                            <div className="notificationlist-link-img" >
                                                <FaQuestion className="notificationlist-link-img-ic" />
                                            </div>
                                            <div className="notificationlist-link-txt" > Someone Needs Clearification On Your Question  </div>
                                        </div>
                                            {/* <div className="notificationlist-link-time" > {noti.} </div> */}
                                    </div>

                        }

                        if( noti.verb === ' replied your comment ' ){

                            return <div className="notificationlist-link" key={index} onClick={ () => changeStatus(noti) } style={{
                                backgroundColor: noti.read ? '' : 'lightgray'
                            }}  >
                                        <div style={{
                                            display:'flex',
                                            alignItems:'center'
                                        }} >
                                            <div className="notificationlist-link-img" >
                                                <BiChat className="notificationlist-link-img-ic" />
                                            </div>
                                            <div className="notificationlist-link-txt" > Someone Replied Your Comment  </div>
                                        </div>
                                            {/* <div className="notificationlist-link-time" > {noti.} </div> */}
                                    </div>

                        }

                        if( noti.verb === ' commented on your product ' ){

                            return <div className="notificationlist-link" key={index} onClick={ () => changeStatus(noti) } style={{
                                backgroundColor: noti.read ? '' : 'lightgray'
                            }}  >
                                        <div style={{
                                            display:'flex',
                                            alignItems:'center'
                                        }} >
                                            <div className="notificationlist-link-img" >
                                                <img className="notificationlist-link-img-img" alt="" src={noti.target.product_img1} />
                                            </div>
                                            <div className="notificationlist-link-txt" > Someone Commented On Your Product </div>
                                        </div>
                                            {/* <div className="notificationlist-link-time" > {noti.} </div> */}
                                    </div>

                        }
                        
                        else{
                            return <> </>
                        }

                    } ) }

            </>

        }else{

        what_to_show =<div className="profiletemplate_div_middle_main_empty" >
                            <img src={NotiImg} alt="" className="profiletemplate_div_middle_main_empty_img" />
                            <div className="profiletemplate_div_middle_main_empty_text" > No Notifications </div>
                        </div>
        }


      }else{
          what_to_show =<div className="profiletemplate_div_middle_main_empty" >
                            <img src={NotiImg} alt="" className="profiletemplate_div_middle_main_empty_img" />
                            <div className="profiletemplate_div_middle_main_empty_text" > No Notifications </div>
                        </div>
      }


      const changeStatus = (noti) => {

        Axios.patch('/notification/action/' + noti.id + '/' , {read:true} ).then(

            response => {

                context.Refresh_Notification()
                
                if( noti.verb === ' answered your question ' || noti.verb === ' replied your answer ' || noti.verb === ' needs clearification on your question ' ){
                    
                    evry.history.push('/aop/question/' + noti.target.slug + '/' + noti.target.id )

                }

                if( noti.verb === ' commented on your product ' || noti.verb === ' replied your comment ' ){
                    evry.history.push('/product/' + noti.target.slug + '/' + noti.target.id )
                }

            }

        ).catch()

      }


      return ( 

        <>

            {what_to_show}

        </>

      );

}

export default NotificationList;
