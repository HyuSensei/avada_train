export const getNotificationList = async shopify => {
  try {
    const orders = await shopify.order.list();
    const products = await shopify.product.list();
    const data = orders.map(order => {
      const product = products.find(productItem => {
        return order.line_items.some(item => item.product_id === productItem.id);
      });
      return {
        firstName: order.shipping_address.first_name,
        country: order.shipping_address.country,
        city: order.shipping_address.city,
        productId: product.id,
        productImage: product.image.src,
        productName: product.title,
        timestamp: order.created_at
      };
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getNotificationItem = async ({shopify, dataOrder}) => {
  try {
    const products = await shopify.product.list();
    const product = products.find(item => {
      return dataOrder.line_items.some(order => order.product_id === item.id);
    });
    return {
      firstName: dataOrder.shipping_address.first_name,
      country: dataOrder.shipping_address.country,
      city: dataOrder.shipping_address.city,
      productId: product.id,
      productImage: product.image.src,
      productName: product.title,
      timestamp: dataOrder.created_at
    };
  } catch (error) {
    console.log(error);
  }
};
