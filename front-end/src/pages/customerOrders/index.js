import React, { useEffect, useContext } from 'react';
import Header from '../../components/header/Header';
import OrderCard from '../../components/orderCard/orderCards';
import saleContext from '../../context/saleContext';
import { getSales } from '../../api/request';
import './style.css';

function CustomerOrder() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { setSaleCard } = useContext(saleContext);
  useEffect(() => {
    const API = async () => {
      const requestAPI = await getSales();
      const filteredOrders = requestAPI.filter((item) => item.userId === user.id);
      setSaleCard(filteredOrders);
    };
    API();
  }, []);

  return (
    <div>
      <Header />
      <h3 className="title_text">Histórico de pedidos</h3>
      <div className="order_container_page">
        <OrderCard />
      </div>
    </div>
  );
}
export default CustomerOrder;
