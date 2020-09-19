const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
const FileManagerPlugin = require("../../lib").WebpackFilemanager;
const Webpack = require("webpack");

const config = {
  entry: "./src/index.js",
  output: {
    publicPath: "/",
    path: resolve(__dirname, "dist"),
    filename: "[name].[hash:5].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
    new FileManagerPlugin({
      // events: {
      //   start: {
      //     del: {
      //       items: ['./dist'],
      //       options: {
      //         buildStart: () => {},
      //         buildEnd: () => {}
      //       }
      //     }
      //   },
      //   end: {
      //     zip: {
      //       items: [
      //         { source: './zip/a', destination: './dist/zip/a.tar', type: 'tar', options: {}},
      //         { source: './zip/b', destination: './dist/zip/b.zip', options: {}},
      //         { source: './zip/c', destination: './dist/zip/c.tgz', type: 'tgz', options: {}},
      //         { source: './zip/b.html', destination: './dist/zip/b.gz', type: 'gzip', options: {}}
      //       ],
      //       options: {
      //         buildStart: () => {},
      //         buildEnd: () => {}
      //       }
      //     },
      //     copy: {
      //       items: [
      //         { source: './copy/a', destination: './dist/copy/a' },
      //         { source: './copy/b.html', destination: './dist/copy/b.html' }
      //       ],
      //       options: {
      //         buildStart: () => {},
      //         buildEnd: () => {}
      //       }
      //     },
      //     rename: {
      //       items: [
      //         // { path: './rename', oldName: 'b', newName: 'a' }
      //       ]
      //     },
      //     unzip: {
      //       items: [
      //         { source: './unzip/a.tar', destination: './dist/unzip/a', type: 'tar', options: {}},
      //         { source: './unzip/b.tgz', destination: './dist/unzip/b', type: 'tgz', options: {}},
      //         { source: './unzip/c.zip', destination: './dist/unzip/c', options: {}},
      //         { source: './unzip/d.gz', destination: './dist/unzip/d.html', type: 'gzip', options: {}}
      //       ],
      //       options: {
      //         buildStart: () => {},
      //         buildEnd: () => {}
      //       }
      //     },
      //     move: {
      //       items: [
      //         // { source: './move/a', destination: './dist/move/a' },
      //         // { source: './move/b.html', destination: './dist/move/b.html' },
      //       ],
      //       options: {
      //         buildStart: () => {},
      //         buildEnd: () => {}
      //       }
      //     }
      //   }
      // },
      customHooks: [
        {
          hookType: "tapAsync",
          hookName: "beforeRun",
          commands: {
            // del: {
            //   items: ['./dist']
            // }
          },
        },
        {
          hookName: "afterEmit",
          hookType: "tapAsync", // reference to webpack. tap | tapAsync | tapPromise
          commands: {
            copy: {
              items: [
                {
                  source: "./copy/a",
                  destination: "./dist/copy",
                },
                {
                  source: ["./copy/**/*.html", "./copy/c"],
                  destination: "./dist/copy/",
                },
              ],
            },
            // rename: {
            //   items: [
            //     { path: './rename', oldName: 'test.html', newName: 'test1.html' }
            //   ]
            // },
            // move: {
            //   items: [
            //     {
            //       source: './move/**/*.html', destination: './dist'
            //     }
            //   ]
            // },
            // zip: {
            //   items: [
            //     {
            //       source: './zip/a',
            //       destination: './dist/zip/a.zip'
            //     },
            //     {
            //       source: './zip/c/index.html',
            //       destination: './dist/zip/c.index.html.tgz',
            //       type: 'tgz'
            //     },
            //     {
            //       source: './zip/b/index.html',
            //       destination: './dist/zip/b.html.gz',
            //       type: 'gzip',
            //     }
            //   ]
            // },
            //   options: {
            //     buildStart: () => {},
            //     buildEnd: () => {}
            //   }
            // },
            unzip: {
              items: [
                // {
                //   source: './unzip/**/*.zip',
                //   destination: './dist/unzip/',
                //   type: 'zip'
                // }
                // { source: './unzip/b.tgz', destination: './dist/unzip/b', type: 'tgz', options: {}},
                // { source: './unzip/c.zip', destination: './dist/unzip/c', options: {}},
                // { source: './unzip/d.gz', destination: './dist/unzip/d.html', type: 'gzip', options: {}}
              ],
              // options: {
              //   buildStart: () => {},
              //   buildEnd: () => {}
              // }
            },
          },
        },
      ],
      // pluginLibraries: [
      //   {
      //     name: 'html-webpack-plugin',
      //     pluginOption: {
      //       filename: 'index.html',
      //       template: './src/index.html'
      //     }
      // other hooks
      // }
      // ],
      options: {
        parallel: 4,
        // log: 'error', // error || all
      },
    }),
  ],
  devServer: {
    port: 9000,
    host: "localhost",
    open: true,
    hot: true,
    inline: true,
    progress: true,
  },
};

module.exports = config;
