import React,{useState,useEffect} from 'react';
import LoadingPage from '../../components/loading/loading';
import OppsPage from '../../components/oppspage/oppspage';
import Axios from 'axios';
import { EditProductList,NormalLayout } from '../../components/productlistcomponents';
import { EmptyProductSearch } from '../../components/empty/no_product';
import { BsArrowRightShort } from 'react-icons/bs';
import {Link} from 'react-router-dom';


const OurSearchRetailProduct = (props) => { 

    const Query = props.match.params.query

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

        Axios.get('/myproducts/allproduct/?search=' + Query ).then(

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

    },[Query] )



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

                                </> : <EmptyProductSearch query={Query} /> }

                            </NormalLayout>

                            <div className="pagination-div" >
                                
                                {/* <Link className="pagination-div-link pagination-div-link2" to={'/'} > <BsArrowLeftShort className="pagination-div-link2-ic" /> Previous page </Link> */}
                                
                                { productcount.next ? <Link className="pagination-div-link" to={'/retail/oursearch/query/' + Query + '/24'} > Next page <BsArrowRightShort className="pagination-div-link-ic" /> </Link> : '' }

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

export default OurSearchRetailProduct;