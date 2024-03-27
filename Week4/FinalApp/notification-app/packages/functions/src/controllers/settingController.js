import {getByShopId, updateSetting} from '../repositories/settingRepository';
import {getCurrentShop} from '../helpers/auth';

export const getSettingByShopId = async ctx => {
  try {
    const shopID = getCurrentShop(ctx);
    const setting = await getByShopId(shopID);
    if (setting) {
      return (ctx.body = {
        success: true,
        message: 'Get setting by shopId',
        data: setting
      });
    }
  } catch (error) {
    ctx.body = {
      success: false,
      data: {},
      error: error.message
    };
  }
};

export const updateSettingByShopId = async ctx => {
  try {
    const data = ctx.req.body;
    await updateSetting(data);
    return (ctx.body = {
      success: true,
      message: 'Update setting success'
    });
  } catch (error) {
    ctx.body = {
      success: false,
      error: error.message
    };
  }
};
