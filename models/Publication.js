const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * Place Model
 * ==========
 */

const Publication = new keystone.List('Publication', {
  inherits: keystone.list('Organization'),
  hidden: false
})

Publication.add({
  info: { type: Types.Textarea, initial: true, note: `other bands, etc.` }
})

/**
 * Registration
 */
Publication.defaultColumns = 'name, website'
Publication.relationship({ path: 'contacts', ref: 'Contact', refPath: 'organization' })
Publication.register()