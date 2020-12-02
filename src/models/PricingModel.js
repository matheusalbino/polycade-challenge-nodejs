import Sequelize, { Model } from 'sequelize';

export class PricingModel extends Model {
	static init (sequelize) {
		super.init({
			id: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false
			},
			name: Sequelize.STRING
		}, {
			sequelize
		});

		return this;
	}

	static associate (models) {
		this.hasMany(models.Price, {as: 'prices'});
		this.hasMany(models.Machine, {as: 'machines'});
	}
}
