const { user, sale, salesProducts, sequelize } = require('../database/models');

const getSeller = async () => {
  const sellerData = await user.findAll({ where: { role: 'seller' } });
  return sellerData;
};

const createSale = async (body) => {
  const { userId, sellerId, totalPrice, deliveryAddress,
    deliveryNumber, status, order,
  } = body;
  const result = await sequelize.transaction(async (transaction) => {
    const saleData = await sale
    .create({ userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status });
    const products = await order.order.map((product) => ({
      saleId: saleData.dataValues.id,
      productId: product.id,
      quantity: product.quantity,
    }));
    await salesProducts.bulkCreate(products, { transaction });
    return saleData;
  });
  return result;
};

const getSales = async () => {
  const sales = await sale.findAll();
  return sales;
};

const getSalesById = async (sellerId) => {
  const sales = await sale.findAll({
    where: { id: sellerId },
  });
  console.log(sales);
  return sales;
};

module.exports = {
  getSeller,
  createSale,
  getSalesById,
  getSales,
};
