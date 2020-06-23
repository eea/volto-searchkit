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

  return config;
}
