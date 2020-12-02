import { Price } from '../models/Price';
import { PricingModel } from '../models/PricingModel';

export async function deletePriceByIdController (ctx) {
	const { pmId, priceId } = ctx.params;

	const pricingModel = await PricingModel.findOne({
		where: {id: pmId}
	});
	if (pricingModel === null) {
		ctx.status = 404;
		return;
	}

	const price = await Price.findOne({
		where: {id: priceId}
	});

	if (price === null) {
		ctx.status = 404;
		return;
	}

	await price.destroy();
	ctx.status = 200;
}
