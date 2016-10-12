const formatter = require('./formatter')

function getDescription(event, options) {
  let description = event.info || ''
  if ( options.bandsInDescription && event.bands.length ) {
    if (description != '') { description = `${description}\n`}
    description = `${description} ${event.bands.map(b => b.name).join(', ')}`
  }
  return description
}

function getTitle(event, options) {
  let title
  if ( options.bandsInTitle ) {
    title = event.bands.map(b => b.name).join(', ')
    if ( event.title ) { title = `${title} | ` } else { title = `${title} at `}
  }
  title = `${title}${event.title || event.venue.name}`
  return title
}

function addShowToCalendar(event, cal, options = {}) {
  const defaults = {
    bandsInDescription: true,
    bandsInTitle: false
  }
  options = Object.assign({}, defaults, options)
  return cal.createEvent({
    start: event.date,
    end: new Date(event.date.getTime() + 3600000),
    summary: getTitle(event, options),
    description: getDescription(event, options),
    location: formatter.formatAddress(event.venue.location, {
      name: event.venue.name
    }),
    url: event.eventPage
  })
}

module.exports = {
  addShowToCalendar: addShowToCalendar
}
