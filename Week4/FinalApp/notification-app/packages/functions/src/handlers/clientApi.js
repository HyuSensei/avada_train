import App from 'koa';
import router from '../routes/clientApi';
import {handleError} from '../services/errorService';
const clientApi = new App();
clientApi.proxy = true;
clientApi.use(router.allowedMethods());
clientApi.use(router.routes());
clientApi.on('erro', handleError);

export default clientApi;
