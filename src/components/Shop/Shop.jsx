import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './Shop.css'
const Shop = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch("/public//products.json")
            .then((res) => res.json())
            .then((data) => {
                 setProducts(data);
                //  console.log(data)
            });
    }, [])
 
    return (
      <div className="shop-container">
        <div className="products-container">
          {/* <h3>Products are coming : {products.length}</h3> */}
                {products.map(product =>
                    <Product
                        key={product.id}
                        product={product}
                    
                    >
                    </Product>)}
        </div>
        <div className="cart-container">
          <h3>Order Summary</h3>
        </div>
      </div>
    );
};

export default Shop;