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

// Publication.add({})

/**
 * Registration
 */
Publication.defaultColumns = 'name, website'
Publication.relationship({ path: 'contacts', ref: 'User', refPath: 'organizations' })
Publication.relationship({ path: 'press', ref: 'Press', refPath: 'publication' })
Publication.register()
