
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('states').del()
    .then(function () {
      // Inserts seed entries
      return knex('states').insert([
        {id: 1, name: 'Abia State', country_id: 1, state_code: 'AB', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' }, 
        {id: 2, name: 'Adamawa State', country_id: 1, state_code: 'AD', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },
        {id: 3, name: 'Akwa Ibom State', country_id: 1, state_code: 'AK', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' }, 
        {id: 4, name: 'Anambra State', country_id: 1, state_code: 'AN', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },
        {id: 5, name: 'Bauchi State', country_id: 1, state_code: 'BA', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' }, 
        {id: 6, name: 'Bayelsa State', country_id: 1, state_code: 'BY', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' }, 
        {id: 7, name: 'Benue State', country_id: 1, state_code: 'BE', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },
        {id: 8, name: 'Borno State', country_id: 1, state_code: 'BO', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' }, 
        {id: 9, name: 'Cross River State', country_id: 1, state_code: 'AB', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },
        {id: 10, name: 'Delta State', country_id: 1, state_code: 'DE', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' }, 
        {id: 11, name: 'Ebonyi State', country_id: 1, state_code: 'EB', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },
        {id: 12, name: 'Edo State', country_id: 1, state_code: 'ED', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 13, name: 'Ekiti State', country_id: 1, state_code: 'EK', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 14, name: 'Enugu State', country_id: 1, state_code: 'EN', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 15, name: 'Gombe State', country_id: 1, state_code: 'GO', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 16, name: 'Imo State', country_id: 1, state_code: 'IM', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 17, name: 'Jigawa State', country_id: 1, state_code: 'JI', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 18, name: 'Kaduna State', country_id: 1, state_code: 'KD', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 19, name: 'Kano State', country_id: 1, state_code: 'KN', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 20, name: 'Katsina State', country_id: 1, state_code: 'KT', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 21, name: 'Kebbi State', country_id: 1, state_code: 'KE', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 22, name: 'Kogi State', country_id: 1, state_code: 'KO', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 23, name: 'Kwara State', country_id: 1, state_code: 'KW', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 24, name: 'Lagos State', country_id: 1, state_code: 'LA', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 25, name: 'Nasarawa State', country_id: 1, state_code: 'NA', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 26, name: 'Niger State', country_id: 1, state_code: 'NI', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 27, name: 'Ogun State', country_id: 1, state_code: 'OG', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 28, name: 'Ondo State', country_id: 1, state_code: 'ON', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 29, name: 'Osun State', country_id: 1, state_code: 'OS', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 30, name: 'Oyo State', country_id: 1, state_code: 'OY', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 31, name: 'Plateau State', country_id: 1, state_code: 'PL', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 32, name: 'Rivers State', country_id: 1, state_code: 'RV', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 33, name: 'Sokoto State', country_id: 1, state_code: 'SO', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 34, name: 'Taraba State', country_id: 1, state_code: 'TA', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 35, name: 'Yobe State', country_id: 1, state_code: 'YO', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 36, name: 'Zamfara State', country_id: 1, state_code: 'ZA', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
        {id: 37, name: 'Federal Capital Territory', country_id: 1, state_code: 'FC', created_at: '2020-06-13 00:26:37 AM', updated_at: '2020-06-13 00:26:37 AM' },  
      ]);
    });
};                                                              
      