import { RestOrganisation } from './RestOrganisation'
import axios from 'axios';
jest.mock('axios');


describe('Organisations API', () => {
    describe('Call Get All Organisations', () => {
        it('should return a response', async ()  => {
           
            const expected = 'Network error: Something went wrong';

            const mockedAxios = axios as jest.MockedFunction<typeof axios>;
            mockedAxios.mockRejectedValue('Network error: Something went wrong');
            const organisationAPI = new RestOrganisation();                

            const result = await organisationAPI.getAllOrganisations();
            
            expect(result).toEqual(expected);
          })
    })
})