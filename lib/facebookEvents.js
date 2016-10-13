const graph        = require('../config/facebook')
const stub         = require('../test/stub/facebookEvent')
const moment       = require('moment')
const keystone = require('keystone')
const Band         = keystone.list('Band')
const Organization = keystone.list('Organization')

function getAttributes(eventId) {
  let bands, venues
  return fetchEvent(eventId).then((event) => {
    return Band.model.find({}).then((results) => {
      bands = parseBands(event, results).map(b => b._id)
      return event
    }).then((event) => {
      let reg = new RegExp(event.place.name)
      return Organization.model.where({
        'name': { $regex: reg, $options: 'i' }
      })
    }).then((results) => {
      venues = results.map(v => v._id)
      return assembleShowAttributes(event, bands, venues)
    })
  })
}

function parseBands(payload, bands) {
  return bands.map((band) => {
    return {
      descMatch: payload.description.toLowerCase().indexOf(band.name.toLowerCase()) > -1,
      name: band.name.toLowerCase(),
      band: band
    }
  }).map((match) => {
    return Object.assign(match, {
      nameMatch: payload.name.toLowerCase().indexOf(match.name) > -1
    })
  }).filter((match) => {
    return match.nameMatch || match.descMatch
  }).map( match => match.band )
}

function fetchEvent(eventId) {
  return new Promise((resolve, reject) => {

    if (process.env.NODE_ENV == 'test') {
      resolve(stub)
    }
    graph.get(eventId, (err, res) => {
      if (err) {reject(err)}
      return resolve(res)
    })
  })
}

function assembleShowAttributes(event, bands, venues) {
  return {
    title: event.name,
    date: moment(event.start_time).toDate(),
    venue: venues[0],
    bands: bands,
    info: event.description
  }
}

module.exports = {
  getAttributes: getAttributes,
  fetchEvent: fetchEvent,
  parseBands: parseBands
}
