import PropTypes from 'prop-types';
import { updatePrice } from '../Card/Card';
import './style.css';

export default function SaleCard({ sale }) {
  const getDate = () => {
    const date = new Date(sale.saleDate);
    return date.toLocaleString(
      'pt-BR',
      { dateStyle: 'short' },
    );
  };

  return (
    <div className="first_section">
      <div className="seller_card_order">
        <p
          data-testid={ `seller_orders__element-order-id-${sale.id}` }
        >
          {`Pedido ${sale.id}` }
        </p>
      </div>
      <div className="seller_card_status">
        { `${sale.status}` === 'Em Trânsito' ? (
          <p
            className="seller_traveling"
            data-testid={ `seller_orders__element-delivery-status-${sale.id}` }
          >
            {sale.status}
          </p>
        ) : (
          <p
            className="seller_waiting"
            data-testid={ `seller_orders__element-delivery-status-${sale.id}` }
          >
            {sale.status}
          </p>
        )}
      </div>

      <div className="seller_card_date">
        <p
          data-testid={ `seller_orders__element-order-date-${sale.id}` }
        >
          {getDate()}
        </p>
      </div>
      <div className="seller_card_total_price">
        <p
          data-testid={ `seller_orders__element-card-price-${sale.id}` }
        >
          {`R$ ${updatePrice(sale.totalPrice)}`}
        </p>
      </div>
      <p
        data-testid={ `seller_orders__element-card-address-${sale.id}` }
      >
        {`${sale.deliveryAddress}, ${sale.deliveryNumber}`}
      </p>
    </div>
  );
}

SaleCard.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    sellerId: PropTypes.number,
    totalPrice: PropTypes.string,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
    saleDate: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};
