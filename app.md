Instructions
===================
> 
- git clone
- yarn install
- yarn start

Structure [Mvc Area]
=================== 
>
- -build                   # publish code [for deploy]
- -config                  # webpack and abs config[for admin]
- -doc                     # document
- -node_modules            # install lib
- -public                  # html tmpl and theme
- -scripts                 # yarn/npm start webapck script [for admin]
- -src                     # code source
- --|index.tsx              # portal app init
- --|abs                    # project module
- ----|components           # control
- ----|config               # config
- ----|models               # state model action|redurce|effect
- ----|services             # api request for data services
- ----|views                # ui views
- ----|RouterConfig           # router config 
- --|expert
- --|csf

Technical RoadMap
=================== 
> 
- Jsx(ReactJs)
- css|less|styling
- TypeScript(Jsx)
- ES6
>
> <h3>advanced [ignore]</h3>
- React-Router
- React-Redux
- React-Saga/Thunk

    
Develop Tools
=================== 
>
- vscode
- react-devtools(chrome extenstion)
- redux-devtools(chrome extenstion)
- Chrome/Safari

Code Rule/Format
=================== 
> 
- eslint
- tslint

Build Tools
=================== 
> 
- cnabs-cli
- webpack/plugin
- webpack-devserver  

es6 point
=================== 
> http://es6.ruanyifeng.com/
* let/const
* promise
* array
* set/map
* object ->Object.is | Object.assign | Object.keys | Object.values | for in | getOwerPropertys
* import/export


reactjs point
=================== 
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

typescript point
=================== 
>  https://www.tslang.cn/
- Interface
- Class
- Generic
- Property
- Function
- Jsx 

React-Saga point
=================== 
> 
- call
- put
- fork
- take 

yarn point
=================== 
> <h3>npm instead of by yarn</h3>
- yarn install
- yarn start
- yarn build
- yarn test

for admin:
=================== 
### reactwebapp: 
1. require
  -  babel-polyfill    >=ie9
  -  raf               >=ie9
  -  antd|antd-mobile -> tsconfig.json -> "allowSyntheticDefaultImports": true, 
  -  webpack.config.app -> set webpackSetting->antd use antd design ui
    
2. dev-require
  - less              for antd
  - less-loader       for antd
  - less-vars-to-js   for antd
  - ts-import-plugin  for antd
  - webpack-bundle-analyzer
    


3. yarn run eject   
   
    - // add custom config after checkRequiredFiles 

    - /scripts/build.js
    - /scripts/start.js 
    - // Warn and crash if required files are missing
    - if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
    -    process.exit(1);
    - }

    - // design by lj_liu for project with creact-react-app cli extension  
    - const appConfig = require('../config/webpack.config.app');
    - appConfig.initWebpackSetting(config); 
  
    
  
    
    
