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
      <div className="all_page">
        <main className="main_container_order_detail">
          <div className="table_order_detail">
            <OrderDetailTable
              Products={ name.items?.products }
            />
            <h1
              data-testid="customer_order_details__element-order-total-price"
              className="order_total_price"
            >
              {`Total: R$${result?.toFixed(2).toString().replace('.', ',')}`}
            </h1>
          </div>
        </main>

        <div className="oder_detail_info">
          { order?.length > 0 && (
            <div>
              <p
                data-testid={ `${dataTestid}order-id` }
                className="text"
              >
                {`Pedido ${order[0].id}` }
              </p>
              <p
                data-testid={ `${dataTestid}seller-name` }
                className="text"
              >
                { `P.Vend: ${name.seller?.name}` }
              </p>
              <p
                data-testid={ `${dataTestid}order-date` }
                className="text"
              >
                { `${dataAtualFormatada(order[0].saleDate)}` }
              </p>
              <p
                data-testid={ `${dataTestid}delivery-status` }
                className="text"
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
      </div>
    </div>
  );
}
