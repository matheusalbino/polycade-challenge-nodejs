import Router from 'koa-router';
import { PricingModelController } from '../controller/PricingModelController';

const router = new Router();
const controller = new PricingModelController();

export default router
	.prefix('/pricing-models')
	.get('/', controller.getAll)
	.post('/', controller.create)
	.get('/:pmId', controller.getById)
	.put('/:pmId', controller.updateMetaDataById)
	.get('/:pmId/prices', controller.getAllPricesByPricingModelId)
	.post('/:pmId/prices', controller.createPriceByPricingModelId)
	.delete('/:pmId/prices/:priceId', controller.removePriceById);
