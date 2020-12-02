/* eslint-disable camelcase */
'use strict';

const { v4 } = require('uuid');

async function insertMachine (queryInterface, pricingModelId, partialData) {
	await queryInterface.bulkInsert('machines', [{
		id: v4(),
		pricing_model_id: pricingModelId,
		...partialData,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString()
	}], {});
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const [listMachine] = await queryInterface.sequelize.query('SELECT * FROM machines;');
		const names = listMachine.map(({name}) => name);
		const [pricingModels] = await queryInterface.sequelize.query('SELECT * FROM pricing_models;');

		const machines = pricingModels.map(async (pricingModel) => {
			if (pricingModel.name === 'Default') {
				if (!names.includes('Machine 2')) {
					await insertMachine(queryInterface, pricingModel.id, {name: 'Machine 2'});
				}

				if (!names.includes('Machine 4')) {
					await insertMachine(queryInterface, pricingModel.id, {name: 'Machine 4'});
				}
			}

			if (pricingModel.name === 'Super Value Option') {
				if (!names.includes('Machine 1')) {
					await insertMachine(queryInterface, pricingModel.id, {name: 'Machine 1'});
				}
			}

			if (pricingModel.name === 'Long Play') {
				if (!names.includes('Machine 3')) {
					await insertMachine(queryInterface, pricingModel.id, {name: 'Machine 3'});
				}
			}
		});

		await Promise.all(machines);

	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('machines', [], {});
	}
};
