es6: promise|array|set|map|...|let/const|import/export|object
    books: http://es6.ruanyifeng.com/

reactjs: React.Component/ComponentLifecycle|ReactDom|Jsx|Props/State|Event|Styling and CSS
> http://www.css88.com/react/docs/jsx-in-depth.html
> https://reactjs.org/docs/hello-world.html

typescript: Interface|Class|Generic|Property|Function|Jsx
    books: https://www.tslang.cn/

Technical RoadMap: Jsx(ReactJs)->TypeScript(Jsx)->ES6->React-Router->React-Redux->React-Saga/Thunk
    css|less|styling
    
Develop Tools: vscode|react-devtools(chrome extenstion)|redux-devtools(chrome extenstion)|Chrome/Safari

Code Rule/Format: eslint|tslint|ts

Build Tools: cnabs-cli|webpack|webpack-devserver

Saga: call|put|fork|take

es6: Set|Map|Object.is|Object.assign|Object.keys|Object.values|for in|getOwerPropertys

reactwebapp:
1. require
    babel-polyfill    >=ie9
    raf               >=ie9
    antd|antd-mobile -> tsconfig.json -> "allowSyntheticDefaultImports": true, 
    webpack.config.app -> set webpackSetting->antd use antd design ui
    
2. dev-require
    less              for antd
    less-loader       for antd
    less-vars-to-js   for antd
    ts-import-plugin  for antd
    webpack-bundle-analyzer
    

-------------------------for admin-------------------------------
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
    
  
    
    
