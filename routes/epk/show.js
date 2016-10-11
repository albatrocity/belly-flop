const keystone = require('keystone')
const Band     = keystone.list('Band')
const Show     = keystone.list('Show')
const Press    = keystone.list('Press')
const Release  = keystone.list('Release')

exports = module.exports = function (req, res) {

  var view = new keystone.View(req, res)
  var locals = res.locals

  view.on('init', (next) => {
    return Band.model.findOne({
      slug: req.params.band, highDive: true
    }).then((band) => {
      // if (!band) { res.notfound() }
      if (!band) { next() }
      locals.band = band
      locals.title = band.name
      locals.section = 'epk'
      return band
    }).then((band) => {
      return Release.model.find().where({'bands': band._id}).exec()
    }).then((releases) => {
      locals.band.releases = releases
      return locals.band
    }).then((band) => {
      return Press.model.where({'bands': band._id, showOnEPK: true})
        .populate('publication').exec()
    }).then((press) => {
      locals.band.press = press
      return locals.band
    }).then((band) => {
      return Show.model.where({'bands': band._id})
        .where({'date': { '$gte': Date.now() }})
        .populate('venue')
        .exec()
    }).then((shows) => {
      locals.band.upcoming_shows = shows
      return next()
    }).catch((err) => {
      res.err(err, 'Something went wrong')
      return next()
    })
  })

  view.render('epk')
}
