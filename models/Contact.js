const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * User Model
 * ==========
 */
const Contact = new keystone.List('Contact')

Contact.add({
  name: { type: Types.Name },
  phone: { type: Types.Text, index: true, initial: true },
  email: { type: Types.Email, initial: true },
  address: { type: Types.Location, initial:true },
  notes: { type: Types.Textarea, initial: true, note: `how'd you set this up, etc.` }
})

/**
 * Registration
 */
Contact.defaultColumns = 'venue, title, bands'
Contact.register()
