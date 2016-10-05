exports.create = {
  User: [
    { 'name.first': 'Ross', 'name.last': 'Brown', 'email': 'albatrocity@gmail.com', 'password': 'password', 'isAdmin': true }
  ],
  Band: [
    {name: 'Berwanger'},
    {name: 'Bummer'},
    {name: 'The Conquerors'},
    {name: 'Fullbloods'},
    {name: 'Psychic Heat'},
    {name: 'Rooftop Vigilantes'},
    {name: 'Sex Snobs'},
    {name: 'Shy Boys'},
    {name: 'Snacky'}
  ],
  Venue: [
    {
      name: 'Replay Lounge',
      website: 'http://www.replaylounge.com/contact.html',
      hasSoundSystem: true,
      ageRestriction: '21',
      location: {
        country: 'USA',
        postcode: '66044',
        state: 'KS',
        suburb: 'Lawrence',
        street1: '946 Massachusettes'
      }
    },
    {
      name: 'The Brick',
      website: 'http://thebrickkcmo.com',
      hasSoundSystem: true,
      ageRestriction: '21',
      location: {
        country: 'USA',
        postcode: '64108',
        state: 'MO',
        suburb: 'Kansas City',
        street1: '1727 McGee'
      }
    }
  ],
  RecordStore: [
    {
      name: 'Love Garden',
      website: 'http://www.lovegardensounds.com',
      saleType: 'outright',
      location: {
        country: 'USA',
        postcode: '66044',
        state: 'MO',
        suburb: 'Lawrence',
        street1: '822 Massachusetts St.'
      }
    },
    {
      name: 'Mills Record Company',
      website: 'http://millsrecordcompany.com',
      saleType: 'outright',
      location: {
        country: 'USA',
        postcode: '64111',
        state: 'MO',
        suburb: 'Kansas City',
        street1: '4045 Broadway Blvd'
      }
    },
    {
      name: 'Josey Records',
      website: 'http://joseyrecords.com',
      saleType: 'outright',
      location: {
        country: 'USA',
        postcode: '64108',
        state: 'MO',
        suburb: 'Kansas City',
        street1: '1814 Oak St'
      }
    }
  ]
}
