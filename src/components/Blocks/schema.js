export const SearchkitBlockSchema = {
  title: 'Searchkit Block',

  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['es_index'],
    },
    {
      id: 'tile',
      title: 'Tile rendering',
      fields: ['tile_title', 'tile_description', 'tile_image'],
    },
  ],

  properties: {
    url: {
      title: 'ES URL',
      default: '',
    },
    es_index: {
      widget: 'elasticsearch_select_index',
    },
    tile_title: {
      title: 'Title field',
      widget: 'elasticsearch_select_field',
    },
    tile_description: {
      title: 'Description field',
    },
    tile_image: {
      title: 'Image field',
    },
  },

  required: ['url'],
};
