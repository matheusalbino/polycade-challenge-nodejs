/* eslint-disable camelcase */
'use strict';
const { v4 } = require('uuid');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.bulkInsert('pricing_models', [{
			id: v4(),
			name: 'Default',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		}, {
			id: v4(),
			name: 'Super Value Option',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		}, {
			id: v4(),
			name: 'Long Play',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString()
		}], {});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('pricing_models', [], {});
	}
};
