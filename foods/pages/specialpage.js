import React,{useState} from 'react';
import { BiArrowBack } from 'react-icons/bi';
import FoodsHome from '.';
import WholesaleFooterdiv from '../../layout/footer/wholesaleFooter';
import FoodHeader from '../layout_components/Foodheader';


const SpecialPage = (props) => {


    const [ searchquery , setsearchquery ] = useState({
        value:'',
    })

    const SearchProductHandler = (e) => {

        e.preventDefault()

        if ( searchquery.value !== '' ) {
            
            props.history.push('/retail/search/query='+searchquery.value )

        }

    }

    return (
            <>
                        <FoodHeader
            searchit={SearchProductHandler}
            searchvalue={searchquery.value}
            searchvalueonchange={(event) => setsearchquery({
                ...searchquery,
                value:event.target.value
            })}
        />

            <FoodsHome/>

            <div className="main_body-back" onClick={ () => props.history.goBack() } >
                <BiArrowBack className="main_body-back-ic" />
            </div>

            <WholesaleFooterdiv/>
            </>
    );
}

export default SpecialPage;