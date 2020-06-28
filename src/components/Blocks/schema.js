export const SearchkitBlockSchema = {
  title: 'Searchkit Block',

  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['url'],
    },
  ],

  properties: {
    es_index: {
      title: 'ES Index',
      description: '',
    },
  },

  required: ['url'],
};
