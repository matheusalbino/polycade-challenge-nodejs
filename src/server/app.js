import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import PricingModelRoute from '../route/PricingModelRoute';
import '../database';
import MachineRoute from '../route/MachineRoute';

const app = new Koa();

app
	.use(bodyParser())
	.use(MachineRoute.routes())
	.use(PricingModelRoute.routes());

export default app;
