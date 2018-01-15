1. require
    babel-polyfill    >=ie9
    raf               >=ie9


2. dev-tools 
    less              for antd
    less-loader       for antd
    less-vars-to-js   for antd
    ts-import-plugin  for antd
    webpack-bundle-analyzer
    

3. yarn run eject   //add custom config after checkRequiredFiles
    /scripts/build.js
    /scripts/start.js

    // Warn and crash if required files are missing
    if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
        process.exit(1);
    }

    // design by lj_liu for project with creact-react-app cli extension  
    const appConfig = require('../config/webpack.config.app');
    appConfig.initWebpackSetting(config); 
    
  
    
    
