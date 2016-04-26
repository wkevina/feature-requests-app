// Karma configuration
// Generated on Thu Apr 14 2016 22:22:48 GMT-0500 (CDT)

var path = require('path');

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            // each file acts as entry point for the webpack configuration

            // include polyfill
            'node_modules/babel-polyfill/dist/polyfill.js',

            'assets/tests/index.js'

        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            // add webpack as preprocessor
            'assets/tests/index.js': ['webpack', 'sourcemap']
        },


        webpack: {
            // karma watches the test entry points
            // (you don't need to specify the entry option)
            // webpack watches dependencies

            // webpack configuration
            // output: {
            //     path: path.resolve(__dirname, './assets/bundles'),
            //     filename: '[name]-[hash]-test.js'
            // },
            resolveLoader: {
                root: path.join(__dirname, 'node_modules')
            },

            /* Begin sinon workaround nonsense */
            resolve: {
                alias: { sinon: 'sinon/pkg/sinon' }
            },

            noParse: [/sinon/],

            plugins: [
            ],

            module: {
                loaders: [
                    {
                        test: /\.vue$/,
                        loader: 'vue'
                    },
                    {
                        test: /\.js$/,
                        loader: 'babel',
                        exclude: /node_modules/,
                        query: {
                            presets: ['es2015']
                        }
                    },
                    {
                        test: /\.json$/,
                        loader: 'json'
                    },
                    {
                        test: /\.html$/,
                        loader: 'vue-html'
                    },
                    {
                        test: /\.(png|jpg|gif|svg)$/,
                        loader: 'url',
                        query: {
                            limit: 10000,
                            name: '[name].[ext]?[hash]'
                        }
                    },
                    {
                        test: /sinon.*\.js$/,
                        loader: "imports?define=>false,require=>false"
                    }
                ]
            },
            devtool: 'inline-source-map'
        },


        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            noInfo: true
        },


        // list of files to exclude
        exclude: [
        ],


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Firefox', 'Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};
