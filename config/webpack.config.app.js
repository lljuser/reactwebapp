const path = require('path');
const fs = require('fs'); 
const paths = require('./paths');  
const webpack = require('webpack'); 

// add other path to paths  
paths.appDirectory = fs.realpathSync(process.cwd());
paths.styleTheme = resolveApp('public/theme.less'); 
paths.envKeyPrefix= 'REACT_APP_'; 

const webpackSetting = { 
    app: {
        name: 'ABS Link',
        version: '1.0.0'
    }, 
    antd: {
        // use antd design ui antd|antd-mobile
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: true,
    },
    // setting multi enty
    entry: ['index','expert'],
    // process env environment variables for production|development or jscode|index.html
    env: {
        production: {
            API_ADDRESS: 'https://www.cn-abs.com',
            PUBLISH_PATH: '/reactwebapp/'
        },
        development: {
            API_ADDRESS: 'http://10.1.1.35',
            PUBLISH_PATH: '/'
        }
    },  
    // output setting
    output: { 
        path: paths.appBuild, 
        // dev set true add module info or comment , production please set false
        pathinfo:  isProduction() 
            ? false 
            : true, 
        filename: isProduction() 
            ? 'static/js/[name].[chunkhash:8].js'
            : 'static/js/[name].js', 
        chunkFilename:  isProduction() 
            ? 'static/js/[name].[chunkhash:8].chunk.js' 
            : 'static/js/[name].chunk.js', 
        publicPath: isProduction() ? paths.servedPath : '/', 
        // dev or production mode 
        devtoolModuleFilenameTemplate: isProduction() 
            ? info =>
                path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
            : info =>
                path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
        
    },
    // entry: {
    //     common:[ 
    //         require.resolve("babel-polyfill"),   
    //         require.resolve("raf/polyfill"),
    //         // hot update for dev
    //         isProduction() ? '' : require.resolve('react-dev-utils/webpackHotDevClient'), 
    //     ],
    //     index: [ 
    //         parseTmpl('index').entry,
    //     ],
    //     expert: [ 
    //         parseTmpl('expert').entry,
    //     ],  
    // },   
} 
 
// entryPath tmpl html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
// replace antd default less
const lessToJs = require('less-vars-to-js');  
const themeVariables = lessToJs(fs.readFileSync(paths.styleTheme, 'utf8'));  
// load antd js/css small  with ts-import-plugin
const TsImportPluginFactory = require('ts-import-plugin')
// webpack-bundle-analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// environment variables available in index.html
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
// environment variables available to the JS code
const getClientEnvironment = require('./env');

module.exports = { 
    paths: paths,
    webpackSetting: webpackSetting,
    initWebpackSetting: initWebpackSetting
}

