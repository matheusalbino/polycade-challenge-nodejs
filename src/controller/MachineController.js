import { Machine } from '../models/Machine';
import { Price } from '../models/Price';
import { PricingModel } from '../models/PricingModel';

export class MachineController {
	async getById (ctx) {
		const {machineId} = ctx.params;

		const machine = await Machine.findOne({
			where: { id: machineId },
			attributes: ['id', 'name', 'createdAt', 'updatedAt'],
			include: [{
				model: PricingModel,
				as: 'pricingModel',
				attributes: ['id', 'name', 'createdAt', 'updatedAt'],
				include: [{
					model: Price,
					as: 'prices',
					attributes: ['id', 'name', 'price', 'value', 'createdAt', 'updatedAt']
				}]
			}]
		});

		if (machine === null) {
			ctx.status = 404;
		} else {
			ctx.status = 200;
			ctx.body = machine;
		}
	}

	async getAll (ctx) {
		const machines = await Machine.findAll({
			attributes: ['id', 'name', 'pricingModelId', 'createdAt', 'updatedAt']
		});

		ctx.status = 200;
		ctx.body = machines;
	}

	async getAllPricesByMachineId (ctx) {
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
			},
			attributes: ['id', 'name', 'value', 'price', 'pricingModelId', 'createdAt', 'updatedAt']
		});

		ctx.status = 200;
		ctx.body = prices;
	}

	async updateMachinePricingModelById (ctx) {
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

		await machine.update({
			pricingModelId: pricingModel.id
		});
		ctx.status = 200;
	}


	async removeMachinePricingModelById (ctx) {
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

}
