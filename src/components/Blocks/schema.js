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
    url: {
      title: 'ES URL',
    },
  },

  required: ['url'],
};
