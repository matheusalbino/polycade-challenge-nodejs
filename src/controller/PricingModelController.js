import { Price } from '../models/Price';
import { PricingModel } from '../models/PricingModel';

export class PricingModelController {

	async create (ctx) {
		const { name } = ctx.request.body;

		const data = await PricingModel.create({ name });

		ctx.status = 201;
		ctx.body = {id: data.id};
	}


	async createPriceByPricingModelId (ctx) {
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

	async getById (ctx) {
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

	async getAll (ctx) {
		const data = await PricingModel.findAll();

		ctx.status = 200;
		ctx.body = data;
	}

	async getAllPricesByPricingModelId (ctx) {
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

	async updateMetaDataById (ctx) {
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

	async removePriceById (ctx) {
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

}
