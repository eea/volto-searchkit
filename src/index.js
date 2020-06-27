import { SearchKitView, SearchKitEdit } from './components';
import codeSVG from '@plone/volto/icons/code.svg';

// // Allow pluggability with `config.settings.serverRoutes`
// function handleAll(req, res, next) {
//   let found = false;
//   (settings.expressMiddleware || []).forEach((handler) => {
//     if (found) return;
//     if (handler[0](req)) {
//       found = true;
//       handler[1](req, res, next);
//     }
//   });
//   if (!found) return next();
// }

export default function applyConfig(config) {
  config.blocks.blocksConfig.searchkit = {
    id: 'searchkit',
    title: 'Searchkit',
    icon: codeSVG,
    group: 'text',
    view: SearchKitView,
    edit: SearchKitEdit,
    restricted: false,
    mostUsed: true,
    blockHasOwnFocusManagement: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  if (__SERVER__) {
    const express = require('express');
    const SearchkitExpress = require('searchkit-express');
    const host = process.env.ELASTIC_URL || 'http://localhost:9200';

    const searchkitRouter = SearchkitExpress.createRouter({
      host,
      index: 'esbootstrapdata-climate_2020-04-17_09:11:02',
      maxSockets: 500, // defaults to 1000
      queryProcessor: function (query, req, res) {
        console.log(query);
        return query;
      },
    });

    const middleware = express.Router();
    middleware.use('/_es', searchkitRouter);
    middleware.id = 'searchkit';

    config.settings.expressMiddleware = [
      ...(config.settings.expressMiddleware || []),
      middleware,
    ];
  }

  return config;
}
