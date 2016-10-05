const keystone = require('keystone')
const Types = keystone.Field.Types

const RecordStore = new keystone.List('RecordStore', {
  inherits: keystone.list('Organization'),
  hidden: false
})

RecordStore.add(
  'Sales',
  {saleType: { type: Types.Select, initial: true, options: 'commission, outright, other', label: 'Record Sale Type' }
})

/**
 * Registration
 */
RecordStore.defaultColumns = 'name, location'
RecordStore.relationship({ path: 'shows', ref: 'Show', refPath: 'venue' })
RecordStore.relationship({ path: 'contacts', ref: 'Contact', refPath: 'organization' })
RecordStore.register()
