const { getContactById } = require('../services/contact.service');
const {Contact} = require('../models/contacts');

describe('Contact Service getPostById test', () => {
    it('should return post data by providen ID', async () => {
        const mContactId = '1';
        const mUserId = '2';

        const contact = {
            _id: mContactId,
            name: 'Name',
            userId: mUserId,
            email: 'Email@test.com',
            phone: '0378733298',
            favorite: false
        };

        jest.spyOn(Contact, 'findOne').mockImplementationOnce(async () => (contact));
        const result = await getContactById(mContactId, mUserId);

        expect(result._id).toEqual(mContactId);
        expect(result.userId).toEqual(mUserId);
        expect(result.email).toBeDefined();
        expect(result.phone).toBeDefined();

    
    });
});