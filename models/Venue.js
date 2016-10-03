const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * User Model
 * ==========
 */
const Venue = new keystone.List('Venue')

Venue.add({
  name: { type: Types.Text },
  location: { type: Types.Location },
  info: { type: Types.Textarea, initial: true, note: `other bands, etc.` },
  cost: { type: Types.Money, initial: true },
  age: { type: Types.Select, initial: true, options: [
    {value: 'all', label: 'All Ages'},
    {value: '18', label: '18+'},
    {value: '21', label: '21+'}
  ], default: 21 },
  notes: { type: Types.Textarea, initial: true, note: `how'd you set this up, etc.` },
  point_of_contact: { type: Types.Relationship, ref: 'Contact', many: true, label: 'Main Point of Contact' }
})

/**
 * Registration
 */
Venue.defaultColumns = 'name, location'
Venue.relationship({ path: 'shows', ref: 'Show', refPath: 'venue' })
Venue.relationship({ path: 'contacts', ref: 'Contact', refPath: 'venue' })
Venue.register()