function initWebpackSetting(webpackConfig) { 
    // #######step 1 
    // reset entry  
    //webpackConfig.entry = webpackSetting.entry; 
    webpackConfig.entry = {};
    // set common entry
    let commonEntry=new Array();
    commonEntry.push(require.resolve("babel-polyfill"));
    commonEntry.push(require.resolve("raf/polyfill"));
    if (!isProduction()) {
        commonEntry.push(require.resolve('react-dev-utils/webpackHotDevClient'));
    } 
    webpackConfig.entry.common=commonEntry;
    // set other custom entry from setting
    webpackSetting.entry.forEach((item) => {
        let entryPath = parseTmpl(item);
        if (!fs.existsSync(entryPath.entry)){
            fs.copyFileSync(paths.appIndexJs,entryPath.entry);
        }
        webpackConfig.entry[item] = entryPath.entry;
    }); 

    // #######step 2
    // reset output filename and repleact publish path
    webpackConfig.output = webpackSetting.output;  
    webpackConfig.output.publicPath = 
        isProduction() ? webpackSetting.env.production.PUBLISH_PATH 
                       : webpackSetting.env.development.PUBLISH_PATH, 

    // #######step 3
    // add ts-import-plugin load antd only use module/css  
    // add set less-loader modify antd less theme
    webpackConfig.module.rules.forEach( (item) => {
        if( item && item.oneOf) {
            // one of two modify ts-loader|less-loader   
            item.oneOf.forEach((rule) => {
                // set ts-loader for antd onlye use module/css
                if (rule.test && rule.test.source) {
                    if (rule.test.source.includes('\.(ts|tsx)$')) { 
                        let tsLoaderOptions= {
                            transpileOnly: true,
                            getCustomTransformers: () => ({
                              before: [ TsImportPluginFactory(
                                  webpackSetting.antd
                              ) ]
                            }),                            
                        };  

                        // if rule->use
                        if (rule.use) {
                            rule.use.forEach((item) => {
                                if(item.loader === require.resolve('ts-loader')) {
                                    item.options = tsLoaderOptions;
                                }
                            }); 
                        }
                        // if rule->loader 
                        if (rule.loader && rule.loader === require.resolve('ts-loader')) {
                            rule.options = tsLoaderOptions;
                        }
                        
                    }
                    
                    // add less-loader for modify antd theme 
                    if (rule.test.source.includes('\.css$')) {
                        let lessLoader= {
                            loader: require.resolve('less-loader'),
                            options: {
                                modifyVars: themeVariables
                            }
                        };

                        // production rule-loader
                        if (rule.loader){
                            rule.test= /\.(css|less)$/;
                            rule.loader.push(lessLoader);
                        }

                        // development rule->use
                        if (rule.use) {
                            rule.test= /\.(css|less)$/;
                            rule.use.push(lessLoader);
                        }  
                    } 
                    
                } 
            }); 
        } 
    });
    
    
    // #######step 4
    // defineplugin  environment variables available to the JS code
    let envSetting = isProduction() ? webpackSetting.env.production: webpackSetting.env.development;
    for(let prop in envSetting){
        process.env[`${paths.envKeyPrefix}${prop}`] = envSetting[prop];
    } 
    let publicUrl;
    if (isProduction()) {
        publicUrl = webpackSetting.output.publicPath.slice(0, -1);  
    }else { 
        publicUrl = '';  
    }
    // reset InterpolateHtmlPlugin|DefinePlugin on step 5
    const env = getClientEnvironment(publicUrl); 
    

    // #######step 5 
    // find old HtmlWebpackPlugin and remove  
    let tempArr = new Array();
    webpackConfig.plugins.forEach((item) => {
        if (item instanceof HtmlWebpackPlugin) {
            tempArr.push(item); 
        }
        // reset 
        if (item instanceof webpack.DefinePlugin) {
            tempArr.push(item); 
            //item =  new webpack.DefinePlugin(env.stringified);
        }

        if (item instanceof InterpolateHtmlPlugin) {
            tempArr.push(item); 
            //item =  new InterpolateHtmlPlugin(env.raw);
         }
    });
    // remove old HtmlWebpackPlugin
    tempArr.forEach((item) => {
        let itemIndex = webpackConfig.plugins.indexOf(item);
        webpackConfig.plugins.splice(itemIndex,1);
    });

    // add InterpolateHtmlPlugin|DefinePlugin
    webpackConfig.plugins.push(new InterpolateHtmlPlugin(env.raw));
    webpackConfig.plugins.push(new webpack.DefinePlugin(env.stringified)); 
    // add new HtmlWebpackPlugin
    const htmlWebpackPlugins = createHtmlWebpackPlugin();
    htmlWebpackPlugins.forEach ((item) => { 
        webpackConfig.plugins.push(item);
    }); 
    
    // #######step 5 
    // production add webpack-bundle-analyzer
    if (isProduction()) {
        const bundleAnalyzerPlugin = new BundleAnalyzerPlugin(
            { 
            analyzerMode: 'static', 
            // analyzerHost: '127.0.0.1', 
            // analyzerPort: 3334, 
            reportFilename: 'report.html', 
            defaultSizes: 'parsed',
            // Automatically open report in default browser
            openAnalyzer: false,
            // If `true`, Webpack Stats JSON file will be generated in bundles output directory
            generateStatsFile: false,
            // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.         
            statsFilename: 'stats.json', 
            statsOptions: null,
            // Log level. Can be 'info', 'warn', 'error' or 'silent'.
            logLevel: 'info'
            }
        ); 
        webpackConfig.plugins.push(bundleAnalyzerPlugin);  
    } 
} 


// production or development
function isProduction() {
    if (process.env.NODE_ENV === 'production') {
        return true;
    } else {
        return false;
    }
}
// parse file setting
function parseTmpl(key) { 
    let publicPath=`${paths.appPublic}/${key}.html`;
    let srcPath=`${paths.appSrc}/${key}.tsx`; 

    return { 
      name: key,
      entry: srcPath,
      output: path.basename(publicPath),
      tmpl: publicPath
    }
}
// get full file path
function resolveApp(relativePath) {
    return  path.resolve(paths.appDirectory, relativePath);
}

// create HtmlWebpackPlugin from webpack entry
function createHtmlWebpackPlugin() {
    let tempArr = new Array();
    webpackSetting.entry.forEach((entry) =>{        
        if( entry !== 'common') {
            let entryPath = parseTmpl(entry);
            if (!fs.existsSync(entryPath.tmpl)){
                fs.copyFileSync(paths.appHtml,entryPath.tmpl);
            }

            let item = new HtmlWebpackPlugin({
                inject: true,
                title: webpackSetting.app.name,
                template: entryPath.tmpl,  
                filename: entryPath.output,  
                chunks:[ 'common', entryPath.name ],
                    //dev stop minify | production use minify format js/css
                minify: isProduction() 
                    ? {
                        removeComments: true,
                        collapseWhitespace: true,
                        removeRedundantAttributes: true,
                        useShortDoctype: true,
                        removeEmptyAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        keepClosingSlash: true,
                        minifyJS: true,
                        minifyCSS: true,
                        minifyURLs: true,
                    }
                    : false, 
            });
            tempArr.push(item);
        } 
    });  
    return tempArr;
}