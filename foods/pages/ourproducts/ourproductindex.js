import React,{useState,useEffect} from 'react';
import { EditProductList } from '../../components/productlistcomponents';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import OppsPage from '../../components/oppspage/oppspage';
import LoadingPage from '../../components/loading/loading';
import {BsArrowRightShort} from 'react-icons/bs'; 
import { EmptyProduct } from '../../components/empty/no_product';

const Ourproductindex = (props) => {

    const [ Allproduct , setAllproduct ] = useState(null)
    const [ Errorpage , setErrorpage ] = useState(false)
    const [ Loading , setLoading ] = useState(false)
    const [ productcount , setproductcount ] = useState({
        count:null,
        previous:null,
        next:null
    })

    useEffect( () => {

        setErrorpage(false)
        setLoading(true)

        Axios.get('/myproducts/allproduct/').then(

            response => {
                setAllproduct(response.data.results)
                setErrorpage(false)
                setLoading(false)
                setproductcount({
                    count:response.data.count,
                    previous:response.data.previous,
                    next:response.data.next
                })
            }

        ).catch(
            e => {
                setErrorpage(true)
                setLoading(false)        
            }
        )

    },[] )

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
                            
                            { Allproduct.length > 0 ? <>

                                { Allproduct.map( ( product , index ) => {

                                    return (
                                        <EditProductList
                                            key={index}
                                            productname={product.myproduct_name}
                                            img={product.product_img1}
                                            price={product.selling_price}
                                            avg_rating={product.avg_rating}
                                            to={'/retail/productedit/product/' + product.slug + '/' + product.id}
                                        />
                                    );

                                } ) }

                            </> : <EmptyProduct/> }

                            <div className="pagination-div" >
                                
                                {/* <Link className="pagination-div-link pagination-div-link2" to={'/'} > <BsArrowLeftShort className="pagination-div-link2-ic" /> Previous page </Link> */}
                                
                                { productcount.next ? <Link className="pagination-div-link" to={'/retail/productedit/24' } > Next page <BsArrowRightShort className="pagination-div-link-ic" /> </Link> : '' }

                            </div>

                 </>
            }
        }  
    }



    return (
            <>

                <div className="catlayout-div-btm">
                    {todisplay}
                </div>

            </>
    );
}

export default Ourproductindex;