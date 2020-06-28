import { SearchKitView, SearchKitEdit } from './components';
import codeSVG from '@plone/volto/icons/code.svg';

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
    const fetch = require('node-fetch');
    const SearchkitExpress = require('searchkit-express');

    const host = process.env.ELASTIC_URL || 'http://localhost:9200';

    const searchkitRouter = SearchkitExpress.createRouter({
      host,
      index: 'esbootstrapdata-climate',
      maxSockets: 500, // defaults to 1000
      queryProcessor: function (query, req, res) {
        console.log('query', query);
        return query;
      },
    });

    searchkitRouter.get('/_aliases', (req, res) => {
      const url = `${host}/_aliases`;
      fetch(url, {
        method: req.method,
      })
        .catch((error) => {
          if (error) {
            // console.error('error: ' + error);
            res.send('error');
          }
        })
        .then((result) => result.body.pipe(res));
    });

    const middleware = express.Router();
    middleware.use('/', searchkitRouter);
    middleware.id = 'searchkit';

    config.settings.expressMiddleware = [
      ...(config.settings.expressMiddleware || []),
      express.json(),
      middleware,
    ];
  }

  return config;
}
