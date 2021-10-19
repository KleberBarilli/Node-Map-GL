import { IUser } from '@modules/users/domain/models/IUser';

export interface ICity {
	id: string;
	name: string;
	state: string;
	country: string;
	population: number;
	latitude: number;
	longitude: number;
	image: string;
	description: string;
	tourist_places: string;
	author: IUser;
	created_at: Date;
	updated_at: Date;
	getImageUrl(): string | null;
}
