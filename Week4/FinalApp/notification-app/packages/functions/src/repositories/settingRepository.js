import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
const collection = firestore.collection('settings');

export const getByShopId = async shopID => {
  try {
    const settingDocs = await collection
      .where('shopId', '==', shopID)
      .limit(1)
      .get();
    if (settingDocs.empty) throw new Error('Not found shopID');
    const doc = settingDocs.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const updateSetting = async data => {
  try {
    collection.doc(data.id).update(data);
    return true;
  } catch (error) {
    console.log(error);
  }
};
