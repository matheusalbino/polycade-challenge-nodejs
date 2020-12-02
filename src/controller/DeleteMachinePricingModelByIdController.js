import { Machine } from '../models/Machine';
import { PricingModel } from '../models/PricingModel';

export async function deleteMachinePricingModelByIdController (ctx) {
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

	const pricingModelDefault = await PricingModel.findOne({
		where: {name: 'Default'}
	});

	if (pricingModelDefault === null) {
		ctx.status = 404;
		return;
	}

	await machine.update({
		pricingModelId: pricingModelDefault.id
	});
	ctx.status = 200;
}
