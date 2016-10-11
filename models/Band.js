const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * User Model
 * ==========
 */
const Band = new keystone.List('Band', {
  track: true,
  autokey: { path: 'slug', from: 'name', unique: true },
  defaultSort: '-highDive, name'
})

Band.add({
  name: { type: Types.Text, required: true, index: true },
  highDive: { type: Types.Boolean, index: true, label: 'High Dive Roster', default: true },
  active: { type: Types.Boolean, index: true, default: true },
  bio: { type: Types.Html, wysiwyg: true, initial: true },
  notes: { type: Types.Textarea, wysiwyg: true, initial: true },
  photos: { type: Types.CloudinaryImages, autoCleanup : true, select : true, folder: 'bands' }
}, 'Contact', {
  website: { type: Types.Url, initial: true },
  booking_email: { type: Types.Email, initial: true, label: 'Booking Email' },
  press_email: { type: Types.Email, initial: true, label: 'Press Email' },
  location: { type: Types.Location }
})

/**
 * Registration
 */
Band.defaultColumns = 'name, highDive, active'
Band.relationship({ path: 'members', ref: 'User', refPath: 'bands' })
Band.relationship({ path: 'shows', ref: 'Show', refPath: 'bands' })
Band.relationship({ path: 'releases', ref: 'Release', refPath: 'bands' })
Band.relationship({ path: 'press', ref: 'Press', refPath: 'bands' })
Band.register()
