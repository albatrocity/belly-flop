// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
const Path = require('path')
if (process.env.NODE_ENV != 'production') {
  require('dotenv').load({path: Path.join(__dirname, '.env')})
}

// Require keystone
const keystone = require('keystone')
const mongoose = require('mongoose')
require('nunjucks')
const cons = require('consolidate')

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.set('cloudinary config', {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

keystone.init({
  'name': 'Belly Flop',
  'brand': 'High Dive Records',

  'stylus': 'public',
  'static': 'public',
  'favicon': 'public/favicon.ico',
  'views': 'templates/views',
  'view engine': 'html',
  'custom engine': cons.nunjucks,

  'emails': 'templates/emails',

  'auto update': true,
  'session': true,
  'session store': 'mongo',
  'auth': true,
  'user model': 'User',
  'mongoose': mongoose,
  'compress': true
})

// Load your project's Models
keystone.import('models')

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
  _: require('lodash'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable
})

// Load your project's Routes
keystone.set('routes', require('./routes'))


// // Setup common locals for your emails. The following are required by Keystone's
// // default email templates, you may remove them if you're using your own.
// keystone.set('email locals', {
//   logo_src: '/images/logo-email.gif',
//   logo_width: 194,
//   logo_height: 76,
//   theme: {
//     email_bg: '#f9f9f9',
//     link_color: '#2697de',
//     buttons: {
//       color: '#fff',
//       background_color: '#2697de',
//       border_color: '#1a7cb7'
//     }
//   }
// })

keystone.set('google api key', process.env.GOOGLE_API_KEY)
keystone.set('google server api key', process.env.GOOGLE_API_KEY)
keystone.set('default region', 'us')
keystone.set('cloudinary folders', true)
keystone.set('cloudinary prefix', 'high-dive')

// Load your project's email test routes
keystone.set('email tests', require('./routes/emails'))

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
  people: 'User',
  bands: ['Band', 'Release'],
  press: ['Press', 'Publication'],
  events: ['Show'],
  places: ['Venue', 'RecordStore', 'RadioStation'],
  resources: ['Resource']
})

// Start Keystone to connect to your database and initialise the web server

keystone.start()
