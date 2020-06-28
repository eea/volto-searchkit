import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { settings } from '~/config';

function filterRequests(pathname, req) {
  console.log('pathname', pathname);
  const whitelist = settings.searchkit.esProxyWhitelist;

  const tomatch = whitelist[req.method] || [];
  return tomatch.filter((m) => pathname.match(m)).length > 0;
}

export default function (config) {
  // const express = require('express');

  const target = process.env.ELASTIC_URL || 'http://localhost:9200';

  const proxy = createProxyMiddleware(filterRequests, { target });
  const middleware = express.Router();
  middleware.all('/', proxy);
  middleware.id = 'searchkit';

  config.settings.expressMiddleware = [
    ...(config.settings.expressMiddleware || []),
    // express.json(),
    // middleware,
    proxy,
  ];
  return config;
}
