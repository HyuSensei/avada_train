import makeRequest from '../helpers/api/makeRequest';

const API_URL = `http://127.0.0.1:5011/notification-app-ddeee/us-central1/clientApi/notifications`;
export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const shopifyDomain = window.Shopify.shop;
    const {notifications, settings} = await makeRequest(
      API_URL + `?shopifyDomain=${shopifyDomain}`
    );

    return {notifications, settings};
  };
}
