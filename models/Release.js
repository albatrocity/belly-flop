const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * User Model
 * ==========
 */
const Release = new keystone.List('Release', {
  track: true,
  autokey: { path: 'slug', from: 'name', unique: true },
  defaultSort: '-releaseDate'
})

Release.add({
  name: { type: Types.Text, required: true, index: true, initial: true },
  slug: { type: Types.Text, index: true },
  bands: { type: Types.Relationship, ref: 'Band', many: true, initial: true, required: true },
  releaseDate: { type: Types.Date, initial: true, required: true },
  art: { type: Types.CloudinaryImage, autoCleanup: true, select: true, initial: true, folder: 'releases' },
  description: { type: Types.Html, wysiwyg: true, initial: true },
  links: {
    highDive: { type: Types.Url, label: 'High Dive Website' },
    highDiveStore: { type: Types.Url, label: 'High Dive Store' },
    soundcloud: { type: Types.Url, label: 'Soundcloud' },
    bandcamp: { type: Types.Url, label: 'Bandcamp' }
  }
})

/**
 * Registration
 */
Release.defaultColumns = 'name, bands, releaseDate'
Release.relationship({ path: 'press', ref: 'Press', refPath: 'releases' })
Release.register()
