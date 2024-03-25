import {getByShopId, updateSetting} from '../repositories/settingRepository';
import {getCurrentShop} from '../helpers/auth';

export const getSettingByShopId = async ctx => {
  try {
    const shopID = getCurrentShop(ctx);
    const setting = await getByShopId(shopID);
    console.log(shopID);
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
      error: error.message
    };
  }
};

export const updateSettingByShopId = async ctx => {
  try {
    const data = ctx.req.body;
    const res = await updateSetting(data);
    if (res) {
      ctx.body = {
        success: true,
        message: 'Update setting success'
      };
    }
  } catch (error) {
    ctx.body = {
      success: false,
      error: error.message
    };
  }
};
