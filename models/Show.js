const keystone = require('keystone')
const Types = keystone.Field.Types

const Show = new keystone.List('Show', {
  defaultSort: '-date',
  searchFields: 'title venue bands info',
  defaultColumns: 'date, venue, bands, title',
  track: true,
  drilldown: 'bands venue',
  map: { name: 'date' }
})

Show.add({
  title: { type: Types.Text, initial: true, note: 'optional' },
  date: { type: Types.Datetime, required: true, initial: true, format: 'Do MMM YYYY hh:mm a' },
  venue: { type: Types.Relationship, ref: 'Organization', index: true, initial: true, required: true },
  bands: { type: Types.Relationship, ref: 'Band', many: true, label: 'High Dive Band(s)', initial: true },
  eventPage: { type: Types.Url, initial: true },
  images: { type: Types.CloudinaryImages, autoCleanup: true },
  info: { type: Types.Textarea, initial: true, note: `cover, other bands, etc.` },
  notes: { type: Types.Textarea, initial: true, note: `how'd you set this up, etc.` }
})

/**
 * Registration
 */
Show.register()
