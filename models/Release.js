const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * User Model
 * ==========
 */
const Release = new keystone.List('Release', {
  track: true,
  autokey: { path: 'slug', from: 'name bands', unique: true },
  defaultSort: '-releaseDate'
})

Release.add({
  name: { type: Types.Text, required: true, index: true, initial: true },
  bands: { type: Types.Relationship, ref: 'Band', many: true, initial: true, required: true },
  releaseDate: { type: Types.Date, initial: true, required: true },
  art: { type: Types.CloudinaryImage, autoCleanup : true, select : true, initial: true },
  description: { type: Types.Html, wysiwyg: true, initial: true },
  links: {
    highDive: { type: Types.Url, label: 'High Dive Website' },
    highDiveStore: { type: Types.Url, label: 'High Dive Store' },
    soundcloud: { type: Types.Url, label: 'Soundcloud' },
    bandcamp: { type: Types.Url, label: 'Bandcamp' }
  },
  press: { type: Types.Relationship, ref: 'Press', many: true }
})

/**
 * Registration
 */
Release.defaultColumns = 'name, bands, releaseDate'
Release.register()
