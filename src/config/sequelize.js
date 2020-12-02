module.exports = {
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	host: process.env.DB_HOSTNAME,
	port: process.env.DB_PORT,
	dialect: 'postgres',
	dialectOptions: {
		bigNumberStrings: true
	},
	define: {
		underscored: true,
		timestamps: true
	}
};
