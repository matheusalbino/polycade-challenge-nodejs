import { Price } from '../models/Price';
import { PricingModel } from '../models/PricingModel';

export async function createPriceByPricingModelIdController (ctx) {
	const { pmId } = ctx.params;
	const { name, price, value } = ctx.request.body;

	const pricingModel = await PricingModel.findOne({ where: {id: pmId} });

	if (pricingModel !== null) {

		const data = await Price.create({
			name,
			price,
			value,
			pricingModelId: pricingModel.id
		});

		ctx.status = 201;
		ctx.body = {id: data.id};
	}
}
