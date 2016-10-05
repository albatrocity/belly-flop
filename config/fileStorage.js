const keystone    = require('keystone')
const storageRoot = 'bellyflop'

const resources = new keystone.Storage({
  adapter: require('keystone-storage-adapter-s3'),
  s3: {
    bucket: process.env.S3_BUCKET,
    key: process.env.AWS_KEY,
    secret: process.env.AWS_SECRET,
    path: `/${storageRoot}/resources`,
    headers: {
      'x-amz-acl': 'public-read' // add default headers; see below for details
    }
  },
  schema: {
    bucket: true, // optional; store the bucket the file was uploaded to in your db
    etag: true, // optional; store the etag for the resource
    path: true, // optional; store the path of the file in your db
    url: true // optional; generate & store a public URL
  }
})

module.exports = {
  resources: resources
}
