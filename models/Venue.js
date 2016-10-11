const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * Place Model
 * ==========
 */

const Venue = new keystone.List('Venue', {
  inherits: keystone.list('Organization'),
  hidden: false
})

Venue.add(
  'Venue',
  {
    ageRestriction: { type: Types.Select, options: [
      {label: 'All Ages', value: 'all'},
      {label: '18+', value: '18'},
      {label: '21+', value: '21'}
    ]},
    hasSoundSystem: { type: Types.Boolean, default: true }
  }
)

/**
 * Registration
 */
Venue.defaultColumns = 'name, location'
Venue.relationship({ path: 'shows', ref: 'Show', refPath: 'venue' })
Venue.relationship({ path: 'contacts', ref: 'User', refPath: 'organizations' })
Venue.register()
