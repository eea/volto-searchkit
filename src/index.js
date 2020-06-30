import { SearchKitView, SearchKitEdit, SelectIndexWidget } from './components';
import codeSVG from '@plone/volto/icons/code.svg';
import { es_server } from './reducers';

export default function applyConfig(config) {
  config.blocks.blocksConfig.searchkit = {
    id: 'searchkit',
    title: 'Searchkit',
    icon: codeSVG,
    group: 'common',
    view: SearchKitView,
    edit: SearchKitEdit,
    restricted: false,
    mostUsed: false,
    blockHasOwnFocusManagement: false,
    sidebarTab: 1,
    security: {
      addPermission: [],
      view: [],
    },
  };

  config.widgets.widget.elasticsearch_select_index = SelectIndexWidget;
  config.settings.searchkit = {
    ...config.settings.searchkit,
    esProxyWhitelist: {
      GET: ['^/_aliases', '^/_all'],
      POST: ['^/_search', /^\/[\w\d.-]+\/_search/],
    },
  };

  config.addonReducers = {
    ...config.addonReducers,
    es_server,
  };

  if (__SERVER__) {
    // TODO: develop this further to support multiple proxied ES
    const target = process.env.ELASTIC_URL || 'http://localhost:9200';
    const esProxyMiddleware = require('./server').default;
    config.settings.expressMiddleware = [esProxyMiddleware(target)];
  }

  return config;
}
