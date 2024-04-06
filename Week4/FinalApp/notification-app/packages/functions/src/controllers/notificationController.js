import {getAllNotifications, getNotificationByDomain} from '../repositories/notificationRepository';

/**
 *
 * @param {*} ctx
 * @returns {Promise<{success:boolean,message:string,data:[*]} | {success:boolean,data:[],error:*}>}
 */
export const getNotifications = async ctx => {
  try {
    console.log(ctx.query.limit);
    const {limit, page, sort} = ctx.query;
    const notifications = await getAllNotifications({limit, page, sort});
    return (ctx.body = {
      success: true,
      data: notifications
    });
  } catch (error) {
    ctx.body = {
      success: false,
      data: [],
      error: error.message
    };
  }
};

/**
 *
 * @param {*} ctx
 * @returns {Promise<{success:boolean,notifications:[*],settings:*{}} | {success:boolean,data:[],error:*}>}
 */
export const list = async ctx => {
  try {
    const {shopifyDomain} = ctx.query;
    const notifications = await getNotificationByDomain(shopifyDomain);
    return (ctx.body = {
      success: true,
      notifications: notifications
    });
  } catch (error) {
    console.log(error);
    ctx.body = {
      success: false,
      data: [],
      error: error.message
    };
  }
};
