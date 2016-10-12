const keystone = require('keystone')
const Show     = keystone.list('Show')
const ical     = require('ical-generator')
const calendar = require('../../lib/calendar')
const moment   = require('moment')

exports = module.exports = function (req, res) {
  var cal = ical({domain: 'bellyflop.herokuapp.com', name: `High Dive Records Shows`})
    .url(`http://bellyflop.herokuapp.com/shows.ical`)

  return Show.model.find({})
  .where({'date': {
    '$gte': moment().subtract(1, 'year').toDate(),
    '$lte': moment().add(1, 'year').toDate()
  }})
  .populate('venue')
  .populate('bands')
  .then((shows) => {
    shows.map(show => calendar.addShowToCalendar(show, cal, {
      bandsInTitle: true
    }))
    return cal.serve(res)
  }).catch((err) => {
    res.err(err, 'Something went wrong')
  })

}
