/*
    Configuraciones de ambientes
*/

/*
    🔨 Desarrollo
*/
const des = {
    apiUrl: 'http://3.93.229.145:8880/delfawebsJavaEnvironment/rest/',
    routerMode: true,
    publicPath: '/',
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
const amb = require('./package.json').env === 'des' ? des: back

module.exports = {
    publicPath,
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
                    'API_URL': JSON.stringify(apiUrl),
                    'ROUTER_MODE': routerMode
                }
            })
        ]
    }
}
