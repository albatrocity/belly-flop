const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * User Model
 * ==========
 */
const Press = new keystone.List('Press', {
  track: true,
  defaultSort: '-publishedAt',
  plural: 'press'
})

Press.add({
  title: { type: Types.Text, index: true, initial: true, note: 'article title, if one' },
  bands: { type: Types.Relationship, ref: 'Band', many: true, initial: true, note: 'High Dive bands included' },
  releases: { type: Types.Relationship, ref: 'Release', many: true, initial: true, note: 'High Dive Releases included' },
  publication: { type: Types.Relationship, ref: 'Publication', initial: true},
  publishedAt: { type: Types.Date, default: Date.now(), initial: true },
  url: { type: Types.Url, required: true, initial: true },
  highlight: { type: Types.Html, wysiwyg: true, note: 'quote or snippet from the writeup', initial: true },
  contacts: { type: Types.Relationship, ref: 'Contact', many: true, initial: true },
  showOnEPK: { type: Types.Boolean, default: true }
})

/**
 * Registration
 */
Press.defaultColumns = 'title, bands, releases, publication, publishedAt'
Press.register()
