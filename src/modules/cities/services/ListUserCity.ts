import { inject, injectable } from 'tsyringe';
import CitiesRepository from '../infra/typeorm/repositories/CitiesRepository';
import { IPaginateCity } from '../domain/models/IPaginateCity';
import RedisCache from '@shared/cache/RedisCache';

@injectable()
export default class ListUserCity {
	constructor(
		@inject('CitiesRepository') private citiesRepository: CitiesRepository,
	) {}

	async execute(user_id: string): Promise<IPaginateCity | null> {
		let listCities = await RedisCache.recover<IPaginateCity>(`user-cities`);

		if (!listCities) {
			const cities = await this.citiesRepository.findAllByUserId(user_id);
			RedisCache.save(`user-cities${user_id}`, cities);

			return cities;
		}

		return listCities;
	}
}
