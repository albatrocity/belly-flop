require('../testHelper')
const events  = require('../../lib/facebookEvents')
const expect  = require('chai').expect
const payload = require('../stub/facebookEvent')

const eventId = `1804854839797620`
const bands = require('../stub/bands')

describe('facebookEvents', () => {
  describe('fetchEvent', () => {
    it('should return a promise', () => {
      return expect(events.fetchEvent(eventId)).to.be.a('Promise')
    })
    it('should resolve a json payload', () => {
      return expect(events.fetchEvent(eventId)).to.eventually.be.an('object')
    })
  })

  describe('parseBands', () => {
    it('should return an array', () => {
      return expect(events.parseBands(payload, bands)).to.be.an('Array')
    })
    it('should match multiple bands', () => {
      return expect(events.parseBands(payload, bands).length).to.equal(2)
    })
    it('should return matching band objects', () => {
      expect(events.parseBands(payload, bands)[0]).to.haveOwnProperty('name')
      expect(events.parseBands(payload, bands)[0]).to.haveOwnProperty('_id')
    })
  })

})
