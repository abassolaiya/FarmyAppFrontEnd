import React, { useContext, useEffect, useState } from 'react';
import { AiFillDelete, AiFillEye, AiFillFileImage } from 'react-icons/ai';
import {Carousel} from 'react-responsive-carousel';
import { store } from 'react-notifications-component';
import Axios from 'axios';
import LoadingPage from '../components/loading/loading';
import OppsPage from '../components/oppspage/oppspage';
import { useVerifyimg } from '../components/checkingforletter';
import Store from "../../store/managementstore/managementstore";

const EditFoodProduct = (props) => {

    const productId = props.match.params.id
    const productSlug = props.match.params.slug
    const context = useContext(Store)

    const [ Errorpage , setErrorpage ] = useState(false)
    const [ Loading , setLoadingpage ] = useState(false)
    const [ product_specs , setproduct_specs ] = useState([
    ])
    const [ addcategory , setaddcategory  ] = useState({
        allow:true,
        value:''
    })

    const [ ratenumber , setratenumber ] = useState(0)

    

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
        gotten:false,
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


    const getcategoryhandler = () => {
        Axios.get('/myproducts/category/?limit=1000&offset=0').then(

          response => {
            setallcategories(response.data.results)
          }

        ).catch(

            e => {

                store.addNotification({
                    title: "Category Notification",
                    message: "Couldn't get all categories",
                    type: "danger",
                    insert: "top",
                    container: "top-left",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                  });

            }

        );
      }
    

    useEffect( () => {

        setErrorpage(false)
        setLoadingpage(true)

        Axios.get('/myproducts/allproduct/' + productId + '/' ).then(

          response => {

            setErrorpage(false)
            setLoadingpage(false)
            getcategoryhandler()
            

            setProductdetails({
                myproduct_name:response.data.myproduct_name,
                description:response.data.description,
                price:response.data.price,
                fragile:response.data.fragile,
                carriage:response.data.carriage,
                days_to:response.data.days_to,
                available:true,
                availability:response.data.availability,
                category:response.data.category,
                posting:false,
                gotten:true,
                scale: response.data.scale,
        
                images:{
                    image1:{
                        preview:response.data.product_img1,
                        itself:null
                    },
                    image2:{
                        preview:response.data.product_img2,
                        itself:null
                    },
                    image3:{
                        preview:response.data.product_img3,
                        itself:null
                    }
                }
            })


          }

        ).catch(
          e => {
            setErrorpage(true)
            setLoadingpage(false)
          }
        )

      } ,[productId,productSlug])





    // Adding New Category Handler

    // const AddingNewCategoryHandler = (e) => {

    //     e.preventDefault()

    //     setaddcategory({
    //         ...addcategory,
    //         allow:false
    //     })

    //     store.addNotification({
    //         title: "Category Notification",
    //         message: " Adding a new category... so please wait cause it might take some while ",
    //         type: "warning",
    //         insert: "top",
    //         container: "top-left",
    //         animationIn: ["animate__animated", "animate__fadeIn"],
    //         animationOut: ["animate__animated", "animate__fadeOut"],
    //         dismiss: {
    //           duration: 5000,
    //           onScreen: true
    //         }
    //       });

    //     if ( addcategory.value === '' ) {
    //         store.addNotification({
    //             title: "Error",
    //             message: "Category Cannot Be Empty",
    //             type: "danger",
    //             insert: "top",
    //             container: "top-left",
    //             animationIn: ["animate__animated", "animate__fadeIn"],
    //             animationOut: ["animate__animated", "animate__fadeOut"],
    //             dismiss: {
    //               duration: 5000,
    //               onScreen: true
    //             }
    //           });
    //           setaddcategory({
    //             ...addcategory,
    //             allow:true
    //         })
    //     }else{

    //         Axios.post('/myproducts/category/',{category_name:addcategory.value}).then(

    //             response => {
    //                 setaddcategory({
    //                     ...addcategory,
    //                     allow:true
    //                 })

    //                 setallcategories( currentt => [ ...currentt , response.data ] )
    //                 store.addNotification({
    //                     title: "Success",
    //                     message: " The New Category Was Successfully Added ",
    //                     type: "success",
    //                     insert: "top",
    //                     container: "top-left",
    //                     animationIn: ["animate__animated", "animate__fadeIn"],
    //                     animationOut: ["animate__animated", "animate__fadeOut"],
    //                     dismiss: {
    //                       duration: 5000,
    //                       onScreen: true
    //                     }
    //                   });
    //                   setaddcategory({
    //                     ...addcategory,
    //                     allow:true
    //                 })

    //             }

    //         ).catch(

    //             e => {

    //                 store.addNotification({
    //                     title: "Error",
    //                     message: " We Encountered an error while trying to add a new category ",
    //                     type: "danger",
    //                     insert: "top",
    //                     container: "top-left",
    //                     animationIn: ["animate__animated", "animate__fadeIn"],
    //                     animationOut: ["animate__animated", "animate__fadeOut"],
    //                     dismiss: {
    //                       duration: 5000,
    //                       onScreen: true
    //                     }
    //                   });
    //                   setaddcategory({
    //                     ...addcategory,
    //                     allow:true
    //                 })

    //             }

    //         )

    //     }

    // }





    const RateproductHandler = (e) => {


        e.preventDefault()

        store.addNotification({
            title: "Rate",
            message: " Rating Product... so please wait cause it might take some while ",
            type: "warning",
            insert: "top",
            container: "top-left",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });

        Axios.post('/myproducts/myproduct/' + productId + '/rate_myproduct/',{stars:ratenumber}).then(

            response => {
                store.addNotification({
                    title: "Success",
                    message: " Product Was Successfully Rated ",
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
            }

        ).catch(
            e => {
                store.addNotification({
                    title: "Error",
                    message: " Something Went Wrong While Rating Product ",
                    type: "danger",
                    insert: "top",
                    container: "top-left",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true
                    }
                  });
            }
        )

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
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
              });
              setaddcategory({
                ...addcategory,
                allow:true
            })
        }
  
      }
  
  








      
    const Changespecstitle = ( index , event ) => {

        var oldspecs = [...product_specs]
        var thatspecs = oldspecs[index]
        thatspecs = {...thatspecs,call:event}
        oldspecs[index] = thatspecs
  
        setproduct_specs([...oldspecs])
  
      }
  
      const Changespecsesponse = ( index , event ) => {
  
        var oldspecs = [...product_specs]
        var thatspecs = oldspecs[index]
        thatspecs = {...thatspecs,response:event}
        oldspecs[index] = thatspecs
  
        setproduct_specs([...oldspecs])
  
      }
  
      const Removespecs = (index,specs) => {
  
        var oldspecs = [...product_specs]
  
  
        if ( oldspecs[index].id ) {
          
          Axios.delete('/myproducts/myspec/' + specs.id + '/' ).then(
  
            response => {
  
              oldspecs.splice(index,1)
              setproduct_specs([...oldspecs])
  
              store.addNotification({
                title: "Specification",
                message: " Specification Was Successfully Removed ",
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
  
            }
  
          ).catch(
              e => {
                store.addNotification({
                    title: "Specs Error",
                    message: " Something Went Wrong When Removing Specs ",
                    type: "danger",
                    insert: "top",
                    container: "top-left",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true
                    }
                  });
              }
          )
  
        }else{
          oldspecs.splice(index,1)
          setproduct_specs([...oldspecs])
  
          store.addNotification({
            title: "Specifications",
            message: " Specifications Was Successfully Removed ",
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
        }
  
  
      }
  
      const savespescs = (index,specs) => {
  
        store.addNotification({
            title: "Specifications",
            message: " please wait ... ",
            type: "warning",
            insert: "top",
            container: "top-left",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
  
        var oldspecs = [...product_specs]
  
        if ( oldspecs[index].id ) {
            Axios.patch('/myproducts/myspec/' + specs.id + '/' , {...oldspecs[index],myproduct:productId,user_id:context.User_id} ).then(
  
              response => {
      
                store.addNotification({
                    title: "Specifications",
                    message: " Specifications Was Successfully Edited ",
                    type: "danger",
                    insert: "top",
                    container: "top-left",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true
                    }
                  });
      
              }
      
            ).catch(
      
              e => {
      
                store.addNotification({
                    title: "Specification Error",
                    message: " Error Went Wrong Editing Specification ",
                    type: "danger",
                    insert: "top",
                    container: "top-left",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true
                    }
                  });
      
              }
      
            )
        }else{
  
          Axios.post('/myproducts/myspec/',{...oldspecs[index],myproduct:productId,user_id:context.User_id}).then(
  
            response => {
              oldspecs[index] = response.data
              setproduct_specs([...oldspecs])
  
              store.addNotification({
                title: "Specifications",
                message: " Specifications Was Successfully Saved ",
                type: "danger",
                insert: "top",
                container: "top-left",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
              });
    
            }
  
          ).catch(
  
            e => {
      
                store.addNotification({
                    title: "Specification Error",
                    message: " Error Went Wrong While Saving Specification ",
                    type: "danger",
                    insert: "top",
                    container: "top-left",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true
                    }
                  });
    
            }
  
          )
  
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
            Productdetails.availability === ''
            // Productdetails.images.image1.itself === null

         ) {
            
            store.addNotification({
                title: "Error",
                message: " All Fields Must Be Filled... ",
                type: "danger",
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

            if ( Productdetails.images.image1.itself ) {
                Datatosubmit.append('product_img1',Productdetails.images.image1.itself,Productdetails.images.image1.itself.name)
              }
            
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
            Datatosubmit.append('available',Productdetails.available)

            Axios.patch('/myproducts/allproduct/' + productId + '/',Datatosubmit).then(

                response => {

                    store.addNotification({
                        title: "Success",
                        message: " Product Was Successfully Updated ",
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

                        ...Productdetails,
                        posting:false

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
                        dismiss: {
                          duration: 5000,
                          onScreen: true
                        }
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

    
    if ( !Productdetails.gotten && !Errorpage && Loading ) {
        var todisplay = <LoadingPage/>
    }else{
        if ( !Productdetails.gotten && Errorpage && !Loading ) {
            todisplay = <OppsPage tryagain={gogo} goback={goBack} />
        }else{
            if ( Productdetails.gotten && !Errorpage && !Loading ) {
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
                                                        { Productdetails.images.image1.preview ? 
                                                        
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
                                                        { Productdetails.images.image2.preview ? 
                                                        
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
                                                        { Productdetails.images.image3.preview ? 
                                                        
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

                                                        <option> Category </option>

                                                    { allcategories ? 
                                                    
                                                        allcategories.map( ( cat,index ) => <option key={index} value={ cat.id }> {cat.category_name} </option> )

                                                    : null }

                                                </select>

                                            </div>

                                            <div className="retailproductsellipage-product-pdet-dec" >
                                                
                                                <label className="retailproductsellipage-product-pdet-name-label" >
                                                    Fragile
                                                </label>

                                                <select className="retailproductsellipage-product-pdet-name-select" value={Productdetails.fragile} onChange={ (event) => setProductdetails({
                                                            ...Productdetails,
                                                            fragile:event.target.value
                                                        }) } >

                                                    <option value="" > Fragile </option>
                                                    <option value="unknown" > Unknown </option>
                                                    <option value="true" > Yes </option>
                                                    <option value="false" > No </option>

                                                </select>

                                            </div>

                                            <div className="retailproductsellipage-product-pdet-dec" >
                                                
                                                <label className="retailproductsellipage-product-pdet-name-label" >
                                                    Available
                                                </label>

                                                <select className="retailproductsellipage-product-pdet-name-select" value={Productdetails.available} onChange={ (event) => setProductdetails({
                                                            ...Productdetails,
                                                            available:event.target.value
                                                        }) } >

                                                    <option value="" > Available </option>
                                                    <option value="true" > Yes </option>
                                                    <option value="false" > No </option>

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

                                                <select className="retailproductsellipage-product-pdet-name-select" value={Productdetails.carriage} onChange={ (event) => setProductdetails({
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

                                                <select className="retailproductsellipage-product-pdet-name-select" value={Productdetails.availability} onChange={ (event) => setProductdetails({
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
                                                <label className="retailproductsellipage-product-pdet-name-label" >
                                                    Specs
                                                </label>

                                                {

                                                    product_specs.map( ( specs , index ) => {

                                                        return      <div className="retailproductsellipage-product-pdet-specs-div" >

                                                                        <input type="text" 
                                                                               placeholder="Title" 
                                                                               className="retailproductsellipage-product-pdet-specs-div-input"
                                                                               onChange={ (event) => Changespecstitle(index,event.target.value) } 
                                                                               value={ specs.call }/>
                                                                        :

                                                                        <input type="text" 
                                                                               placeholder="Response" 
                                                                               className="retailproductsellipage-product-pdet-specs-div-input" 
                                                                               value={ specs.response }
                                                                               onChange={ (event) => Changespecsesponse(index,event.target.value) }/>

                                                                        <button className="retailproductsellipage-product-pdet-specs-div-btn" style={{backgroundColor:'tomato'}} onClick={ () => Removespecs(index,specs) } >
                                                                            <AiFillDelete className="retailproductsellipage-product-pdet-specs-div-btn-ic" />
                                                                        </button>
                                                                        <button className="retailproductsellipage-product-pdet-specs-div-btn" onClick={ () => savespescs(index,specs) } >
                                                                            <AiFillEye className="retailproductsellipage-product-pdet-specs-div-btn-ic" />
                                                                        </button>
                                                                    </div>

                                                    } )

                                                    }

                                                <button className="retailcartpage-btm-link" style={{
                                                    marginTop:'2rem'
                                                }} onClick={
                                                    () => setproduct_specs([
                                                        ...product_specs,
                                                        {call:'',response:''}
                                                      ])
                                                } >
                                                    Add Specs
                                                </button>

                                                <button className="retailcartpage-btm-link" disabled={Productdetails.posting} onClick={ PostingTheProduct } style={{
                                                    marginTop:'2rem'
                                                }} >
                                                    Edit Product
                                                </button>

                                            </div>

                                        </div>

                                        {/* <div className="retailproductsellipage-product-addcat" >
                                            <div className="retailproductsellipage-product-addcat-top" > Add Category </div>

                                            <form className="retailproductsellipage-product-addcat-form" onSubmit={ AddingNewCategoryHandler } >
                                                <input 
                                                    className="retailproductsellipage-product-addcat-form-input" 
                                                    value={addcategory.value} 
                                                    onChange={ (event) => setaddcategory({...addcategory,value:event.target.value}) } />
                                                <button className="retailproductsellipage-product-addcat-form-btn" > Add </button>
                                            </form>

                                        </div> */}


                                        <div className="retailproductsellipage-product-addcat" >
                                            <div className="retailproductsellipage-product-addcat-top" > Rate Product </div>

                                            <form className="retailproductsellipage-product-addcat-form" onSubmit={ RateproductHandler } >
                                                <input 
                                                    className="retailproductsellipage-product-addcat-form-input" 
                                                    value={ratenumber} 
                                                    onChange={ (event) => setratenumber(event.target.value) } />
                                                <button className="retailproductsellipage-product-addcat-form-btn" > Rate </button>
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

export default EditFoodProduct;