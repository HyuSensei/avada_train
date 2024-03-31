import {getAllNotification, getNotificationByDomain} from '../repositories/notificationRepository';

export const getNotification = async ctx => {
  try {
    const notifications = await getAllNotification();
    if (notifications) {
      return (ctx.body = {
        success: true,
        message: 'Get all notifications',
        data: notifications
      });
    }
  } catch (error) {
    ctx.body = {
      success: false,
      data: [],
      error: error.message
    };
  }
};

export const list = async ctx => {
  try {
    const {shopifyDomain} = ctx.query;
    const notifications = await getNotificationByDomain(shopifyDomain);
    return (ctx.body = {
      success: true,
      data: notifications
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
