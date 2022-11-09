import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cards, { updatePrice } from '../../components/Card/Card';
import Header from '../../components/header/Header';
import CustomerContext from '../../context/customerContext';
import getProducts from '../../api/request';
import { getUserFromLS } from '../../helpers/localStorage';
import './style.css';

function CustomerProducts() {
  const history = useNavigate();
  const { cartProducts } = useContext(CustomerContext);

  const [products, setProducts] = useState([
    {
      name: '',
      price: '0',
      url_image: '',
      id: 0,
    },
  ]);

  useEffect(() => {
    const getAllProducts = async () => {
      const allProducts = await getProducts();
      setProducts(allProducts);
    };
    const user = getUserFromLS();
    if (user) {
      getAllProducts();
    } else {
      history('/login');
    }
  }, [history]);

  const getTotalPrice = () => (
    cartProducts.reduce((acc, product) => {
      const price = Number(product.price) * Number(product.quantity);
      return acc + price;
    }, 0)
  );

  return (
    <div>
      <Header />
      <div className="product_container">
        {products.map((product, index) => (
          <Cards product={ product } key={ index } />
        ))}
      </div>
      <footer className="footer">
        <button
          className="btn_totalprice"
          type="button"
          data-testid="customer_products__button-cart"
          disabled={ cartProducts.length === 0 }
          onClick={ () => history('/customer/checkout') }
        >
          <p
            data-testid="customer_products__checkout-bottom-value"
          >
            {`Ver carrinho: R$ ${updatePrice(getTotalPrice())}`}
          </p>
        </button>
      </footer>
    </div>
  );
}

export default CustomerProducts;
