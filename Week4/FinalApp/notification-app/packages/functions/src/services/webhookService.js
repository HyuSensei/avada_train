import Shopify from 'shopify-api-node';
import appConfig from '@functions/config/app';

export const createWebhook = async ({shopifyDomain, shop}) => {
  const shopify = new Shopify({
    shopName: shopifyDomain,
    accessToken: shop.accessToken
  });
  const webhookData = {
    topic: 'orders/create',
    address: `https://${appConfig.baseUrl}/webhook/order/new`,
    format: 'json'
  };
  return await shopify.webhook.create(webhookData);
};
