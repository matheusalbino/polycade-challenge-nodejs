import Sequelize, { Model } from 'sequelize';

export class Machine extends Model {

	static init (sequelize) {
		super.init({
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true
			},
			name: Sequelize.STRING,
			pricingModelId: {
				type: Sequelize.UUID,
				allowNull: false
			}
		}, {
			sequelize
		});

		return this;
	}

	static associate (models) {
		this.belongsTo(models.PricingModel, { foreignKey: 'pricing_model_id' });
	}
}
