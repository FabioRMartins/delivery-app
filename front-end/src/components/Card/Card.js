import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import CustomerContext from '../../context/customerContext';
import './style.css';

export const updatePrice = (price) => Number(price).toFixed(2).replace('.', ',');

function Cards({ product }) {
  const { cartProducts, setCartProducts } = useContext(CustomerContext);

  const [quantity, setQuantity] = useState(0);

  function handleCart(totalCart) {
    const cartProduct = cartProducts.find(({ name }) => name === product.name);
    if (!cartProduct) {
      setCartProducts([...cartProducts, { ...product, quantity: totalCart }]);
    } else {
      const updatedProducts = cartProducts.map((updatedProduct) => {
        if (updatedProduct.name === product.name) {
          return { ...updatedProduct, quantity: totalCart };
        }
        return updatedProduct;
      });
      setCartProducts(updatedProducts);
    }
  }

  function removeCartProduct() {
    const removeProducts = cartProducts.filter(({ name }) => name !== product.name);
    setCartProducts(removeProducts);
  }

  const addQuantity = () => {
    setQuantity(quantity + 1);
    handleCart(quantity + 1);
  };

  const removeQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      if (quantity - 1 === 0) {
        removeCartProduct();
      } else {
        handleCart(quantity - 1);
      }
    }
  };

  const handleChange = ({ target }) => {
    setQuantity(target.value);
    if (target.value === 0) {
      removeCartProduct();
    } else {
      handleCart(target.value);
    }
  };

  return (
    <div className="product_card">
      <p
        className="product_card_title"
        data-testid={ `customer_products__element-card-title-${product.id}` }
      >
        {product.name}
      </p>
      <div className="product_card_image">
        <img
          data-testid={ `customer_products__img-card-bg-image-${product.id}` }
          height="200px"
          src={ product.url_image }
          alt={ product.name }
        />
      </div>
      <p
        data-testid={ `customer_products__element-card-price-${product.id}` }
        className="product_card_price"
      >
        { `R$: ${updatePrice(product.price)} un` }
      </p>
      <div className="btn_container">
        <button
          className="product_card_button"
          data-testid={ `customer_products__button-card-rm-item-${product.id}` }
          type="button"
          onClick={ removeQuantity }
        >
          -
        </button>
        <input
          className="product_card_input"
          data-testid={ `customer_products__input-card-quantity-${product.id}` }
          type="number"
          min={ 0 }
          onChange={ handleChange }
          value={ quantity }
        />
        <button
          className="product_card_button"
          data-testid={ `customer_products__button-card-add-item-${product.id}` }
          type="button"
          onClick={ addQuantity }
        >
          +
        </button>
      </div>
    </div>
  );
}

Cards.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    url_image: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default Cards;
