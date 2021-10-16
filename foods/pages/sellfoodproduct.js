import React, { useContext, useEffect, useState } from 'react';
import { AiFillFileImage } from 'react-icons/ai';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { store } from 'react-notifications-component';
import Axios from 'axios';
import LoadingPage from '../components/loading/loading';
import OppsPage from '../components/oppspage/oppspage';
import { useVerifyimg } from '../components/checkingforletter';
import Store from "../../store/managementstore/managementstore";

const SellFoodProduct = (props) => {

    const context = useContext(Store)

    const [ Errorpage , setErrorpage ] = useState(false)
    const [ Loading , setLoading ] = useState(false)

    const [ addcategory , setaddcategory  ] = useState({
        allow:true,
        value:''
    })

    

    const [ allcategories , setallcategories ] = useState(null)

    const [ Productdetails , setProductdetails ] = useState({

        myproduct_name:'',
        description:'',
        price:'',
        fragile:'',
        carriage:'',
        days_to:'',
        available:true,
        availability:'',
        category:'',
        posting:false,
        scale:'',

        images:{
            image1:{
                preview:null,
                itself:null
            },
            image2:{
                preview:null,
                itself:null
            },
            image3:{
                preview:null,
                itself:null
            }
        }
    })


    useEffect( () => {

        
        setErrorpage(false)
        setLoading(true)


        Axios.get('/myproducts/category/?limit=1000&offset=0').then(

            response => {

                setallcategories(response.data.results)
                setLoading(false)
                setErrorpage(false)

            }

        ).catch(

            e => {

                setLoading(false)
                setErrorpage(true)

            }

        )

    } , [] )


    // Adding New Category Handler

    const AddingNewCategoryHandler = (e) => {

        e.preventDefault()

        setaddcategory({
            ...addcategory,
            allow:false
        })

        if ( addcategory.value === '' ) {
            store.addNotification({
                title: "Error",
                message: "Category Cannot Be Empty",
                type: "danger",
                insert: "top",
                container: "top-left",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                // dismiss: {
                //   duration: 5000,
                //   onScreen: true
                // }
              });
              setaddcategory({
                ...addcategory,
                allow:true
            })
        }else{

            Axios.post('/myproducts/category/',{category_name:addcategory.value}).then(

                response => {
                    setaddcategory({
                        ...addcategory,
                        allow:true
                    })

                    setallcategories( currentt => [ ...currentt , response.data ] )
                    store.addNotification({
                        title: "Success",
                        message: " The New Category Was Successfully Added ",
                        type: "success",
                        insert: "top",
                        container: "top-left",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        // dismiss: {
                        //   duration: 5000,
                        //   onScreen: true
                        // }
                      });
                      setaddcategory({
                        ...addcategory,
                        allow:true
                    })

                }

            ).catch(

                e => {

                    store.addNotification({
                        title: "Error",
                        message: " We Encountered an error while trying to add a new category ",
                        type: "danger",
                        insert: "top",
                        container: "top-left",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        // dismiss: {
                        //   duration: 5000,
                        //   onScreen: true
                        // }
                      });
                      setaddcategory({
                        ...addcategory,
                        allow:true
                    })

                }

            )

        }

    }






    // Picking Product Image

    
    const Pickingimage = (event,number) =>{
      
        const [ result ] = useVerifyimg(event.target.files)
  
        if( result ){
  
          const currentfile = event.target.files[0] 
          const reader = new FileReader()
          reader.addEventListener("load",()=>{
              if(number === 1){
                  setProductdetails({...Productdetails,
                    images:{
                        ...Productdetails.images,
                        image1:{
                            preview:reader.result,
                            itself:currentfile
                        }
                    }
                    })
              }
              if(number === 2){
                    setProductdetails({...Productdetails,
                        images:{
                            ...Productdetails.images,
                            image2:{
                                preview:reader.result,
                                itself:currentfile
                            }
                        }
                        })
              }
              if(number === 3){
                    setProductdetails({...Productdetails,
                        images:{
                            ...Productdetails.images,
                            image3:{
                                preview:reader.result,
                                itself:currentfile
                            }
                        }
                        })
              }
          },false)
  
          reader.readAsDataURL(currentfile)
  
        }else{

            store.addNotification({
                title: "Error",
                message: " only jpg , jpeg , png and gif files are allowed  .... ",
                type: "danger",
                insert: "top",
                container: "top-left",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                // dismiss: {
                //   duration: 5000,
                //   onScreen: true
                // }
              });
              setaddcategory({
                ...addcategory,
                allow:true
            })
        }
  
      }
  
  



















    //   Posting Products

    const PostingTheProduct = () => {

        setProductdetails({
            ...Productdetails,
            posting:true
        })

        if ( 

            Productdetails.myproduct_name === '' ||
            Productdetails.price === '' ||
            Productdetails.description === '' ||
            Productdetails.fragile === '' ||
            Productdetails.days_to === '' ||
            Productdetails.category === '' ||
            Productdetails.carriage === '' ||
            Productdetails.available === '' ||
            Productdetails.availability === '' ||
            Productdetails.scale === '' ||
            Productdetails.images.image1.itself === null

         ) {
            
            store.addNotification({
                title: "Error",
                message: " All Fields Must Be Filled... ",
                type: "danger",
                insert: "top",
                container: "top-left",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                // dismiss: {
                //   duration: 5000,
                //   onScreen: true
                // }
              });

              setProductdetails({
                ...Productdetails,
                posting:false
            })

        }

        else{

            var newprice = parseInt(Productdetails.price)
            

            const Datatosubmit = new FormData();

            Datatosubmit.append('myproduct_name',Productdetails.myproduct_name)
            Datatosubmit.append('description',Productdetails.description)
            Datatosubmit.append('price',newprice)
            Datatosubmit.append('fragile',Productdetails.fragile)
            Datatosubmit.append('product_img1',Productdetails.images.image1.itself,Productdetails.images.image1.itself.name)
    
            if ( Productdetails.images.image2.itself ) {
              Datatosubmit.append('product_img2',Productdetails.images.image2.itself,Productdetails.images.image2.itself.name)
            }

            if ( Productdetails.images.image3.itself ) {
                Datatosubmit.append('product_img3',Productdetails.images.image3.itself,Productdetails.images.image3.itself.name)
              }

    
            Datatosubmit.append('carriage',Productdetails.carriage)        
            Datatosubmit.append('category',Productdetails.category)        
            Datatosubmit.append('available',true)
            Datatosubmit.append('availability',Productdetails.availability)
            Datatosubmit.append('scale',Productdetails.scale)
            Datatosubmit.append('days_to',Productdetails.days_to)
            Datatosubmit.append('user',context.User_id)

            Axios.post('/myproducts/myproduct/',Datatosubmit).then(

                response => {

                    store.addNotification({
                        title: "Success",
                        message: " Product Was Successfully Posted ",
                        type: "success",
                        insert: "top",
                        container: "top-left",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        dismiss: {
                          duration: 5000,
                          onScreen: true
                        }
                      });

                      setProductdetails({
                        myproduct_name:'',
                        description:'',
                        price:'',
                        fragile:'',
                        carriage:'',
                        days_to:'',
                        available:true,
                        availability:'',
                        category:'',
                        posting:false,
                        scale:'',
                
                        images:{
                            image1:{
                                preview:null,
                                itself:null
                            },
                            image2:{
                                preview:null,
                                itself:null
                            },
                            image3:{
                                preview:null,
                                itself:null
                            }
                        }
                    })

                }

            ).catch(

                e => {
                    store.addNotification({
                        title: "Error",
                        message: " Sorry For The Inconvinience , Something Went Wrong ",
                        type: "danger",
                        insert: "top",
                        container: "top-left",
                        animationIn: ["animate__animated", "animate__fadeIn"],
                        animationOut: ["animate__animated", "animate__fadeOut"],
                        // dismiss: {
                        //   duration: 5000,
                        //   onScreen: true
                        // }
                      });
                    setProductdetails({
                        ...Productdetails,
                        posting:false
                    })
                }

            )


        }

    }











    const gogo = () => {
        props.history.go()
    } 

    const goBack = () => {
        props.history.goBack()
    }

    
    if ( !allcategories && !Errorpage && Loading ) {
        var todisplay = <LoadingPage/>
    }else{
        if ( !allcategories && Errorpage && !Loading ) {
            todisplay = <OppsPage tryagain={gogo} goback={goBack} />
        }else{
            if ( allcategories && !Errorpage && !Loading ) {
                 todisplay = <>



                                <div className="retailproductsellipage" >

                                    <div className="retailproductsellipage-product" >

                                        <div className="retailproductsellipage-product-ibox" >
                                            <Carousel
                                                // autoPlay={true}
                                                // interval="2000"
                                                // infiniteLoop={true}
                                                useKeyboardArrows={true}
                                                emulateTouch={true}
                                                showStatus={false}
                                                showThumbs={false}
                                                className="retailproductsellipage-product-ibox-top"
                                            >

                                                <div className="retailproductsellipage-product-ibox-top-img" >
                                                    <label className="retailproductsellipage-product-ibox-top-img-label" for="init" >
                                                        { Productdetails.images.image1.itself && Productdetails.images.image1.preview ? 
                                                        
                                                            <img className="retailproductsellipage-product-ibox-top-img-img" src={Productdetails.images.image1.preview} alt="" />

                                                        : 
                                                            <>
                                                                <AiFillFileImage className="retailproductsellipage-product-ibox-top-img-label-ic" />
                                                                <div className="retailproductsellipage-product-ibox-top-img-label-txt" > Primary Image </div>
                                                            </>
                                                        }
                                                    </label>
                                                    <input type="file" className="retailproductsellipage-product-ibox-top-img-input" id="init" onChange={(event) => Pickingimage(event,1)} /> 
                                                </div>

                                                <div className="retailproductsellipage-product-ibox-top-img" >
                                                    <label className="retailproductsellipage-product-ibox-top-img-label" for="init2" >
                                                        { Productdetails.images.image2.itself && Productdetails.images.image2.preview ? 
                                                        
                                                            <img className="retailproductsellipage-product-ibox-top-img-img" src={Productdetails.images.image2.preview} alt="" />

                                                        : 
                                                            <>
                                                                <AiFillFileImage className="retailproductsellipage-product-ibox-top-img-label-ic" />
                                                                <div className="retailproductsellipage-product-ibox-top-img-label-txt" > Secoundry Image </div>
                                                            </> 
                                                        }
                                                    </label>
                                                    <input type="file" className="retailproductsellipage-product-ibox-top-img-input" id="init2" onChange={(event) => Pickingimage(event,2)} /> 
                                                </div>

                                                <div className="retailproductsellipage-product-ibox-top-img" >
                                                    <label className="retailproductsellipage-product-ibox-top-img-label" for="init3" >
                                                        { Productdetails.images.image3.itself && Productdetails.images.image3.preview ? 
                                                        
                                                            <img className="retailproductsellipage-product-ibox-top-img-img" src={Productdetails.images.image3.preview} alt="" />

                                                        : 
                                                            <>
                                                                <AiFillFileImage className="retailproductsellipage-product-ibox-top-img-label-ic" />
                                                                <div className="retailproductsellipage-product-ibox-top-img-label-txt" > Tatiary Image </div>
                                                            </>
                                                        }
                                                    </label> 
                                                    <input type="file" className="retailproductsellipage-product-ibox-top-img-input" id="init3" onChange={(event) => Pickingimage(event,3)} /> 
                                                </div>
                               
                                            </Carousel>
                                        </div>

                                        <div className="retailproductsellipage-product-pdet" >

                                            <div className="retailproductsellipage-product-pdet-name" >
                                                <label className="retailproductsellipage-product-pdet-name-label" >
                                                    Product Name
                                                </label>
                                                <input type="text" value={ Productdetails.myproduct_name } onChange={ (event) => setProductdetails({
                                                    ...Productdetails,
                                                    myproduct_name:event.target.value
                                                })  } className="retailproductsellipage-product-pdet-name-input" />
                                            </div>

                                            <div className="retailproductsellipage-product-pdet-dec" >
                                                <label className="retailproductsellipage-product-pdet-dec-label" > Product Description </label>
                                                <textarea className="retailproductsellipage-product-pdet-dec-input" value={ Productdetails.description } onChange={ (event) => setProductdetails({
                                                    ...Productdetails,
                                                    description:event.target.value
                                                })  } >

                                                </textarea>
                                            </div>

                                            <div style={{
                                                display:'flex',
                                                justifyContent:'space-evenly',
                                                alignItems:'center'
                                            }} >

                                            <div className="retailproductsellipage-product-pdet-dec" >
                                                <label className="retailproductsellipage-product-pdet-name-label" >
                                                    Price
                                                </label>
                                                <input type="text" className="retailproductsellipage-product-pdet-name-input" 
                                                        value={Productdetails.price}
                                                        onChange={ (event) => setProductdetails({
                                                        ...Productdetails,
                                                        price:event.target.value})  } 
                                                    style={{
                                                    width:'9rem'
                                                }} />
                                            </div>

                                            <div className="retailproductsellipage-product-pdet-dec" >
                                                <label className="retailproductsellipage-product-pdet-name-label" >
                                                    Scale
                                                </label>
                                                <input type="text" className="retailproductsellipage-product-pdet-name-input" 
                                                        value={Productdetails.scale}
                                                        onChange={ (event) => setProductdetails({
                                                        ...Productdetails,
                                                        scale:event.target.value})  } 
                                                    style={{
                                                    width:'9rem'
                                                }} />
                                            </div>

                                            </div>

                                            <div style={{
                                                display:'flex',
                                                justifyContent:'space-evenly',
                                                alignItems:'center'
                                            }} >

                                            <div className="retailproductsellipage-product-pdet-dec" >
                                                
                                                <label className="retailproductsellipage-product-pdet-name-label" >
                                                    Category
                                                </label>

                                                <select className="retailproductsellipage-product-pdet-name-select" onChange={ (event) => setProductdetails({
                                                            ...Productdetails,
                                                            category:event.target.value
                                                        }) } >

                                                    { allcategories ? 
                                                    
                                                        allcategories.map( ( cat,index ) => <option key={index} value={ cat.id }> {cat.category_name} </option> )

                                                    : null }

                                                </select>

                                            </div>

                                            <div className="retailproductsellipage-product-pdet-dec" >
                                                
                                                <label className="retailproductsellipage-product-pdet-name-label" >
                                                    Fragile
                                                </label>

                                                <select className="retailproductsellipage-product-pdet-name-select" onChange={ (event) => setProductdetails({
                                                            ...Productdetails,
                                                            fragile:event.target.value
                                                        }) } >

                                                    <option value="" > Fragile </option>
                                                    <option value="unknown" > Unknown </option>
                                                    <option value="yes" > Yes </option>
                                                    <option value="no" > No </option>

                                                </select>

                                            </div>

                                            </div>

                                            <div style={{
                                                display:'flex',
                                                justifyContent:'space-evenly',
                                                alignItems:'center'
                                            }} >

                                            <div className="retailproductsellipage-product-pdet-dec" >
                                                
                                                <label className="retailproductsellipage-product-pdet-name-label" >
                                                    Carriage
                                                </label>

                                                <select className="retailproductsellipage-product-pdet-name-select" onChange={ (event) => setProductdetails({
                                                            ...Productdetails,
                                                            carriage:event.target.value
                                                        }) } >

                                                    <option value="" > Carriage </option>
                                                    <option value="small" > Small </option>
                                                    <option value="large" > Large </option>
                                                    <option value="xlarge" > XLarge </option>

                                                </select>

                                            </div>

                                            <div className="retailproductsellipage-product-pdet-dec" >
                                                
                                                <label className="retailproductsellipage-product-pdet-name-label" >
                                                    Availability
                                                </label>

                                                <select className="retailproductsellipage-product-pdet-name-select" onChange={ (event) => setProductdetails({
                                                            ...Productdetails,
                                                            availability:event.target.value
                                                        }) } >

                                                    <option value="" > Availability </option>
                                                    <option value="common" > Common </option>
                                                    <option value="highend" > Highend </option>
                                                    <option value="scarce" > Scarce </option>

                                                </select>

                                            </div>

                                            </div>

                                            <div className="retailproductsellipage-product-pdet-dec" >
                                                <label className="retailproductsellipage-product-pdet-name-label" >
                                                    Days To
                                                </label>
                                                <input type="number" className="retailproductsellipage-product-pdet-name-input" value={Productdetails.days_to} onChange={ (event) => setProductdetails({
                                                            ...Productdetails,
                                                            days_to:event.target.value
                                                        }) } style={{
                                                    width:'9rem'
                                                }} />
                                            </div>

                                            <div className="retailproductsellipage-product-pdet-specs" >
                                                {/* <label className="retailproductsellipage-product-pdet-name-label" >
                                                    Specs
                                                </label>

                                                <div className="retailproductsellipage-product-pdet-specs-div" >
                                                    <input type="text" placeholder="Title" className="retailproductsellipage-product-pdet-specs-div-input" />
                                                    :
                                                    <input type="text" placeholder="Response" className="retailproductsellipage-product-pdet-specs-div-input" />
                                                    <button className="retailproductsellipage-product-pdet-specs-div-btn" >
                                                        <AiFillDelete className="retailproductsellipage-product-pdet-specs-div-btn-ic" />
                                                    </button>
                                                </div> */}

                                                {/* <button className="retailcartpage-btm-link" style={{
                                                    marginTop:'2rem'
                                                }} >
                                                    Add Specs
                                                </button> */}

                                                <button className="retailcartpage-btm-link" disabled={Productdetails.posting} onClick={ PostingTheProduct } style={{
                                                    marginTop:'2rem'
                                                }} >
                                                    Post Product
                                                </button>

                                            </div>

                                        </div>

                                        <div className="retailproductsellipage-product-addcat" >
                                            <div className="retailproductsellipage-product-addcat-top" > Add Category </div>

                                            <form className="retailproductsellipage-product-addcat-form" onSubmit={ AddingNewCategoryHandler } >
                                                <input 
                                                    className="retailproductsellipage-product-addcat-form-input" 
                                                    value={addcategory.value} 
                                                    onChange={ (event) => setaddcategory({...addcategory,value:event.target.value}) } />
                                                <button className="retailproductsellipage-product-addcat-form-btn" > Add </button>
                                            </form>

                                        </div>

                                    </div>

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

export default SellFoodProduct;