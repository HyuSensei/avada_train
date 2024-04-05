import {Firestore, Timestamp} from '@google-cloud/firestore';
import moment from 'moment';

const firestore = new Firestore();
const collection = firestore.collection('notifications');

export const getAllNotification = async () => {
  try {
    const query = await collection.orderBy('timestamp', 'desc').get();
    return query.docs.map(doc => {
      const date = moment(doc.data().timestamp.toDate()).from(moment());
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
  const queries = data.map(item => {
    const timestamp = new Date(item.timestamp);
    return collection.add({
      ...item,
      shopifyDomain,
      shopId,
      timestamp: Timestamp.fromDate(timestamp)
    });
  });
  return await Promise.all(queries);
};

export const saveNotificationItem = async ({shopId, shopifyDomain, data}) => {
  const timestamp = new Date(data.timestamp);
  return await collection.add({
    ...data,
    shopifyDomain,
    shopId,
    timestamp: Timestamp.fromDate(timestamp)
  });
};

export const getNotificationByDomain = async shopifyDomain => {
  const [queryNotifications, querySettings] = await Promise.all([
    collection.where('shopifyDomain', '==', shopifyDomain).get(),
    firestore
      .collection('settings')
      .where('shopifyDomain', '==', shopifyDomain)
      .limit(1)
      .get()
  ]);
  const docSettings = querySettings.docs[0];
  const settings = {
    id: docSettings.id,
    ...docSettings.data(),
    excludedUrls: docSettings.data().excludedUrls?.split('\n') || [],
    includedUrls: docSettings.data().includedUrls?.split('\n') || []
  };
  const notifications = queryNotifications.docs.map(doc => {
    return {
      id: doc.id,
      ...doc.data(),
      timestamp: moment(doc.data().timestamp.toDate())
    };
  });
  const sortedNotifications = notifications.sort((a, b) => {
    return b.timestamp - a.timestamp;
  });
  const formattedNotifications = sortedNotifications.map(notification => {
    return {
      ...notification,
      timestamp: notification.timestamp.from(moment())
    };
  });
  return {
    notifications: formattedNotifications,
    settings
  };
};
