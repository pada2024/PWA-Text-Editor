const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');



// TODO: Add and configure workbox plugins for a service worker and manifest file.

// Manifest code
module.exports = {
  // Your existing webpack configuration
  entry: './src/index.js', // Your entry point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    // Other plugins...

    // Workbox Plugin for injecting custom service worker
    new InjectManifest({
      swSrc: './src/service-worker.js', // Path to your custom service worker file
      swDest: 'service-worker.js', // Output path for the generated service worker
    }),
  ],
};

// The three phases of the service worker's life cycle:
// Install - 
self.addEventListener('install', (e) =>
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  )
);

// Activate - 
self.addEventListener('activate', (e) =>
  e.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  )
);

// Claim -
self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});

// TODO: Add CSS loaders and babel to webpack.

module.exports = {
  entry: './src/index.js', 
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply Babel to .js files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/, // Apply CSS loaders to .css files
        use: [
          'style-loader', // Injects styles into the DOM
          'css-loader',   // Translates CSS into CommonJS
        ],
      },
    ],
  },
  // Additional configurations (like devServer, plugins, etc.) can go here
};

// 
module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      
    ],

    module: {
      rules: [
        
      ],
    },
  };
};
