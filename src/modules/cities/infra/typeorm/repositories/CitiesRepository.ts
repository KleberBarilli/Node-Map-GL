import { getRepository, Repository } from 'typeorm';
import { IPaginateCity } from '@modules/cities/domain/models/IPaginateCity';
import { ICitiesRepository } from '@modules/cities/domain/repositories/ICitiesRepository';
import { ICreateCity } from '@modules/cities/domain/models/ICreateCity';
import City from '../entities/City';

export default class CitiesRepository implements ICitiesRepository {
	private ormRepository: Repository<City>;

	constructor() {
		this.ormRepository = getRepository(City);
	}

	public async findById(id: string): Promise<City | undefined> {
		const city = this.ormRepository.findOne({
			where: {
				id,
			},
		});
		return city;
	}

	public async findAllPaginate(): Promise<IPaginateCity> {
		const cities = await this.ormRepository
			.createQueryBuilder()

			.paginate();

		return cities as IPaginateCity;
	}

	public async findAll(): Promise<City[]> {
		const cities = await this.ormRepository.find({});

		return cities;
	}

	public async findAll_User_Cities(author_id: string): Promise<City[] | any> {
		const cities = await this.ormRepository.createQueryBuilder().where({
			author: author_id,
		});

		return cities;
	}

	public async create({
		name,
		state,
		country,
		population,
		latitude,
		longitude,
		image,
		description,
		tourist_places,
		author,
	}: ICreateCity): Promise<City> {
		const city = this.ormRepository.create({
			name,
			state,
			country,
			population,
			latitude,
			longitude,
			image,
			description,
			tourist_places,
			author,
		});

		await this.ormRepository.save(city);

		return city;
	}

	public async save(city: City): Promise<City> {
		await this.ormRepository.save(city);

		return city;
	}

	public async remove(city: City): Promise<void> {
		await this.ormRepository.remove(city);
	}
}
