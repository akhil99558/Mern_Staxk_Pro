import React,{useState} from 'react'
import { ProductContext } from './ProductContext'
import axios from 'axios'

function ProductStore({children}) {
    let [currentProduct,setcurrentProduct]=useState({})
    let [errors,seterrors]=useState('')
    let [ProdRegStatus,setProdRegStatus]=useState(false)


    //product posting
    const productDetail=(prodDet)=>{
      setcurrentProduct(prodDet)
    }
        
        
  return (
    <ProductContext.Provider value={[currentProduct,errors,ProdRegStatus,productDetail]}>
        {children}
    </ProductContext.Provider>
  )
}

export default ProductStore