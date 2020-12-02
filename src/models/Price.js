import Sequelize, { Model } from 'sequelize';

export class Price extends Model {

	static init (sequelize) {
		super.init({
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true
			},
			name: Sequelize.STRING,
			value: Sequelize.INTEGER,
			price: Sequelize.INTEGER,
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
