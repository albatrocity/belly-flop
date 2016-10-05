const keystone = require('keystone')
const Types = keystone.Field.Types
const fileStorage = require('../config/fileStorage')

/**
 * User Model
 * ==========
 */
const Resource = new keystone.List('Resource', {
  track: true,
  map: {name: 'description'}
})

Resource.add(
  'Resource', {
    description: { type: Types.Text, required: true, index: true, initial: true },
    file: { type: Types.File, storage: fileStorage.resources, initial: true },
    notes: { type: Types.Textarea, note: `usage information, what it's for, etc.`, initial: true}
  }, 'Related', {
    bands: { type: Types.Relationship, ref: 'Band', many: true, initial: true },
    releases: { type: Types.Relationship, ref: 'Release', many: true, initial: true }
  }
)

/**
 * Registration
 */
Resource.defaultColumns = 'description, file, notes'
Resource.register()
