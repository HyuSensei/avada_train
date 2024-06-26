import Router from 'koa-router';
import * as webhookController from '../controllers/webhook/webhookController';

const router = new Router({
  prefix: '/webhook'
});
router.post('/order/new', webhookController.listenNewOrder);

export default router;
