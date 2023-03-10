import React from 'react';
import PropTypes from 'prop-types';
import { updatePrice } from '../Card/Card';
import './style.css';

export default function OrderDetailTable({ Products }) {
  return (
    <table>
      <th>Item</th>
      <th>Descrição</th>
      <th>Quantidade</th>
      <th>Valor Unitário</th>
      <th>Sub-total</th>
      {Products?.map((element, index) => (
        <tr
          className="order_description"
          key={ index }
        >
          <td
            data-testid={ `customer_order_details_
              _element-order-table-item-number-${index}` }
          >
            { index + 1 }
          </td>
          <td
            data-testid={ `customer_order_details_
              _element-order-table-name-${index}` }
          >
            { element.name }
          </td>
          <td
            data-testid={ `customer_order_details_
              _element-order-table-quantity-${index}` }
          >
            { element.product.quantity }
          </td>
          <td
            data-testid={ `customer_order_details_
              _element-order-table-unit-price-${index}` }
          >
            { element.price }
          </td>
          <td
            data-testid={ `customer_order_details_
              _element-order-table-sub-total-${index}` }
          >
            { updatePrice(element.price * element.product.quantity) }
          </td>
        </tr>
      ))}
    </table>
  );
}

OrderDetailTable.propTypes = {
  Products: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
};
