var keystone = require('keystone')
var Band = keystone.list('Band')

exports = module.exports = function (done) {
  return Band.model.update({}, {highDive: true, active: true}, done)
}
