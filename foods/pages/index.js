import React, { useEffect, useState } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { CatLayout, ProductList } from '../components/productlistcomponents';
import { Homeslidercontent , Homeslidercontent2 } from '../components/home_slider_contents';
import Axios from 'axios';
import LoadingPage from '../components/loading/loading';
import OppsPage from '../components/oppspage/oppspage';
import { EmptyProduct } from '../components/empty/no_product';

const FoodsHome = (props) => {

    const [ Errorpage , setErrorpage ] = useState(false)
    const [ Loading , setLoadingpage ] = useState(false)
    const [ categoryall , setcategoryall ] = useState(null)

    useEffect( () => {

        setLoadingpage(true)
        setErrorpage(false)

        Axios.get('/myproducts/category/?limit=100&offset=0').then(

            response => {

                setcategoryall(response.data.results)
                setErrorpage(false)
                setLoadingpage(false)

            }

        ).catch(
            
            e => {

                setErrorpage(true)
                setLoadingpage(false)

            }

        )

    } , [] )







    const gogo = () => {
        props.history.go()
    } 

    const goBack = () => {
        props.history.goBack()
    }

    
    if ( !categoryall && !Errorpage && Loading ) {
        var todisplay = <LoadingPage/>
    }else{
        if ( !categoryall && Errorpage && !Loading ) {
            todisplay = <OppsPage tryagain={gogo} goback={goBack} />
        }else{
            if ( categoryall && !Errorpage && !Loading ) {


                var newcart = []

                for (let n = 0; n < categoryall.length; n++) {
                    
                    if ( categoryall[n].myproducts.length > 0 ) {
                        newcart.push(categoryall[n])
                    }

                }

                var freshest = []

                for (let y = 0; y < newcart.length; y++) {
                    
                    var bowrrow = []

                    for (let j = 0; j < newcart[y].myproducts.length; j++) {


                        if( newcart[y].myproducts[j].available ){

                            bowrrow.push(newcart[y].myproducts[j])

                        }
                        
                    }

                    freshest.push({id:newcart[y].id,
                                    slug:newcart[y].slug,
                                    category_name:newcart[y].category_name,
                                    myproducts:bowrrow})

                }


                 todisplay = <>
                            
                            { freshest.length > 0 ?  <>

                                { freshest.map( ( category , index ) => {
// 4
                                    if ( category.myproducts.length > 7  ) {
                                        
                                        var products = []
// 5
                                        for (let h = 0; h < 8; h++) {
                                            
                                            products.push(category.myproducts[h])
                                            
                                        }

                                        return (

                                            <CatLayout
                                                category_name={category.category_name}
                                                key={index}
                                                to={'/retail/category/' +  category.id + '/' + category.slug }
                                            >

                                                { products.map( ( product , index ) => {

                                                    return (

                                                        <ProductList
                                                        
                                                            key={index}
                                                            productname={product.myproduct_name}
                                                            // img={product.product_img1}
                                                            price={product.selling_price}
                                                            avg_rating={product.avg_rating}
                                                            to={'/retail/product/' + product.slug + '/' + product.id}
                                                            scale={product.scale}
                                                        />

                                                    );

                                                } ) }

                                            </CatLayout>

                                        );

                                    }

                                    return null

                                } ) }

                            </> : <EmptyProduct/> }

                 </>
            }
        }  
    }








    return (
            <>
                <Carousel
                    autoPlay={true}
                    interval="7000"
                    infiniteLoop={true}
                    useKeyboardArrows={true}
                    emulateTouch={true}
                    showStatus={false}
                    showThumbs={false}
                    className="homitslider-div"
                >

                <Homeslidercontent/>    

                <Homeslidercontent2/> 

                </Carousel>

             {todisplay}

            </>
    );
}

export default FoodsHome;