import supertest from 'supertest';
import app from '../src/server/app';
import { Machine } from '../src/models/Machine';
import { Price } from '../src/models/Price';
import { PricingModel } from '../src/models/PricingModel';

const request = supertest(app.callback());

describe('GET /machines', () => {
	const MachineFindAllResult = [
		{
			id: '99ade105-dee1-49eb-8ac4-e4d272f89fba',
			name: 'Machine 1',
			pricingModelId: '3ba92095-3203-4888-a464-3c7d5d9acd7e',
			createdAt: '2020-12-02T19:10:26.009Z',
			updatedAt: '2020-12-02T19:10:26.009Z'
		},
		{
			id: '0d0a9235-3fba-4879-a140-d6382f7f2c57',
			name: 'Machine 2',
			pricingModelId: '3ba92095-3203-4888-a464-3c7d5d9acd7e',
			createdAt: '2020-12-02T19:10:26.009Z',
			updatedAt: '2020-12-02T19:10:26.009Z'
		},
		{
			id: 'e8658cf5-dd8f-465e-848f-d75722539ca6',
			name: 'Machine 3',
			pricingModelId: '3ba92095-3203-4888-a464-3c7d5d9acd7e',
			createdAt: '2020-12-02T19:10:26.009Z',
			updatedAt: '2020-12-02T19:10:26.009Z'
		}
	];

	it('should return all the machines available', async () => {
		jest.spyOn(Machine, 'findAll').mockResolvedValueOnce(MachineFindAllResult);

		const { status, body } = await request.get('/machines');

		expect(status).toBe(200);
		expect(body).toHaveLength(3);
	});
});

describe('GET /machines/:machine-id', () => {
	const MachineFindOneResult = {
		id: 'f1067839-52fa-45f2-aa91-883fdb871770',
		name: 'Machine 2',
		createdAt: '2020-12-02T19:10:26.030Z',
		updatedAt: '2020-12-02T19:10:26.030Z',
		pricingModel: {
			id: '56a57e6f-c812-42f7-8939-35e571a57a75',
			name: 'Default',
			createdAt: '2020-12-02T19:10:25.989Z',
			updatedAt: '2020-12-02T19:10:25.989Z',
			prices: [
				{
					id: '42ab23ef-8c7f-4550-8271-0284a25d2996',
					name: '10 minutes',
					price: 3,
					value: 10,
					createdAt: '2020-12-02T19:10:26.009Z',
					updatedAt: '2020-12-02T19:10:26.009Z'
				},
				{
					id: '5711fd02-8f44-41bc-b341-b306e88a5eea',
					name: '20 minutes',
					price: 5,
					value: 20,
					createdAt: '2020-12-02T19:10:26.016Z',
					updatedAt: '2020-12-02T19:10:26.016Z'
				},
				{
					id: 'b4a06253-9e86-4b09-8aec-576819c5252c',
					name: '60 minutes',
					price: 15,
					value: 60,
					createdAt: '2020-12-02T19:10:26.022Z',
					updatedAt: '2020-12-02T19:10:26.022Z'
				}
			]
		}
	};

	it('should return an individual machines and your configuration', async () => {
		jest.spyOn(Machine, 'findOne').mockResolvedValueOnce(MachineFindOneResult);

		const { status, body } = await request.get(`/machines/${MachineFindOneResult.id}`);

		expect(status).toBe(200);
		expect(body).toMatchObject(MachineFindOneResult);
	});

	it('should return 404 if machine not exists', async () => {
		jest.spyOn(Machine, 'findOne').mockResolvedValueOnce(null);

		const { status } = await request.get(`/machines/${MachineFindOneResult.id}`);

		expect(status).toBe(404);
	});
});

