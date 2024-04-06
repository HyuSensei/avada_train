import {Firestore} from '@google-cloud/firestore';
import {defaultSetting} from '../const/setting/defaultSetting';
const firestore = new Firestore();
const collection = firestore.collection('settings');

/**
 *
 * @param {string} shopID
 * @returns {Promise<{id:string,allowShow:string,displayDuration:number,excludedUrls:string,firstDelay:number,hideTimeago:number,maxPopsDisplay:number,popsInterval:number,position:string,shopId:string,shopifyDomain:string,truncateProductName:boolean} | {}>}
 */
export const getByShopId = async shopID => {
  try {
    const settingDocs = await collection
      .where('shopId', '==', shopID)
      .limit(1)
      .get();
    const doc = settingDocs.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    };
  } catch (error) {
    console.log(error);
    return {};
  }
};

/**
 *
 * @param {string} shopifyDomain
 * @returns {Promise<{id:string,allowShow:string,displayDuration:number,excludedUrls:string,firstDelay:number,hideTimeago:number,maxPopsDisplay:number,popsInterval:number,position:string,shopId:string,shopifyDomain:string,truncateProductName:boolean} | {}>}
 */
export const getByShopifyDomain = async shopifyDomain => {
  try {
    const query = await collection
      .where('shopifyDomain', '==', shopifyDomain)
      .limit(1)
      .get();
    const docSettings = query.docs[0];
    return {
      id: docSettings.id,
      ...docSettings.data(),
      excludedUrls: docSettings.data().excludedUrls
        ? docSettings.data().excludedUrls.split('\n')
        : [],
      includedUrls: docSettings.data().includedUrls
        ? docSettings.data().includedUrls.split('\n')
        : []
    };
  } catch (error) {
    return {};
  }
};

/**
 *
 * @param {*} data
 * @returns {Promise}
 */
export const updateSetting = async data => {
  return await collection.doc(data.id).update(data);
};

/**
 *
 * @param {Object} param
 * @param {string} shopId
 * @param {string} shopifyDomain
 * @returns {Promise}
 */
export const createDefaultSetting = async ({shopId, shopifyDomain}) => {
  return await collection.add({...defaultSetting, shopId, shopifyDomain});
};
