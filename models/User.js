var keystone = require('keystone')
var Types = keystone.Field.Types

/**
 * User Model
 * ==========
 */
var User = new keystone.List('User', {
  label: 'People',
  singular: 'Person',
  plural: 'People',
  defaultSort: '-isAdmin, name'
})

User.add({heading: 'Info'}, {
  name: { type: Types.Name, required: true, index: true },
  type: { type: Types.Select, initial: true, options: [
    {value: 'band_member', label: 'Band Member'},
    {value: 'promoter', label: 'Promoter'},
    {value: 'booking_agent', label: 'Booking Agent'},
    {value: 'graphic_designer', label: 'Venue Owner'},
    {value: 'fan', label: 'Fan/Groupie'},
    {value: 'press', label: 'Press/Author'},
    {value: 'audio_engineer', label: 'Sound Person'},
    {value: 'graphic_designer', label: 'Graphic Designer'},
    {value: 'other', label: 'Other'}
  ], many: true},
  organizations: {
    type: Types.Relationship, ref: 'Organization', many: true,
    label: `Associated Places`, initial: true
  },
  bands: {
    type: Types.Relationship, ref: 'Band', many: true,
    label: `Bands`, initial: true
  },
  images: { type: Types.CloudinaryImages, autoCleanup: true, folder: 'users' },
  notes: { type: Types.Textarea, initial: true }
}, 'Contact', {
  phone: { type: Types.Text, initial: true },
  email: { type: Types.Email, initial: true, index: true },
  preferredContactMethod: { type: Types.Select, options: 'call, text, email, facebook, instagram, twitter' },
  address: { type: Types.Location, initial:true },
  willHostBands: { type: Types.Boolean, initial: true }
}, 'Networks', {
  facebook: { type: Types.Url, initial: true },
  instagram: { type: Types.Url, initial: true },
  twitter: { type: Types.Url, initial: true }
}, 'Permissions', {
  isAdmin: {
    type: Boolean, label: 'High Dive member', index: true, default: false,
    initial: true, note: 'allows this person to have a password and access BellyFlop'
  },
  password: { type: Types.Password, initial: true, dependsOn: { isAdmin: true } }
})

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
  return this.isAdmin
})


/**
 * Registration
 */
User.defaultColumns = 'name, email, isAdmin'
User.register()

exports = module.exports = User
