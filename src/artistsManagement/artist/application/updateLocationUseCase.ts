import { Artist } from '../domain/entities/artist';
import { ArtistRepository } from '../domain/repositories/artistRepository';

export class UpdateLocationUseCase {

    constructor(readonly ArtistRepository: ArtistRepository) { }

    async run(
        id: number,
        location: string

    ): Promise< Artist |boolean | string| null | Error> {
        try {
            if (!id) {
                return null;
            }

            const validateArtist = await this.ArtistRepository.updateLocation(id, location);
            if (validateArtist === null) {
                return null;
            }

            return validateArtist;
        } catch (error) {
            return null;
        }
    }
}