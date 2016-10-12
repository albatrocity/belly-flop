const keystone = require('keystone')
const Band     = keystone.list('Band')
const Show     = keystone.list('Show')
const ical     = require('ical-generator')
const calendar = require('../../lib/calendar')
const moment   = require('moment')

exports = module.exports = function (req, res) {
  var cal

  return Band.model.findOne({
    slug: req.params.band, highDive: true, active: true
  }).then((band) => {
    if (!band) { res.notfound() }
    cal = ical({domain: 'bellyflop.herokuapp.com', name: `${band.name} Shows`})
      .url(`http://bellyflop.herokuapp.com/${band.slug}.ical`)
    return band
  }).then((band) => {
    return Show.model.where({'bands': band._id})
      .where({'date': {
        '$gte': moment().subtract(1, 'year').toDate(),
        '$lte': moment().add(1, 'year').toDate()
      }})
      .populate('venue')
      .populate('bands')
      .exec()
  }).then((shows) => {
    shows.map(show => calendar.addShowToCalendar(show, cal))
    return cal.serve(res)
  }).catch((err) => {
    console.log(err)
    res.err(err, 'Something went wrong')
  })

}