describe('PUT /machines/:machine-id/prices/:pm-id', () => {
	const MachineFindOneResult = {
		id: '99ade105-dee1-49eb-8ac4-e4d272f89fba',
		name: 'Machine 1',
		pricingModelId: '3ba92095-3203-4888-a464-3c7d5d9acd7e',
		update: jest.fn()
	};
	const PricingModelFindOneResult = {
		id: '29faea04-33d8-4aa7-bcf9-aca89f7f553b',
		name: 'Default',
		createdAt: '2020-12-01T21:57:06.789Z',
		updatedAt: '2020-12-01T21:57:06.789Z'
	};

	it('should set the pricing model for an individual machine', async () => {
		jest.spyOn(Machine, 'findOne').mockResolvedValueOnce(MachineFindOneResult);
		jest.spyOn(PricingModel, 'findOne').mockResolvedValueOnce(PricingModelFindOneResult);

		const { status } = await request.put(
			`/machines/${MachineFindOneResult.id}/prices/${PricingModelFindOneResult.id}`
		);

		expect(status).toBe(200);
		expect(MachineFindOneResult.update).toHaveBeenCalledWith({
			pricingModelId: PricingModelFindOneResult.id
		});
	});

	it('should return 404 if the machine is not found', async () => {
		jest.spyOn(Machine, 'findOne').mockResolvedValueOnce(null);

		const { status } = await request.put(
			`/machines/${MachineFindOneResult.id}/prices/${PricingModelFindOneResult.id}`
		);

		expect(status).toBe(404);
	});

	it('should return 404 if the pricing model is not found', async () => {
		jest.spyOn(Machine, 'findOne').mockResolvedValueOnce(MachineFindOneResult);
		jest.spyOn(PricingModel, 'findOne').mockResolvedValueOnce(null);

		const { status } = await request.put(
			`/machines/${MachineFindOneResult.id}/prices/${PricingModelFindOneResult.id}`
		);

		expect(status).toBe(404);
	});
});

describe('DELETE /machines/:machine-id/prices/:pm-id', () => {
	const MachineFindOneResult = {
		id: '99ade105-dee1-49eb-8ac4-e4d272f89fba',
		name: 'Machine 1',
		pricingModelId: '3ba92095-3203-4888-a464-3c7d5d9acd7e',
		update: jest.fn()
	};
	const PricingModelFindOneResult = {
		id: '29faea04-33d8-4aa7-bcf9-aca89f7f553b',
		name: 'Pricing Model',
		createdAt: '2020-12-01T21:57:06.789Z',
		updatedAt: '2020-12-01T21:57:06.789Z'
	};
	const DefaultPricingModelFindOneResult = {
		id: '29faea04-33d8-4aa7-bcf9-aca89f7f553b',
		name: 'Defailt',
		createdAt: '2020-12-01T21:57:06.789Z',
		updatedAt: '2020-12-01T21:57:06.789Z'
	};

	it('should removes the pricing model from the machine', async () => {
		jest.spyOn(Machine, 'findOne').mockResolvedValueOnce(MachineFindOneResult);
		jest.spyOn(PricingModel, 'findOne').mockImplementation((params) => {
			if (params.where.id !== undefined) {
				return PricingModelFindOneResult;
			}

			return DefaultPricingModelFindOneResult;
		});

		const { status } = await request.delete(
			`/machines/${MachineFindOneResult.id}/prices/${PricingModelFindOneResult.id}`
		);

		expect(status).toBe(200);
	});
});

describe('GET /machines/:machine-id/prices', () => {
	const MachineFindOneResult = {
		id: '99ade105-dee1-49eb-8ac4-e4d272f89fba',
		name: 'Machine 1',
		pricingModelId: '3ba92095-3203-4888-a464-3c7d5d9acd7e'
	};
	const PriceFindAllResult = [
		{
			id: '0d0a9235-3fba-4879-a140-d6382f7f2c57',
			name: '10 minutes',
			value: 10,
			price: 3,
			pricingModelId: MachineFindOneResult.pricingModelId,
			createdAt: '2020-12-01T21:57:06.803Z',
			updatedAt: '2020-12-01T21:57:06.803Z'
		},
		{
			id: 'e8658cf5-dd8f-465e-848f-d75722539ca6',
			name: '20 minutes',
			value: 20,
			price: 5,
			pricingModelId: MachineFindOneResult.pricingModelId,
			createdAt: '2020-12-01T21:57:06.803Z',
			updatedAt: '2020-12-01T21:57:06.803Z'
		},
		{
			id: 'f1362033-b00d-4248-94c9-c19e7071e80a',
			name: '60 minutes',
			value: 60,
			price: 15,
			pricingModelId: MachineFindOneResult.pricingModelId,
			createdAt: '2020-12-01T21:57:06.803Z',
			updatedAt: '2020-12-01T21:57:06.803Z'
		}
	];

	it('should return the pricing model and price configurations set for a given machine', async () => {
		jest.spyOn(Machine, 'findOne').mockResolvedValueOnce(MachineFindOneResult);
		jest.spyOn(Price, 'findAll').mockResolvedValueOnce(PriceFindAllResult);

		const { status, body } = await request.get(`/machines/${MachineFindOneResult.id}/prices`);

		expect(status).toBe(200);
		expect(body).toHaveLength(3);
	});

	it('should return 404 if the machine is not found', async () => {
		jest.spyOn(Machine, 'findOne').mockResolvedValueOnce(null);

		const { status } = await request.get(`/machines/${MachineFindOneResult.id}/prices`);

		expect(status).toBe(404);
	});
});
