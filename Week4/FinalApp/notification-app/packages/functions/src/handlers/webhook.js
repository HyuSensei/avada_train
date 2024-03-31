import App from 'koa';
import router from '../routes/webhook';
import {handleError} from '../services/errorService';
const api = new App();
api.proxy = true;
api.use(router.allowedMethods());
api.use(router.routes());
api.on('erro', handleError);

export default api;
