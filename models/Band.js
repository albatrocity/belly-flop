const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * User Model
 * ==========
 */
const Band = new keystone.List('Band', {
  track: true,
  autokey: { path: 'slug', from: 'name', unique: true },
  defaultSort: 'name'
})

Band.add({
  name: { type: Types.Text, required: true, index: true },
  bio: { type: Types.Html, wysiwyg: true, initial: true },
  members: { type: Types.Relationship, ref: 'User', many: true, initial: true },
  photos: { type: Types.CloudinaryImages, autoCleanup : true, select : true },
  booking_email: { type: Types.Email, initial: true, label: 'Booking Email' },
  press_email: { type: Types.Email, initial: true, label: 'Press Email' }
})

/**
 * Registration
 */
Band.defaultColumns = 'name, members'
Band.relationship({ path: 'shows', ref: 'Show', refPath: 'bands' })
Band.relationship({ path: 'press', ref: 'Press', refPath: 'bands' })
Band.register()
