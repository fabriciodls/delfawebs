/*
    Configuraciones de ambientes
*/

/*
    🔨 Desarrollo
*/
const des = {
    apiUrl: 'http://localhost:8080/delfawebstest/rest/',
    routerMode: true,
    publicPath: '/',
}

/*
    🔨 test
*/
const test = {
    apiUrl: 'https://testapps.desarrollodesoftwareamedida.com/testdelfawebs/rest/',
    routerMode: false,
    publicPath: './',
}

/*
    🥕 Backend
*/
const back = {
    apiUrl: '../../rest/',
    routerMode: false,
    publicPath: './',
}

/*
    Versión
*/
process.env.VUE_APP_VERSION = require('./package.json').version
const webpack = require('webpack')
const amb = require('./package.json').env === 'des' ? des
          : require('./package.json').env === 'test' ? test: back

module.exports = {
    publicPath: amb.publicPath,
    productionSourceMap: false,
    // pwa: {
    //     name: 'vicofrascolla',
    //     themeColor: '#4DBA87',
    //     msTileColor: '#ffffff',
    //     appleMobileWebAppCapable: 'yes',
    //     appleMobileWebAppStatusBarStyle: 'black',

    //     // configure the workbox plugin
    //     workboxPluginMode: 'InjectManifest',
    //     workboxOptions: {
    //         // swSrc is required in InjectManifest mode.
    //         swSrc: 'public/service-worker.js',
    //         // ...other Workbox options...
    //     }
    // },
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'API_URL': JSON.stringify(amb.apiUrl),
                    'ROUTER_MODE': amb.routerMode
                }
            })
        ]
    }
}
