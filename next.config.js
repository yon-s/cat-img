/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  env: {
    REACT_APP_API_DOMEIN: process.env.REACT_APP_API_DOMEIN || 'https://api.judging-cats.com',
  },
}

module.exports = withPWA(nextConfig);
