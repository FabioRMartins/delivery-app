import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import { sellerOrder, sellerProducts, orderStatus } from '../../api/sellerOrderDetails';
import './style.css';

function SellerOrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const [products, setProducts] = useState();
  const [disabled, setDisabled] = useState({
    preparingDisabled: false,
    deliveredDisabled: true,
  });

  useEffect(() => {
    sellerOrder(id).then((response) => setOrder(response));
    sellerProducts(id).then((response) => setProducts(response));
    if (order[0]?.status === 'Preparando'
    || order[0]?.status === 'Entregue') {
      setDisabled({
        preparingDisabled: true,
      });
    }
    if (order[0]?.status === 'Pendente'
    || order[0]?.status === 'Entregue') {
      setDisabled({
        deliveredDisabled: true,
      });
    }
    if (order[0]?.status === 'Em Trânsito') {
      setDisabled({
        preparingDisabled: true,
        deliveredDisabled: true,
      });
    }
  }, [id, order[0]?.status]);

  const getDate = (orders) => {
    const date = new Date(orders[0]?.saleDate);
    return date.toLocaleString(
      'pt-BR',
      { dateStyle: 'short' },
    );
  };

  const result = products?.products.reduce((acc, curr) => {
    const totalValue = Number(curr.price * curr.product.quantity);
    return (acc + totalValue);
  }, 0);

  const preparingOrder = async () => {
    await orderStatus(id, 'Preparando');
    const newOrder = await sellerOrder(id);
    setOrder(newOrder);
  };

  const delivered = async () => {
    await orderStatus(id, 'Em Trânsito');
    const newOrder = await sellerOrder(id);
    setOrder(newOrder);
  };

  return !order ? (<div>Loading</div>) : (
    <div>
      <Header />
      <h3 className="seller_order_detail_title">Detalhe do Pedido</h3>
      <main className="main_container_seller_order_detail">
        <div className="table_order_seller_detail">
          <table>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            {products?.products.map((prod, index) => (
              <tr
                className="seller_description"
                key={ index }
              >
                <td
                  data-testid={
                    `seller_order_details__element-order-table-item-number-${index}`
                  }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-name-${index}`
                  }
                >
                  {prod.name}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-quantity-${index}`
                  }
                >
                  {prod.product.quantity}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-unit-price-${index}`
                  }
                >
                  {prod.price.toString().replace('.', ',')}
                </td>
                <td
                  data-testid={
                    `seller_order_details__element-order-table-sub-total-${index}`
                  }
                >
                  {(prod.price * prod.product.quantity).toString().replace('.', ',')}
                </td>
              </tr>
            ))}
            <span
              data-testid={ `seller_orders__element-delivery-status-${order[0]?.id}` }
            />
          </table>
          <h1
            className="seller_total_price"
            data-testid="seller_order_details__element-order-total-price"
          >
            Total: R$
            <span>{result?.toFixed(2).toString().replace('.', ',')}</span>
          </h1>
        </div>
        <div className="seller_detail_info">
          <p
            className="seller_text"
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            {`Pedido: ${order[0]?.id}`}
          </p>
          <p
            className="seller_text"
            data-testid="seller_order_details__element-order-details-label-order-date"
          >
            Data do pedido:
            {' '}
            {getDate(order)}
          </p>
          <p
            className="seller_text"
            data-testid="
              seller_order_details__element-order-details-label-delivery-status"
          >
            Status do pedido:
            {' '}
            {order[0]?.status}
          </p>
          <button
            type="button"
            data-testid="seller_order_details__button-preparing-check"
            disabled={ disabled.preparingDisabled }
            onClick={ preparingOrder }
          >
            Preparar Pedido
          </button>
          <button
            type="button"
            data-testid="seller_order_details__button-dispatch-check"
            disabled={ disabled.deliveredDisabled }
            onClick={ delivered }
          >
            Saiu Para Entrega
          </button>
        </div>
      </main>
    </div>
  );
}

export default SellerOrderDetails;
