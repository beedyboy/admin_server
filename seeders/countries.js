
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('countries').del()
    .then(function () {
      // Inserts seed entries
      return knex('countries').insert([
        {id: 1, name: 'Nigeria', code: 'NG', code2: 'NGA', phonecode: '234', capital: 'Abuja', currency: 'NGN', created_at: '2020-06-12 10:49:11 AM', updated_at: '2020-06-12 10:55:41 PM'}
      ]);
    });
};
 
        