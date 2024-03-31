import Router from 'koa-router';
import {list} from '../controllers/notificationController';

const router = new Router();
router.get('/notifications', list);
export default router;
