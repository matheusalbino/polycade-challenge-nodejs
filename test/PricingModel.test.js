import supertest from 'supertest';
import app from '../src/server/app';
import { Price } from '../src/models/Price';
import { PricingModel } from '../src/models/PricingModel';

const request = supertest(app.callback());

describe('GET /pricing-models', () => {
	const PricingModelFindAllResult = [
		{
			id: '29faea04-33d8-4aa7-bcf9-aca89f7f553b',
			name: 'Default',
			createdAt: '2020-12-01T21:57:06.789Z',
			updatedAt: '2020-12-01T21:57:06.789Z'
		},
		{
			id: '0d0a9235-3fba-4879-a140-d6382f7f2c57',
			name: 'Super Value Option',
			createdAt: '2020-12-01T21:57:06.789Z',
			updatedAt: '2020-12-01T21:57:06.789Z'
		},
		{
			id: 'e8658cf5-dd8f-465e-848f-d75722539ca6',
			name: 'Long Play',
			createdAt: '2020-12-01T21:57:06.789Z',
			updatedAt: '2020-12-01T21:57:06.789Z'
		}
	];

	it('should returns all prices available and the default pricing model', async () => {
		jest.spyOn(PricingModel, 'findAll').mockResolvedValueOnce(PricingModelFindAllResult);

		const { status, body } = await request.get('/pricing-models');

		expect(status).toBe(200);
		expect(body).toHaveLength(3);
	});

	it('should also return the default pricing model', async () => {
		jest.spyOn(PricingModel, 'findAll').mockResolvedValueOnce(PricingModelFindAllResult);

		const { status, body } = await request.get('/pricing-models');

		expect(status).toBe(200);
		expect(body.some((item) => item.name === 'Default')).toBeTruthy();
	});
});

describe('POST /pricing-models', () => {
	it('should create a new pricing model and return the ID', async () => {
		jest.spyOn(PricingModel, 'create').mockResolvedValueOnce({ id: '29faea04-33d8-4aa7-bcf9-aca89f7f5555' });

		const payload = { name: 'New Pricing Model' };

		const { status, body } = await request
			.post('/pricing-models')
			.send(payload);

		expect(status).toBe(201);
		expect(body).toMatchObject({ id: '29faea04-33d8-4aa7-bcf9-aca89f7f5555' });
	});
});

describe('GET /pricing-models/:pm-id', () => {
	const PricingModelFindOneResult = {
		id: '29faea04-33d8-4aa7-bcf9-aca89f7f553b',
		name: 'Default',
		createdAt: '2020-12-01T21:57:06.789Z',
		updatedAt: '2020-12-01T21:57:06.789Z',
		prices: [
			{
				id: '0d0a9235-3fba-4879-a140-d6382f7f2c57',
				name: '10 minutes',
				value: 10,
				price: 3,
				createdAt: '2020-12-01T21:57:06.803Z',
				updatedAt: '2020-12-01T21:57:06.803Z'
			},
			{
				id: 'e8658cf5-dd8f-465e-848f-d75722539ca6',
				name: '20 minutes',
				value: 20,
				price: 5,
				createdAt: '2020-12-01T21:57:06.803Z',
				updatedAt: '2020-12-01T21:57:06.803Z'
			},
			{
				id: 'f1362033-b00d-4248-94c9-c19e7071e80a',
				name: '60 minutes',
				value: 60,
				price: 15,
				createdAt: '2020-12-01T21:57:06.803Z',
				updatedAt: '2020-12-01T21:57:06.803Z'
			}
		]
	};

	it('should return an individual pricing model and your configuration', async () => {
		jest.spyOn(PricingModel, 'findOne').mockResolvedValueOnce(PricingModelFindOneResult);

		const { status, body } = await request.get(`/pricing-models/${PricingModelFindOneResult.id}`);

		expect(status).toBe(200);
		expect(body).toMatchObject(PricingModelFindOneResult);
		expect(body.name).not.toBeUndefined();
		expect(body.prices).toHaveLength(3);
	});

	it('should return 404 if pricing model not exits', async () => {
		jest.spyOn(PricingModel, 'findOne').mockResolvedValueOnce(null);

		const { status } = await request.get(`/pricing-models/${PricingModelFindOneResult.id}`);

		expect(status).toBe(404);
	});
});

describe('PUT /pricing-models/:pm-id', () => {
	const PricingModelFindOneResult = {
		id: '29faea04-33d8-4aa7-bcf9-aca89f7f553b',
		name: 'Default',
		createdAt: '2020-12-01T21:57:06.789Z',
		updatedAt: '2020-12-01T21:57:06.789Z',
		update: jest.fn()
	};

	const payload = {
		...PricingModelFindOneResult,
		name: 'Default 2'
	};

	it('should update an existing pricing model meta-data', async () => {
		jest.spyOn(PricingModel, 'findOne').mockResolvedValueOnce(PricingModelFindOneResult);

		const { status } = await request
			.put(`/pricing-models/${PricingModelFindOneResult.id}`)
			.send(payload);

		expect(status).toBe(200);
	});

	it('should do not update the pricing configuration', async () => {
		jest.spyOn(PricingModel, 'findOne').mockResolvedValueOnce(PricingModelFindOneResult);

		const { status } = await request
			.put(`/pricing-models/${PricingModelFindOneResult.id}`)
			.send(payload);

		expect(status).toBe(200);
		expect(PricingModelFindOneResult.update).toHaveBeenCalledWith({ name: payload.name });
	});
});

