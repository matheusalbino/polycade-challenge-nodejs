/* eslint-disable camelcase */
'use strict';

const { v4 } = require('uuid');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const [pricingModels] = await queryInterface.sequelize.query('SELECT * FROM pricing_models;');

		const prices = pricingModels.map(async (pricingModel) => {

			if (pricingModel.name === 'Default') {
				await queryInterface.bulkInsert('prices', [{
					id: v4(),
					pricing_model_id: pricingModel.id,
					name: '10 minutes',
					value: 10,
					price: 3,
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString()
				}, {
					id: v4(),
					pricing_model_id: pricingModel.id,
					name: '20 minutes',
					value: 20,
					price: 5,
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString()
				}, {
					id: v4(),
					pricing_model_id: pricingModel.id,
					name: '60 minutes',
					value: 60,
					price: 15,
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString()
				}], {});
			}

			if (pricingModel.name === 'Super Value Option') {
				await queryInterface.bulkInsert('prices', [{
					id: v4(),
					pricing_model_id: pricingModel.id,
					name: '10 minutes',
					value: 10,
					price: 3,
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString()
				}, {
					id: v4(),
					pricing_model_id: pricingModel.id,
					name: '20 minutes',
					value: 20,
					price: 5,
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString()
				}], {});
			}

			if (pricingModel.name === 'Long Play') {
				await queryInterface.bulkInsert('prices', [{
					id: v4(),
					pricing_model_id: pricingModel.id,
					name: '60 minutes',
					value: 60,
					price: 15,
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString()
				}], {});
			}

		});

		await Promise.all(prices);

	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('prices', [], {});
	}
};
