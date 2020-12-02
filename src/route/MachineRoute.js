import Router from 'koa-router';
import { deleteMachinePricingModelByIdController } from '../controller/DeleteMachinePricingModelByIdController';
import { getAllMachinePricesByIdController } from '../controller/GetAllMachinePricesByIdController';
import { updateMachinePriceModelByIdController } from '../controller/UpdateMachinePriceModelByIdController';

const router = new Router();

export default router
	.prefix('/machines')
	.put('/:machineId/prices/:pmId', updateMachinePriceModelByIdController)
	.delete('/:machineId/prices/:pmId', deleteMachinePricingModelByIdController)
	.get('/:machineId/prices', getAllMachinePricesByIdController)
;
