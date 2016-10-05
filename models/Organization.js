const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * User Model
 * ==========
 */
const Organization = new keystone.List('Organization', {
  track: true,
  hidden: true,
  autokey: { path: 'slug', from: 'name', unique: true }
})

Organization.add({
  name: { type: Types.Text, initial: true, required: true },
  website: { type: Types.Url, initial: true },
  info: { type: Types.Textarea, initial: true },
  notes: { type: Types.Textarea, initial: true},
  images: { type: Types.CloudinaryImages, autoCleanup: true },
  location: { type: Types.Location, initial: true, enableImprove: true },
  active: { type: Types.Boolean, default: true }
})

/**
 * Registration
 */
Organization.defaultColumns = 'name, location, info'
Organization.relationship({ path: 'shows', ref: 'Show', refPath: 'venue' })
Organization.relationship({ path: 'contacts', ref: 'Contact', refPath: 'organization' })
Organization.register()
