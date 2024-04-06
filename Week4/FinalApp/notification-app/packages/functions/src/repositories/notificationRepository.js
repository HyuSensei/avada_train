import {Firestore, Timestamp} from '@google-cloud/firestore';
import moment from 'moment';

const firestore = new Firestore();
const collection = firestore.collection('notifications');

/**
 * @param {Object} param
 * @param {number} limit
 * @param {number} page
 * @returns {Promise<{totalPages:number,notifications:[*],currentPage:number} | []>}
 */
export const getAllNotifications = async ({limit = 5, page = 1, sort = 'desc'}) => {
  try {
    const offset = (page - 1) * limit;
    const [query, totalCountQuery] = await Promise.all([
      collection
        .orderBy('timestamp', sort)
        .offset(offset)
        .limit(parseInt(limit))
        .get(),
      collection.get()
    ]);
    const totalCount = totalCountQuery.size;
    const totalPages = Math.ceil(totalCount / limit);
    return query.docs.map(doc => {
      const date = moment(doc.data().timestamp.toDate()).from(moment());
      return {
        id: doc.id,
        ...doc.data(),
        timestamp: date,
        createdAt: doc.data().timestamp.toDate(),
        totalPages,
        currentPage: parseInt(page)
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};

/**
 *
 * @param {Object} param
 * @param {string} param.shopifyDomain
 * @param {string} param.shopId
 * @param {*} param.data
 * @returns {Promise}
 */
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

/**
 *
 * @param {Object} param
 * @param {string} param.shopId
 * @param {string} param.shopifyDomain
 * @param {*} param.data
 * @returns {Promise}
 */
export const saveNotificationItem = async ({shopId, shopifyDomain, data}) => {
  const timestamp = new Date(data.timestamp);
  return await collection.add({
    ...data,
    shopifyDomain,
    shopId,
    timestamp: Timestamp.fromDate(timestamp)
  });
};

/**
 *
 * @param {string} shopifyDomain
 * @returns {Promise<[*]>}
 */
export const getNotificationByDomain = async shopifyDomain => {
  try {
    const query = await collection.where('shopifyDomain', '==', shopifyDomain).get();
    const notifications = query.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: moment(doc.data().timestamp.toDate())
    }));
    const sortedNotifications = notifications.sort((a, b) => b.timestamp - a.timestamp);
    const formattedNotifications = sortedNotifications.map(notification => ({
      ...notification,
      timestamp: notification.timestamp.from(moment())
    }));
    return formattedNotifications;
  } catch (error) {
    console.log(error);
    return [];
  }
};
