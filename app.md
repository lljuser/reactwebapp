<h1>Technical RoadMap</h1>
> 
- Jsx(ReactJs)
- TypeScript(Jsx)
- ES6
- React-Router
- React-Redux
- React-Saga/Thunk
- css|less|styling
    
<h1>Develop Tools</h1> 
>
- vscode
- react-devtools(chrome extenstion)
- redux-devtools(chrome extenstion)
- Chrome/Safari

<h1>Code Rule/Format</h1>
> eslint|tslint|ts

<h1>Build Tools</h1>
> cnabs-cli|webpack|webpack-devserver

<h1>Saga</h1>
> call|put|fork|take 

<h1>es6 point</h1>
> http://es6.ruanyifeng.com/
* let/const
* promise
* array
* set/map
* object ->Object.is|Object.assign|Object.keys|Object.values|for in|getOwerPropertys
* import/export


<h1>reactjs point</h1>
> http://www.css88.com/react/docs/jsx-in-depth.html
>
> https://reactjs.org/docs/hello-world.html
- React.Component
- ComponentLifecycle
- ReactDom
- Jsx
- Props/State
- Event
- Styling and CSS

typescript: Interface|Class|Generic|Property|Function|Jsx
    books: https://www.tslang.cn/


 

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
    
  
    
    
