import Router from 'koa-router';
import * as notificationController from '../controllers/notificationController';

const router = new Router();
router.get('/notifications', notificationController.list);

export default router;
