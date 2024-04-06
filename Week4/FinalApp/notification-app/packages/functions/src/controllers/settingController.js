import {getByShopId, updateSetting} from '../repositories/settingRepository';
import {getCurrentShop} from '../helpers/auth';

/**
 *
 * @param {*} ctx
 * @returns {Promise<{success:boolean,message:string,data:*{}}>}
 */
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

/**
 *
 * @param {*} ctx
 * @returns {Promise<{success:boolean,message:string} | {success:boolean,error:*}>}
 */
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
