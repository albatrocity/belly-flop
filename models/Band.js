const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * User Model
 * ==========
 */
const Band = new keystone.List('Band')

Band.add({
  name: { type: Types.Text, required: true, index: true },
  bio: { type: Types.Textarea, initial: true },
  members: { type: Types.Relationship, ref: 'User', many: true },
  photos: { type: Types.CloudinaryImages, autoCleanup : true, select : true }
})

/**
 * Registration
 */
Band.defaultColumns = 'name'
Band.relationship({ path: 'shows', ref: 'Show', refPath: 'bands' })
Band.register()
