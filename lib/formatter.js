function formatAddress(location, options = {}) {
  const components = ['name', 'number', 'street1', 'street2', 'suburb', 'state', 'postcode']
  const defaults = {
    multiLine: false,
    components: components,
    commaBefore: ['state']
  }
  options = Object.assign({}, defaults, options)
  if (options.name) {
    location = Object.assign(location, {name: options.name})
  }

  return options.components.map((c) => {
    return {name: c, value: location[c]}
  }).filter(c => c.value != undefined ).reduce((mem, c) => {
    let sep = ' '
    if (options.commaBefore.indexOf(c.name) > -1) { sep = ', ' }
    return `${mem}${sep}${c.value}`
  }, '')
}

module.exports = {
  formatAddress: formatAddress
}
