import { Machine } from '../models/Machine';
import { Price } from '../models/Price';

export async function getAllMachinePricesByIdController (ctx) {
	const {machineId} = ctx.params;

	const machine = await Machine.findOne({
		where: {id: machineId}
	});

	if (machine === null) {
		ctx.status = 404;
		return;
	}

	const prices = await Price.findAll({
		where: {
			pricingModelId: machine.pricingModelId
		}
	});

	ctx.status = 200;
	ctx.body = prices;
}
