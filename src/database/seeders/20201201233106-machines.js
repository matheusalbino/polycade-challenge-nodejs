/* eslint-disable camelcase */
'use strict';

const { v4 } = require('uuid');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const [pricingModels] = await queryInterface.sequelize.query('SELECT * FROM pricing_models;');

		const machines = pricingModels.map(async (pricingModel) => {

			if (pricingModel.name === 'Default') {
				await queryInterface.bulkInsert('machines', [{
					id: v4(),
					pricing_model_id: pricingModel.id,
					name: 'Machine 2',
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString()
				}, {
					id: v4(),
					pricing_model_id: pricingModel.id,
					name: 'Machine 4',
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString()
				}], {});
			}

			if (pricingModel.name === 'Super Value Option') {
				await queryInterface.bulkInsert('machines', [{
					id: v4(),
					pricing_model_id: pricingModel.id,
					name: 'Machine 1',
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString()
				}], {});
			}

			if (pricingModel.name === 'Long Play') {
				await queryInterface.bulkInsert('machines', [{
					id: v4(),
					pricing_model_id: pricingModel.id,
					name: 'Machine 3',
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString()
				}], {});
			}

		});

		await Promise.all(machines);

	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('machines', [], {});
	}
};
