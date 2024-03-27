import {Firestore} from '@google-cloud/firestore';
import {defaultSetting} from '../const/setting/defaultSetting';
const firestore = new Firestore();
const collection = firestore.collection('settings');

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

export const updateSetting = async data => {
  return await collection.doc(data.id).update(data);
};

export const createDefaultSetting = async shopId => {
  try {
    await collection.add({...defaultSetting, shopId});
  } catch (error) {
    console.error(error);
  }
};
