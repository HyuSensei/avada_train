import {getAllNotification} from '../repositories/notificationRepository';

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
