const Shopify = require('shopify-api-node');

const shopify = new Shopify({
  accessToken: 'shpua_f04e3401dcf7ed392027477bdb62619b',
  shopName: 'store-sales-notifications.myshopify.com'
});
(async () => {
  const webhook = await shopify.webhook.list();
  console.log(webhook);
})();
