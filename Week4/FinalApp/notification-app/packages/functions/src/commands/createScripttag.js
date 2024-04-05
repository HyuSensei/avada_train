const Shopify = require('shopify-api-node');

(async () => {
  const shopify = new Shopify({
    accessToken: 'shpua_28049e81c2806c54af6b7df25e5360ed',
    shopName: 'store-sale-notifications.myshopify.com'
  });
  const scriptTags = await shopify.scriptTag.list();
  console.log(scriptTags);
  // await shopify.scriptTag.create({
  //   event: 'onload',
  //   src: 'https://localhost:3000/scripttag/avada-sale-pop.min.js'
  // });
  // await shopify.scriptTag.delete(203228479666);
})();
