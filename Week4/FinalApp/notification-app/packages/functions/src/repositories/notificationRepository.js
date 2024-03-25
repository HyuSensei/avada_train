import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
const collection = firestore.collection('notifications');

export const getAllNotification = async () => {
  try {
    const query = await collection.get();
    const notifications = query.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate()
      };
    });
    return notifications;
  } catch (error) {
    console.log(error);
    return [];
  }
};
