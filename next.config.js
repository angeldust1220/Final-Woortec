// next.config.js
module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false, // Set to true if you want a 308 permanent redirect
      },
    ]
  },
}
