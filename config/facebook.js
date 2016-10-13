const graph = require('fbgraph')

graph.setAccessToken(process.env.FB_ACCESS_TOKEN)

module.exports = graph
