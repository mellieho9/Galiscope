// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
        config.externals.push(/\.node$/);
      } else {
        config.externals.push('.node');
      }

    if (!config.resolve.fallback) {
      config.resolve.fallback = {};
    }
    config.resolve.fallback.fs = false;
    config.resolve.fallback.module = false;

    return config;
  },
};

module.exports = nextConfig;
