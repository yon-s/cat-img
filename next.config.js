/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  experimental: {
    webpackBuildWorkers: true,
  },
  output: 'export'
}
module.exports = nextConfig
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  //開発中にのみ発生するエラーが出ないように
  disable: process.env.NODE_ENV === "development",
})

module.exports = withPWA({
  //next.js config
  reactStrictMode: true,
})
const path = require('path')
const dotenv = require('dotenv-webpack');

module.exports = {
  webpack: config => {
    config.plugins = config.plugins || []

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ]

    return config
  }
}
