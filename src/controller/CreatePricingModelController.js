import { PricingModel } from '../models/PricingModel';

export async function createPricingModelController (ctx) {
	const { name } = ctx.request.body;

	const data = await PricingModel.create({ name });

	ctx.status = 201;
	ctx.body = {id: data.id};
}
