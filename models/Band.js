'use strict'

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
  highDive: { type: Types.Boolean, index: true, label: 'High Dive Roster', default: false, initial: true },
  active: { type: Types.Boolean, index: true, default: true, initial: true },
  bio: { type: Types.Html, wysiwyg: true, initial: true },
  notes: { type: Types.Textarea, wysiwyg: true, initial: true }
}, 'Media', {
  audioPlayerEmbed: {
    type: Types.Code, language: 'html', label: 'Audio Player Embed Code',
    note: 'Soundcloud, Bandcamp, etc. Usually an iframe', height: 80
  },
  photos: { type: Types.CloudinaryImages, autoCleanup : true, select : true, folder: 'bands' }
}, 'Contact', {
  website: { type: Types.Url, initial: true },
  booking_email: { type: Types.Email, initial: true, label: 'Booking Email' },
  press_email: { type: Types.Email, initial: true, label: 'Press Email' },
  location: { type: Types.Location, initial: true }
}, 'Networks', {
  social: {
    facebook: { type: Types.Url, initial: true, label: 'Facebook URL' },
    bandcamp: { type: Types.Url, initial: true, label: 'Bandcamp URL' },
    soundcloud: { type: Types.Url, initial: true, label: 'Soundcloud URL' },
    instagram: { type: Types.Text, initial: true, label: 'Instagram username' },
    twitter: { type: Types.Text, initial: true, label: 'Twitter Username' }
  }
})

Band.schema.virtual('instagramUrl').get(function () {
  if (this.social && this.social.instagram) {
    let username = removeAtSign(this.social.instagram)
    return `http://instagram.com/${username}`
  } else {
    return null
  }
})

Band.schema.virtual('twitterUrl').get(function () {
  if (this.social && this.social.twitter) {
    let username = removeAtSign(this.social.twitter)
    return `http://twitter.com/${username}`
  } else {
    return null
  }
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

function removeAtSign(string) {
  if (string.indexOf('@') == 0) {
    string = string.split('@')[1]
  }
  return string
}
