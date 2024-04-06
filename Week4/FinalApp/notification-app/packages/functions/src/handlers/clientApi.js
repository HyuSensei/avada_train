import App from 'koa';
import router from '../routes/clientApi';
import {handleError} from '../services/errorService';

const cors = require('koa-cors');
const clientApi = new App();
clientApi.proxy = true;
clientApi.use(cors());
clientApi.use(router.allowedMethods());
clientApi.use(router.routes());
clientApi.on('error', handleError);

export default clientApi;
