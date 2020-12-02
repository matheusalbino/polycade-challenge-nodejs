import { PricingModel } from '../models/PricingModel';

export async function getAllPricingModelsController (ctx) {
	const data = await PricingModel.findAll();

	ctx.status = 200;
	ctx.body = data;
}
