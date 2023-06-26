import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ProductContext } from '../../contexts/ProductContext';


function Details() {

  let [currentProduct,errors,ProdRegStatus,productDetail]=useContext(ProductContext)
  console.log(currentProduct)

  return (
    <Card style={{ width: '100%' , height:'562px'}}>
      <Card.Img variant="top" src={currentProduct.image} height={'230px'}/>
      <Card.Body>
        <Card.Title>{currentProduct.price}</Card.Title>
        <Card.Title>{currentProduct.address}</Card.Title>
        <Card.Title>{currentProduct.area}</Card.Title>
        <Button>press</Button>
      </Card.Body>
    </Card>
  )
}

export default Details