import Sequelize from 'sequelize';
import config from '../config/sequelize';
import { Price } from '../models/Price';
import { PricingModel } from '../models/PricingModel';
import { Machine } from '../models/Machine';

const database = new Sequelize(config.database, config.username, config.password, config);

const models = [PricingModel, Price, Machine];

models
	.map(model => model.init(database))
	.forEach(model => model.associate(database.models));

export default database;
