/* eslint-disable camelcase */
'use strict';
const { v4 } = require('uuid');

async function insertPricingModel (queryInterface, partialData) {
	await queryInterface.bulkInsert('pricing_models', [{
		id: v4(),
		...partialData,
		created_at: new Date().toISOString(),
		updated_at: new Date().toISOString()
	}], {});
}

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const [pricingModels] = await queryInterface.sequelize.query('SELECT * FROM pricing_models;');
		const names = pricingModels.map(({name}) => name);

		if (!names.includes('Default')) {
			await insertPricingModel(queryInterface, {name: 'Default'});
		}

		if (!names.includes('Super Value Option')) {
			await insertPricingModel(queryInterface, {name: 'Super Value Option'});
		}

		if (!names.includes('Long Play')) {
			await insertPricingModel(queryInterface, {name: 'Long Play'});
		}
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('pricing_models', [], {});
	}
};
