Technology Road Map:
Technology: typescript|reactjs|dva(react-router)|dva(react-redux)|dva(redux-saga)|less
ProjectStructure: mvc area 
DevelopTools: vscode|react-devtools|redux-devtoos|chrome/safari
BuildTools: abs-cli|webpack|webpackdev|typescript
CodeReview: eslint|tslint

reactwebapp:
1. require
    babel-polyfill    >=ie9
    raf               >=ie9
    antd|antd-mobile -> tsconfig.json -> "allowSyntheticDefaultImports": true, 
    webpack.config.app -> set webpackSetting->antd use antd design ui
    
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
    
  
    
    
