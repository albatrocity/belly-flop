const keystone       = require('keystone')
const Types          = keystone.Field.Types
const facebookEvents = require('../lib/facebookEvents')

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
  date: { type: Types.Datetime, initial: true, format: 'Do MMM YYYY hh:mm a' },
  venue: { type: Types.Relationship, ref: 'Organization', index: true, initial: true },
  bands: { type: Types.Relationship, ref: 'Band', many: true, label: 'Bands', initial: true },
  eventPage: { type: Types.Url, initial: true },
  copyFacebookInfo: {
    type: Types.Boolean, initial: true,
    label: 'Copy/replace info from Facebook event',
    note: 'requires facebook event url and will REPLACE anything already entered.'
  },
  images: { type: Types.CloudinaryImages, autoCleanup: true, folder: 'shows' },
  info: { type: Types.Textarea, initial: true, note: `cover, other bands, etc.` },
  notes: { type: Types.Textarea, initial: true, note: `how'd you set this up, etc.` }
})

Show.schema.pre('save', function(done) {
  let copyAction
  if ( this.copyFacebookInfo && this.eventPage.indexOf('facebook') > -1) {
    let eventId = this.eventPage.split('events/')[1].replace('/', '')
    copyAction = facebookEvents.getAttributes(eventId).then((attrs) => {
      return this.set(attrs)
    })
  } else {
    copyAction = Promise.resolve(this)
  }
  this.copyFacebookInfo = false
  return copyAction.then(done).catch((err) => {
    console.log(err)
    done()
  })
})

/**
 * Registration
 */
Show.register()
