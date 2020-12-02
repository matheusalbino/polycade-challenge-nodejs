import { PricingModel } from '../models/PricingModel';
import { Price } from '../models/Price';

export async function getPricingModelByIdController (ctx) {
	const { pmId } = ctx.params;

	const data = await PricingModel.findOne({
		where: {
			id: pmId
		},
		include: [{model: Price, as: 'prices', attributes: ['id', 'name', 'price', 'value', 'createdAt', 'updatedAt']}]
	});

	if (data !== null) {
		ctx.status = 200;
		ctx.body = data;
	} else {
		ctx.status = 404;
	}
}
