import axios from 'axios';
import './products.css'
import React, { useEffect, useState ,useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { loginContext } from '../../contexts/loginContext';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../contexts/ProductContext';
import Details from '../Details/Details';


const ProductCard = ({product}) => {

  let[currentUser,error,UserLoginStatus,loginUser,logoutUser]=useContext(loginContext)
  let [currentProduct,errors,ProdRegStatus,productDetail]=useContext(ProductContext)

  const navigate=useNavigate()
  const ToLogin=()=>{
    navigate('/Login')
  }


  const ToDetails=()=>{
    console.log(product)
    productDetail(product)
    navigate('/Details')
  }
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>Price:{product.price}</Card.Title>
        {!UserLoginStatus?(<Button variant="primary" onClick={ToLogin}>more details</Button>):(<Button variant="primary" onClick={ToDetails}>more details</Button>)}
      </Card.Body>
    </Card>
  );
};


const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch product data from the API
    axios
    .get('http://localhost:4000/products-api/get-products')
    .then((response)=>{
      setProducts(response.data.payload)
    })
    .catch((err)=>{
      console.log(err.message)
    })
  }, []);

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
