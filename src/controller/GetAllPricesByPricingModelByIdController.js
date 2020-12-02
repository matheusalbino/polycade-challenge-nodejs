import { Price } from '../models/Price';

export async function getAllPricesByPricingModelByIdController (ctx) {
	const { pmId } = ctx.params;

	const data = await Price.findAll({
		where: {
			pricingModelId: pmId
		}
	});

	if (data.length === 0) {
		ctx.status = 404;
	} else {
		ctx.status = 200;
		ctx.body = data;
	}
}
