import {getShopByShopifyDomain} from '@avada/core';
import Shopify from 'shopify-api-node';
import {getNotificationItem} from '../../services/shopifyApiService';
import {saveNotificationItem} from '../../repositories/notificationRepository';
import {messaging} from 'firebase-admin';

export const listenNewOrder = async ctx => {
  try {
    console.log('run order webhook');
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const dataOrder = ctx.req.body;
    // console.log('dataOrder:', dataOrder);
    const data = await getNotificationItem({
      shopifyDomain,
      accessToken: shop.accessToken,
      dataOrder
    });
    console.log('data:', data);
    await saveNotificationItem({shopId: shop.id, shopifyDomain, data});
    return (ctx.body = {
      success: true
    });
  } catch (error) {
    console.log(error);
    return (ctx.body = {
      success: false,
      error: error.message
    });
  }
};
