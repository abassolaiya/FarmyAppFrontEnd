
    export const useVerifynum = (file) => {

    const accepteddigit = '1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 0'
    const accepteddigitarray = accepteddigit.split(',').map((item) => {return item.trim()} )


    var end = null

      const currentfile = file

        if (currentfile === null ) {
            end = true
        }else{
            for (let k = 0; k < currentfile.length; k++) {

                if( !accepteddigitarray.includes(currentfile[k]) ){
        
                  end = false
        
                }else{
        
                  end = true
        
                }
        
              }
        }

      return [ end ]

    }


                                                

    export const useVerifyimg = (files) => {

      const accepteddigit = 'image/x-png , image/png , image/jpg , image/jpeg , image/gif'
      const acceptedfilesarray = accepteddigit.split(',').map((item) => {return item.trim()} )
  
  
      var end = null  
 
        if( files && files.length > 0 ){

          const currentFile = files[0]
          const currentFiletype = currentFile.type
          // const currentFilesize = currentFile.size

          if( !acceptedfilesarray.includes(currentFiletype) ){
             end = false
          }else{
            end = true
          }

        }

  
        return [ end ]
  
      }


