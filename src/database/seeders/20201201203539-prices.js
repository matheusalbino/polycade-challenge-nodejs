/* eslint-disable camelcase */
'use strict';

const { v4 } = require('uuid');

async function getPricesName (queryInterface, pricingModelId) {
	const [prices] = await queryInterface.sequelize.query(`SELECT * FROM prices WHERE pricing_model_id = '${pricingModelId}';`);
	return prices.map(({name}) => name);
}

async function insertPrice (queryInterface, pricingModelId, partialData) {
	await queryInterface.bulkInsert('prices', [{
		id: v4(),
		pricing_model_id: pricingModelId,
		...partialData,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString()
	}], {});
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const [pricingModels] = await queryInterface.sequelize.query('SELECT * FROM pricing_models;');

		const prices = pricingModels.map(async (pricingModel) => {
			const names = await getPricesName(queryInterface, pricingModel.id);

			if (pricingModel.name === 'Default') {
				if (!names.includes('10 minutes')) {
					await insertPrice(queryInterface, pricingModel.id, {
						name: '10 minutes',
						value: 10,
						price: 3
					});
				}

				if (!names.includes('20 minutes')) {
					await insertPrice(queryInterface, pricingModel.id, {
						name: '20 minutes',
						value: 20,
						price: 5
					});
				}

				if (!names.includes('60 minutes')) {
					await insertPrice(queryInterface, pricingModel.id, {
						name: '60 minutes',
						value: 60,
						price: 15
					});
				}

			}

			if (pricingModel.name === 'Super Value Option') {
				if (!names.includes('10 minutes')) {
					await insertPrice(queryInterface, pricingModel.id, {
						name: '10 minutes',
						value: 10,
						price: 3
					});
				}

				if (!names.includes('20 minutes')) {
					await insertPrice(queryInterface, pricingModel.id, {
						name: '20 minutes',
						value: 20,
						price: 5
					});
				}
			}

			if (pricingModel.name === 'Long Play') {
				if (!names.includes('60 minutes')) {
					await insertPrice(queryInterface, pricingModel.id, {
						name: '60 minutes',
						value: 60,
						price: 15
					});
				}
			}
		});

		await Promise.all(prices);

	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('prices', [], {});
	}
};
