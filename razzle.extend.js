// TODO: try with:
// - extending WebPack through resolve-url-loader
//   - https://github.com/jaredpalmer/razzle/blob/e3cfbe568e4c8ae202603cb8a41ab19c2d65b963/packages/razzle-plugin-scss/README.md#resolveurl-object
//     (see https://github.com/bholloway/resolve-url-loader/blob/v4-development/packages/resolve-url-loader/README.md#getting-started)
// - creating a WebPack plugin

console.log("Loading volto-searchkit's razzle.extend.js...");

// const plugins = (defaultPlugins) => {
//   const fn = (...myArgs) => {
//     // if (url.startsWith('~')) {
//     // }
//     console.log('URL', myArgs);
//     // done(prev);
//   };
//   return defaultPlugins.concat({
//     name: 'scss',
//     options: {
//       resolveUrl: {
//         dev: {
//           join: fn,
//         },
//         prod: {
//           join: fn,
//         },
//       },
//     },
//   });
// };

const plugins = (defaultPlugins) => {
  const imp = (url, prev, done) => {
    if (url.startsWith('~')) {
    }
    console.log('URL', url);
    done(prev);
  };
  return defaultPlugins.concat({
    name: 'scss',
    options: {
      sass: {
        dev: {
          importer: imp,
        },
        prod: {
          importer: imp,
        },
      },
    },
  });

  // The behaviour before Volto 9:
  // return defaultPlugins.concat(['scss']);
};
const modify = (config, { target, dev }, webpack) => {
  return config;
};

module.exports = {
  plugins,
  modify,
};
