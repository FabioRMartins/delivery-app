import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import OrderDetailTable from '../../components/orderDetail/orderDetail';
import { getSalesById, getSellerById } from '../../api/request';
import './style.css';

const dataTestid = 'customer_order_details__element-order-details-label-';

export default function CustomerOrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    const getOrderDetail = async () => {
      const result = await getSalesById(id);
      setOrder(result);
      getSellerById(id).then((sellerName) => setName(sellerName));
    };
    getOrderDetail();
  }, [id]);

  function dataAtualFormatada(date) {
    const data = new Date(date);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${`${dia}/${mes}/${ano}`}`;
  }

  const result = name.items?.products.reduce((acc, curr) => {
    const totalValue = Number(curr.price * curr.product.quantity);
    return (acc + totalValue);
  }, 0);

  return (
    <div>
      <Header />
      <h3 className="order_detail_title">Detalhe do Pedido</h3>
      <main className="main_order_detail_container">
        <div className="order_detail_first_section">
          { order?.length > 0 && (
            <div>
              <p
                className="order_description"
                data-testid={ `${dataTestid}order-id` }
              >
                {`Pedido ${order[0].id}` }
              </p>
              <p
                className="order_description"
                data-testid={ `${dataTestid}seller-name` }
              >
                { `P.Vend: ${name.seller?.name}` }
              </p>
              <p
                className="order_description"
                data-testid={ `${dataTestid}order-date` }
              >
                { `${dataAtualFormatada(order[0].saleDate)}` }
              </p>
              <p
                className="order_description"
                data-testid={ `${dataTestid}delivery-status` }
              >
                { order[0].status }
              </p>
              <button
                data-testid="customer_order_details__button-delivery-check"
                type="button"
                disabled={ order[0].status !== 'Em Trânsito' }
              >
                MARCAR COMO ENTREGUE
              </button>
            </div>
          )}
        </div>
        <div className="main_order_detail">
          <div className="order_detail">
            <OrderDetailTable
              className="order_description"
              Products={ name.items?.products }
            />
            <p
              data-testid="customer_order_details__element-order-total-price"
            >
              {`Total: R$${result?.toFixed(2).toString().replace('.', ',')}`}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
