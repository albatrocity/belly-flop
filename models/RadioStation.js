const keystone = require('keystone')
const Types = keystone.Field.Types

const RadioStation = new keystone.List('RadioStation', {
  inherits: keystone.list('Organization'),
  hidden: false
})

RadioStation.add({
  type: { type: Types.Select, initial: true, options: 'college, community, corporate'}
})

/**
 * Registration
 */
RadioStation.defaultColumns = 'name, location'
RadioStation.relationship({ path: 'contacts', ref: 'User', refPath: 'organizations' })
RadioStation.register()
