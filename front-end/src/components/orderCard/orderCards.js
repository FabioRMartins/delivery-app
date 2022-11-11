import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import saleContext from '../../context/saleContext';
import './orderCard.css';

function OrderCard() {
  const navigate = useNavigate();
  const { saleCard } = useContext(saleContext);
  const getDate = (item) => {
    const date = new Date(item.saleDate);
    return date.toLocaleString(
      'pt-BR',
      { dateStyle: 'short' },
    );
  };
  return (

    <section className="main-container">
      {saleCard && saleCard.map((item) => (
        <div
          className="card-container"
          key={ item.id }
          data-testid={ `customer_orders__element-order-id-${item.userId}` }
        >
          <div className="card-header">
            <div className="first-block">
              <div className="card-order">
                <p
                  data-testid={ `customer_orders__element-order-id-${item.id}` }
                >
                  {`Pedido ${item.id}`}
                </p>
              </div>
              <div className="card-status">
                <p
                  data-testid={ `customer_orders__element-delivery-status-${item.id}` }
                >
                  {`${item.status}`}
                </p>
              </div>
              <div className="card-date">
                <p
                  data-testid={ `customer_orders__element-order-date-${item.id}` }
                >
                  {`${getDate(item)}`}
                </p>
              </div>
              <div className="card-total-price">
                <p
                  data-testid={ `customer_orders__element-card-price-${item.id}` }
                >
                  {`Total: R$${Number(item.totalPrice).toFixed(2).replace('.', ',')}`}
                </p>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={ () => navigate(`/customer/orders/${item.id}`) }
          >
            Ver detalhes
          </button>
        </div>
      ))}
    </section>
  );
}
export default OrderCard;
