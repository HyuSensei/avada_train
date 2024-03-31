import {Firestore, Timestamp} from '@google-cloud/firestore';
import moment from 'moment';

const firestore = new Firestore();
const collection = firestore.collection('notifications');

export const getAllNotification = async () => {
  try {
    const query = await collection.orderBy('timestamp', 'desc').get();
    return query.docs.map(doc => {
      const date = moment(doc.data().timestamp)
        .startOf('day')
        .fromNow();
      return {
        id: doc.id,
        ...doc.data(),
        timestamp: date,
        createdAt: doc.data().timestamp.toDate()
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const saveNotifications = async ({shopifyDomain, shopId, data}) => {
  try {
    return data.forEach(async item => {
      const timestamp = new Date(item.timestamp);
      await collection.add({
        ...item,
        shopifyDomain,
        shopId,
        timestamp: Timestamp.fromDate(timestamp)
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const saveNotificationItem = async ({shopId, shopifyDomain, data}) => {
  console.log('data:', data);
  const timestamp = new Date(data.timestamp);
  return await collection.add({
    ...data,
    shopifyDomain,
    shopId,
    timestamp: Timestamp.fromDate(timestamp)
  });
};

export const getNotificationByDomain = async shopifyDomain => {
  try {
    const query = await collection.where('shopifyDomain', '==', shopifyDomain).get();
    return query.docs.map(doc => {
      const date = moment(doc.data().timestamp)
        .startOf('day')
        .fromNow();
      return {
        id: doc.id,
        ...doc.data(),
        timestamp: date
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};