describe('GET /pricing-models/:pm-id/prices', () => {
	const PriceFindAllResult = [
		{
			id: '0d0a9235-3fba-4879-a140-d6382f7f2c57',
			name: '10 minutes',
			value: 10,
			price: 3,
			pricingModelId: '29faea04-33d8-4aa7-bcf9-aca89f7f553b',
			createdAt: '2020-12-01T21:57:06.803Z',
			updatedAt: '2020-12-01T21:57:06.803Z'
		},
		{
			id: 'e8658cf5-dd8f-465e-848f-d75722539ca6',
			name: '20 minutes',
			value: 20,
			price: 5,
			pricingModelId: '29faea04-33d8-4aa7-bcf9-aca89f7f553b',
			createdAt: '2020-12-01T21:57:06.803Z',
			updatedAt: '2020-12-01T21:57:06.803Z'
		},
		{
			id: 'f1362033-b00d-4248-94c9-c19e7071e80a',
			name: '60 minutes',
			value: 60,
			price: 15,
			pricingModelId: '29faea04-33d8-4aa7-bcf9-aca89f7f553b',
			createdAt: '2020-12-01T21:57:06.803Z',
			updatedAt: '2020-12-01T21:57:06.803Z'
		}
	];

	it('should returns the prices configured for a specific pricing model', async () => {
		jest.spyOn(Price, 'findAll').mockResolvedValueOnce(PriceFindAllResult);

		const { status, body } = await request.get('/pricing-models/29faea04-33d8-4aa7-bcf9-aca89f7f553b/prices');

		expect(status).toBe(200);
		expect(body).toHaveLength(3);
		expect(body).toMatchObject(PriceFindAllResult);
	});

	it('should return 404 if pricing model not exits', async () => {
		jest.spyOn(Price, 'findAll').mockResolvedValueOnce([]);

		const { status } = await request.get('/pricing-models/29faea04-33d8-4aa7-bcf9-aca89f7f553b/prices');

		expect(status).toBe(404);
	});
});

describe('POST /pricing-models/:pm-id/prices', () => {
	const PricingModelFindOneResult = {
		id: '29faea04-33d8-4aa7-bcf9-aca89f7f553b',
		name: 'Default',
		createdAt: '2020-12-01T21:57:06.789Z',
		updatedAt: '2020-12-01T21:57:06.789Z'
	};

	it('should adds a new price configuration for a pricing model', async () => {
		jest.spyOn(PricingModel, 'findOne').mockResolvedValueOnce(PricingModelFindOneResult);
		jest.spyOn(Price, 'create').mockResolvedValueOnce({ id: '29faea04-33d8-4aa7-bcf9-aca89f7f5531' });

		const payload = { name: 'New Price', price: 3, value: 10 };

		const { status, body } = await request
			.post(`/pricing-models/${PricingModelFindOneResult.id}/prices`)
			.send(payload);

		expect(status).toBe(201);
		expect(body).toMatchObject({
			id: '29faea04-33d8-4aa7-bcf9-aca89f7f5531'
		});
	});
});

describe('DELETE /pricing-models/:pm-id/prices/:price-id', () => {
	const PricingModelFindOneResult = {
		id: '29faea04-33d8-4aa7-bcf9-aca89f7f5544',
		name: 'Default',
		createdAt: '2020-12-01T21:57:06.789Z',
		updatedAt: '2020-12-01T21:57:06.789Z'
	};
	const PriceFindOneResult = {
		id: '32faea04-33d8-4aa7-bcf9-aca89f7f553b',
		name: 'Default',
		createdAt: '2020-12-01T21:57:06.789Z',
		updatedAt: '2020-12-01T21:57:06.789Z',
		destroy: jest.fn()
	};

	it('should removes a price configuration from a pricing model', async () => {
		jest.spyOn(PricingModel, 'findOne').mockResolvedValueOnce(PricingModelFindOneResult);
		jest.spyOn(Price, 'findOne').mockResolvedValueOnce(PriceFindOneResult);

		const { status } = await request.delete(
			`/pricing-models/${PricingModelFindOneResult.id}/prices/${PriceFindOneResult.id}`
		);

		expect(status).toBe(200);
		expect(PriceFindOneResult.destroy).toHaveBeenCalled();
	});

	it('should return 404 if pricing model not exits', async () => {
		jest.spyOn(PricingModel, 'findOne').mockResolvedValueOnce(null);

		const { status } = await request.delete(
			`/pricing-models/${PricingModelFindOneResult.id}/prices/${PriceFindOneResult.id}`
		);

		expect(status).toBe(404);
	});

	it('should return 404 if price configuration not exits', async () => {
		jest.spyOn(PricingModel, 'findOne').mockResolvedValueOnce(PricingModelFindOneResult);
		jest.spyOn(Price, 'findOne').mockResolvedValueOnce(null);

		const { status } = await request.delete(
			`/pricing-models/${PricingModelFindOneResult.id}/prices/${PriceFindOneResult.id}`
		);

		expect(status).toBe(404);
	});
});
