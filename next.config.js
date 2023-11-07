/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig
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
