import { createProxyMiddleware } from 'http-proxy-middleware';
import config from '@plone/volto/registry'

function filterRequests(pathname, req) {
  const whitelist = config.settings.searchkit.esProxyWhitelist;

  const tomatch = whitelist[req.method] || [];
  return tomatch.filter((m) => pathname.match(m)).length > 0;
}

export default function (target) {
  const proxy = createProxyMiddleware(filterRequests, { target });
  proxy.id = 'searchkit';

  return proxy;
}
