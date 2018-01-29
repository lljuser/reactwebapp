es6: promise|array|set|map|...|let/const|import/export|object
books: http://es6.ruanyifeng.com/

reactjs: React.Component/ComponentLifecycle|ReactDom|Jsx|Props/State|Event|Styling and CSS
books: http://www.css88.com/react/docs/jsx-in-depth.html
       https://reactjs.org/docs/hello-world.html

typescript:
books: https://www.tslang.cn/

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
    
  
    
    
