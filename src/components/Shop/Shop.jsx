import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'
import { Link, useLoaderData } from 'react-router-dom';
const Shop = () => {
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [cart, setCart] = useState([])
  const {totalProducts} = useLoaderData()

    //  TODO: make it dynamic
  // const itemsPerPage = 10; 
  const totalPages = Math.ceil(totalProducts / itemsPerPage)

  // const pageNumber = []
  // for (let i = 0; i <= totalPages; i++){
  //   pageNumber.push(i)
  // }

  const pageNumber = [...Array(totalPages).keys()];


  // console.log(totalProducts)
  /**
   * 1. determine the total number of items
   * 2. ToDo: Decide on the number of items per page
   * 3. Calculate the total number of page
   * 4. 
   * **/ 

    // useEffect(() => {
    //     fetch("https://ema-john-server-gray.vercel.app/products")
    //       .then((res) => res.json())
    //       .then((data) => {
    //         setProducts(data);
    //         //  console.log(data)
    //       });
    // }, [])
  
  useEffect(() => {
    async function fetchData() {
          const response = await fetch(`https://ema-john-server-gray.vercel.app/products?page=${currentPage}&limit=${itemsPerPage}`);
      const data = await response.json();
      setProducts(data)
    }
    fetchData()
    }, [currentPage, itemsPerPage])


  
  useEffect(() => {
    const storedCart = getShoppingCart()
    const ids = Object.keys(storedCart)
    fetch(`https://ema-john-server-gray.vercel.app/productsByIds`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
    .then(res => res.json())
      .then(cartProducts => {
      const savedCart = [];
      //  step 1;
      for (const id in storedCart) {
        //  steps 2 get the product by id
        const addedProduct = cartProducts.find((product) => product._id === id);
        // console.log(addedProduct);
        if (addedProduct) {
          // step -3 get quantity of the product
          const quantity = storedCart[id];
          addedProduct.quantity = quantity;
          // step - 4 add the added product to the saved cart
          savedCart.push(addedProduct);
        }
      }
      // step-5 set the card
      setCart(savedCart);
    })
  }, [])
   const handleAddToCart = (product) => {
    //  console.log(product);
     let newCart = []
    //  const newCart = [...cart, product]
    //   if product does not exist in the cart , then set quantity = 1;
    //  if exist update quantity by 1 
     const exists = cart.find(pd => pd._id === product._id);
     if (!exists) {
       product.quantity = 1;
       newCart = [...cart, product]
     }
     else {
       exists.quantity = exists.quantity + 1;
       const remaining = cart.filter(pd => pd._id !== product._id);
       newCart = [...remaining, exists];
     }
     setCart(newCart)
      addToDb(product._id)
  };
  const handleClearCart = () => {
    setCart([])
    deleteShoppingCart()
  }

  const options = [5, 10, 20];
  function handleSelectChange(event) {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0)
  }

    return (
      <>
        <div className="shop-container">
          <div className="products-container">
            {/* <h3>Products are coming : {products.length}</h3> */}
            {products.map((product) => (
              <Product
                key={product._id}
                product={product}
                handleAddToCart={handleAddToCart}
              ></Product>
            ))}
          </div>
          <div className="cart-container">
            <Cart handleClearCart={handleClearCart} cart={cart}>
              <Link className="proceed-link" to="/orders">
                <button className="button-clear">
                  <span>Review Order</span>
                  <FontAwesomeIcon icon={faUpRightAndDownLeftFromCenter} />
                </button>
              </Link>
            </Cart>
          </div>
        </div>
        {/* pagination */}
        <div className="pagination">
          <p>CurrentPage : {currentPage} and item per page : { itemsPerPage}</p>
          {pageNumber.map((number) => (
            <button key={number}
            className={currentPage === number ? 'selected' : ""}
              onClick={() => setCurrentPage(number)}>
              {number + 1}
            </button>
          ))}

          <select value={itemsPerPage} onChange={handleSelectChange}>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </>
    );
};

export default Shop;