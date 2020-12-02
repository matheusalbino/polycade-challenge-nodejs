/* eslint-disable camelcase */
'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('machines', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID
			},
			name: {
				type: Sequelize.STRING
			},
			pricing_model_id: {
				allowNull: false,
				type: Sequelize.UUID,
				references: { model: 'pricing_models', key: 'id' }
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
		await queryInterface.dropTable('machines');
	}
};
