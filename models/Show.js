const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * User Model
 * ==========
 */
const Show = new keystone.List('Show')

Show.add({
  title: { type: Types.Text },
  venue: { type: Types.Relationship, ref: 'Venue', index: true, initial: true, required: true },
  info: { type: Types.Textarea, initial: true, note: `cover, other bands, etc.` },
  notes: { type: Types.Textarea, initial: true, note: `how'd you set this up, etc.` },
  bands: { type: Types.Relationship, ref: 'Band', many: true, label: 'High Dive Band(s)' }
})

/**
 * Registration
 */
Show.defaultColumns = 'venue, title, bands'
Show.register()
