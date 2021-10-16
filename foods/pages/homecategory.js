import React,{useState,useEffect} from 'react';
import LoadingPage from '../components/loading/loading';
import OppsPage from '../components/oppspage/oppspage';
import Axios from 'axios';
import { ProductList,NormalLayout } from '../components/productlistcomponents';
import { EmptyProduct } from '../components/empty/no_product';
import { Link } from 'react-router-dom';
import BtnSpin from '../../component/utilities/btnSpin/btnSpin';
// import { BsArrowRightShort } from 'react-icons/bs';
// import {Link} from 'react-router-dom';


const CategoryHomePage = (props) => {

    const CategoryQuery = props.match.params.id

    const [ Allproduct , setAllproduct ] = useState(null)
    const [ Errorpage , setErrorpage ] = useState(false)
    const [ Loading , setLoading ] = useState(false)
    const [ Stop , setStop ] = useState(24)
    const [ StopLoading , setStopLoading ] = useState(false)
    // const [ productcount , setproductcount ] = useState({
    //     count:null,
    //     previous:null,
    //     next:null
    // })




    useEffect( () => {

        setErrorpage(false)
        setLoading(true)

        Axios.get('/myproducts/category/' + CategoryQuery + '/' ).then(

            response => {
                setAllproduct(response.data.myproducts)
                setErrorpage(false)
                setLoading(false)
                // setproductcount({
                //     count:response.data.count,
                //     previous:response.data.previous,
                //     next:response.data.next
                // })
            }

        ).catch(
            e => {
                setErrorpage(true)
                setLoading(false)        
            }
        )

    },[CategoryQuery] )











    if ( Allproduct ) {
        
        var prideit = []

        if ( Allproduct.length < 24 ) {
            var high = Allproduct.length
        }else{
            high = Stop
        }

        for (let z = 0; z < high; z++) {
            
            prideit.push(Allproduct[z])
            
        }

    }




    const Checking = () => {

        var newStop = Stop + 24

        setStopLoading(true)

        if ( newStop > Allproduct.length ) {

            setTimeout(() => {
                setStopLoading(false)
                SetitLikeThat(Allproduct.length)
            }, 3000);

        }else{

            setTimeout(() => {
                setStopLoading(false)
                SetitLikeThat(newStop)
            }, 3000);

        }

    }

    const SetitLikeThat = (number) => {

        setStop(number)

    }












    const gogo = () => {
        props.history.go()
    } 

    const goBack = () => {
        props.history.goBack()
    }

    
    if ( !Allproduct && !Errorpage && Loading ) {
        var todisplay = <LoadingPage/>
    }else{
        if ( !Allproduct && Errorpage && !Loading ) {
            todisplay = <OppsPage tryagain={gogo} goback={goBack} />
        }else{
            if ( Allproduct && !Errorpage && !Loading ) {
                 todisplay = <>

                            <NormalLayout>
                            
                                { Allproduct.length > 0 ? <>

                                    { prideit.map( ( product , index ) => {

                                        return (
                                            <ProductList
                                                key={index}
                                                productname={product.myproduct_name}
                                                img={product.product_img1}   
                                                price={product.selling_price}
                                                avg_rating={product.avg_rating}
                                                to={'/retail/product/' + product.slug + '/' + product.id}
                                                scale={product.scale}
                                            />
                                        );

                                    } ) }

                                </> : <EmptyProduct /> }

                            </NormalLayout>

                            <div className="pagination-div" >
                                
                                {/* <Link className="pagination-div-link pagination-div-link2" to={'/'} > <BsArrowLeftShort className="pagination-div-link2-ic" /> Previous page </Link> */}
                                
                                { Stop < Allproduct.length && Stop !== Allproduct.length ? <button className="pagination-div-link" 
                                // to={'/retail/search/query/' + Query + '/1'}
                                 onClick={ () => Checking() } > { StopLoading ? <BtnSpin bgColor="white"/> : 'Load More' } </button> : '' }

                            </div>

                 </>
            }
        }  
    }

    return (
            <>

                {todisplay}

            </>
    );
}

export default CategoryHomePage;