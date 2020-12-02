import { Machine } from '../models/Machine';
import { PricingModel } from '../models/PricingModel';

export async function updateMachinePriceModelByIdController (ctx) {
	const {machineId, pmId}= ctx.params;

	const machine = await Machine.findOne({
		where: {id: machineId}
	});

	if (machine === null) {
		ctx.status = 404;
		return;
	}

	const pricingModel = await PricingModel.findOne({
		where: {id: pmId}
	});

	if (pricingModel === null) {
		ctx.status = 404;
		return;
	}

	await machine.update({
		pricingModelId: pricingModel.id
	});
	ctx.status = 200;
}
