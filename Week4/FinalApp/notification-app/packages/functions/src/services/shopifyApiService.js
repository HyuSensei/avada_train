import {handleGetOrderApi, handleGetProductApi} from '../api/api';

// export const getNotificationList = async shopify => {
//   try {
//     const orders = await shopify.order.list();
//     const products = await shopify.product.list();
//     const data = orders.map(order => {
//       const product = products.find(productItem => {
//         return order.line_items.some(item => item.product_id === productItem.id);
//       });
//       return {
//         firstName: order.shipping_address.first_name,
//         country: order.shipping_address.country,
//         city: order.shipping_address.city,
//         productId: product.id,
//         productImage: product.image.src,
//         productName: product.title,
//         timestamp: order.created_at
//       };
//     });
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getNotificationItem = async ({shopify, dataOrder}) => {
//   try {
//     const products = await shopify.product.list();
//     const product = products.find(item => {
//       return dataOrder.line_items.some(order => order.product_id === item.id);
//     });
//     return {
//       firstName: dataOrder.shipping_address.first_name,
//       country: dataOrder.shipping_address.country,
//       city: dataOrder.shipping_address.city,
//       productId: product.id,
//       productImage: product.image.src,
//       productName: product.title,
//       timestamp: dataOrder.created_at
//     };
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getNotificationList = async ({shopifyDomain, accessToken}) => {
  try {
    const res = await handleGetOrderApi({shopifyDomain, accessToken});
    const data = res.data.orders.edges.map(order => {
      const productId = order.node.lineItems.edges[0].node.product.id.split('/').pop();
      return {
        firstName: order.node.shippingAddress.firstName,
        country: order.node.shippingAddress.country,
        city: order.node.shippingAddress.city,
        productId: parseInt(productId),
        productImage: order.node.lineItems.edges[0].node.image.src,
        productName: order.node.lineItems.edges[0].node.name,
        timestamp: order.node.createdAt
      };
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getNotificationItem = async ({shopifyDomain, accessToken, dataOrder}) => {
  try {
    const res = await handleGetProductApi({
      shopifyDomain,
      accessToken,
      productId: dataOrder.line_items[0].product_id
    });
    return {
      firstName: dataOrder.billing_address.first_name,
      country: dataOrder.billing_address.country,
      city: dataOrder.billing_address.city,
      productId: parseInt(res.data.product.id.split('/').pop()),
      productImage: res.data.product.images.nodes[0].src,
      productName: res.data.product.title,
      timestamp: dataOrder.created_at
    };
  } catch (error) {
    console.log(error);
  }
};
