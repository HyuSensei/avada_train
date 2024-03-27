import App from 'koa';
import router from '../routes/webhook';
const api = new App();
api.proxy = true;

api.use(router.allowedMethods());
api.use(router.routes());

export default api;
