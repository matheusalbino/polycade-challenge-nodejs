import { PricingModel } from '../models/PricingModel';

export async function updatePricingModelByIdController (ctx) {
	const { pmId } = ctx.params;
	const { name } = ctx.request.body;

	const data = await PricingModel.findOne({
		where: { id: pmId }
	});

	if (data !== null) {
		await data.update({ name });
		ctx.status = 200;
	} else {
		ctx.status = 404;
	}
}
