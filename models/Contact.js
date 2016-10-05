const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * User Model
 * ==========
 */
const Contact = new keystone.List('Contact', {
  track: true
})

Contact.add({
  name: { type: Types.Name },
  phone: { type: Types.Text, index: true, initial: true },
  email: { type: Types.Email, initial: true },
  address: { type: Types.Location, initial:true },
  organization: {
    type: Types.Relationship, ref: 'Organization', many: true,
    label: `Venue/Record Store`, initial: true
  },
  notes: { type: Types.Textarea, initial: true },
  type: { type: Types.Select, options: [
    {value: 'band_member', label: 'Band Member'},
    {value: 'promoter', label: 'Promoter'},
    {value: 'booking_agent', label: 'Booking Agent'},
    {value: 'fan', label: 'Fan/Groupie'},
    {value: 'press', label: 'Press/Author'},
    {value: 'audio_engineer', label: 'Sound Person'},
    {value: 'graphic_designer', label: 'Graphic Designer'},
    {value: 'other', label: 'Other'}
  ]}
})

/**
 * Registration
 */
Contact.defaultColumns = 'name, venue, organization'
Contact.register()