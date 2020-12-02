/* eslint-disable camelcase */
'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('pricing_models', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID
			},
			name: {
				type: Sequelize.STRING,
				unique: true
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('pricing_models');
	}
};
