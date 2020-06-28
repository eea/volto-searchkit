import { SearchKitView, SearchKitEdit, SelectIndexWidget } from './components';
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

  config.widgets.widget.elasticsearch_select_index = SelectIndexWidget;
  config.settings.searchkit = {
    esProxyWhitelist: {
      GET: ['^/_aliases', '^/_all'],
      POST: ['^/_search', /^\/[\w\d.-]+\/_search/],
    },
  };

  if (__SERVER__) {
    const installServerExtension = require('./server').default;
    config = installServerExtension(config);
  }

  return config;
}
