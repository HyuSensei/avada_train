import {getShopByShopifyDomain} from '@avada/core';
import Shopify from 'shopify-api-node';
import {getNotificationItem} from '../../services/shopifyApiService';
import {saveNotificationItem} from '../../repositories/notificationRepository';

export const listenNewOrder = async ctx => {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken: shop.accessToken
    });
    const dataOrder = ctx.req.body;
    const data = await getNotificationItem({shopify, dataOrder});
    await saveNotificationItem({shopId: shop.id, shopifyDomain, data});
    return (ctx.body = {
      success: true
    });
  } catch (error) {
    console.log(error);
    return (ctx.body = {
      success: false
    });
  }
};
