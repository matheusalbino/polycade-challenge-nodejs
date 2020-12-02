import Router from 'koa-router';
import { createPriceByPricingModelIdController } from '../controller/CreatePriceByPricingModelIdController';
import { createPricingModelController } from '../controller/CreatePricingModelController';
import { deletePriceByIdController } from '../controller/DeletePriceByIdController';
import { getAllPricesByPricingModelByIdController } from '../controller/GetAllPricesByPricingModelByIdController';
import { getAllPricingModelsController } from '../controller/GetAllPricingModelsController';
import { getPricingModelByIdController } from '../controller/GetPricingModelByIdController';
import { updatePricingModelByIdController } from '../controller/UpdatePricingModelByIdController';

const router = new Router();

export default router
	.prefix('/pricing-models')
	.get('/', getAllPricingModelsController)
	.post('/', createPricingModelController)
	.get('/:pmId', getPricingModelByIdController)
	.put('/:pmId', updatePricingModelByIdController)
	.get('/:pmId/prices', getAllPricesByPricingModelByIdController)
	.post('/:pmId/prices', createPriceByPricingModelIdController)
	.delete('/:pmId/prices/:priceId', deletePriceByIdController);
