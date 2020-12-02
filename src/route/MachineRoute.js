import Router from 'koa-router';
import { MachineController } from '../controller/MachineController';

const router = new Router();
const controller = new MachineController();

export default router
	.prefix('/machines')
	.get('/', controller.getAll)
	.get('/:machineId', controller.getById)
	.put('/:machineId/prices/:pmId', controller.updateMachinePricingModelById)
	.delete('/:machineId/prices/:pmId', controller.removeMachinePricingModelById)
	.get('/:machineId/prices', controller.getAllPricesByMachineId)
;
