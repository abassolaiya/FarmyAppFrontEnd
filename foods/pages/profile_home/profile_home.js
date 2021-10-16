import React,{useContext,useState,useEffect} from 'react';
import ProfileHomeTemplates from './profile_home_templates';
import ProfileHeader from '../../layout_components/profile_header/profile_header';
import Store from '../../../store/managementstore/managementstore';
import Axios from 'axios';
import LoadingPage from '../../components/loading/loading';
import OppsPage from '../../components/oppspage/oppspage';
import BtnSpin from '../../../component/utilities/btnSpin/btnSpin';


const ProfileHome = (props) => {

  const context = useContext(Store)

  const [ Loadingpage , setLoadingpage ] = useState(false)
  const [ Errorpage , setErrorpage ] = useState(false)
  const [ MyOrders , setMyOrders ] = useState(null)
  const [ UserProfile , setUserProfile ] = useState(null)
  const [ UserProfile2 , setUserProfile2 ] = useState(null)

  useEffect( () => {
    setLoadingpage(true)
    setErrorpage(false)
    var user_id = context.User_id;

    if ( user_id !== null ) {
      getUserdetails(user_id)
    }

    // Axios.get('/myorder/myorder/').then(

    //   response => {
    //     setMyOrders(response.data.results)
    //     setErrorpage(false)
    //     setLoadingpage(false)
    //   }

    // ).catch(
    //   e => {
    //     setErrorpage(true)
    //     setLoadingpage(false)
    //     setUserProfile(null)
    //   }
    // )


  }, [context.User_id] )

  const getUserdetails = (user_id) => {

    Axios.get('/account/users/' + user_id + '/').then(
      response => {
        var userdata = response.data

        Axios.get('/account/userpro/' + user_id + '/').then(
          response => {
            setUserProfile2(response.data.pro)
            setUserProfile(userdata)
            setErrorpage(false)
            setLoadingpage(false)  
            setMyOrders(userdata.myorder)
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


  const logout = (props) => {
    context.Logouthandler()
    props.history.push('/retail/signin')
  }

  // if( !context.User_token ){
  //   props.history.push('/signin')
  // }



  const gogo = () => {
    props.history.go()
  } 

  const goBack = () => {
    props.history.goBack()
  }


  if( Loadingpage && !UserProfile && !UserProfile2 && !Errorpage ){
    var what_to_return = <LoadingPage/>
  }else{
    if ( !Loadingpage && Errorpage && !UserProfile && !UserProfile2 ) {
      what_to_return = <OppsPage tryagain={gogo} goback={goBack} />
    }else{
      if ( !Loadingpage && !Errorpage && UserProfile && UserProfile2 ) {
        what_to_return = <ProfileHomeTemplates
                            first_name={UserProfile.first_name}
                            last_name={UserProfile.last_name}
                            referee={UserProfile.referees}
                            my_orders={ MyOrders ? MyOrders : <BtnSpin bgColor="gray" /> }
                            logout_btn={ () => logout(props)}
                            evry={props}
                            profile_img={ UserProfile2.profile_picture ? UserProfile2.profile_picture : null }
                          />
      }
    }
  }


      return ( 
          <>

            <ProfileHeader
              title="My Profile"
              goback={ goBack }
            />

            {what_to_return}

          </>
      );

}

export default ProfileHome;