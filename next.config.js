/** @type {import('next').NextConfig} */

const withTM = require('next-transpile-modules')(['@babel/preset-react']);

const nextConfig = withTM({
  reactStrictMode: true
});

module.exports = nextConfig;
