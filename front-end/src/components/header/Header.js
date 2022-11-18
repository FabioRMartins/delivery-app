import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserFromLS } from '../../helpers/localStorage';
import './Header.css';

const getByUserRole = {
  customer: 'Produtos',
  seller: 'Pedidos',
  administrator: 'Gerenciar Usuários',
};

function Header() {
  const [user, setUser] = useState({});
  const history = useNavigate();
  const logout = () => {
    localStorage.clear();
    history('/login');
  };

  useEffect(() => {
    setUser(getUserFromLS());
  }, []);

  return (
    <div className="header">
      <Link
        className="header_title"
        to="/customer/products"
        data-testid="customer_products__element-navbar-link-products"
      >
        { getByUserRole[user.role] }
      </Link>
      {
        user.role === 'customer' && (
          <Link
            className="header_title"
            to="/customer/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            { getByUserRole[user.role] }
          </Link>
        )
      }
      { user.role === 'seller' ? (
        <Link
          to="/seller/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Pedidos
        </Link>
      ) : (
        <Link
          to="/customer/orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Meus pedidos
        </Link>
      )}
      <Link
        className="header_title"
        to="/user/profile"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {user.name}
      </Link>
      <button
        className="button"
        type="button"
        onClick={ logout }
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </button>
    </div>
  );
}

export default Header;
