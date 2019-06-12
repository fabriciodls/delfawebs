/*
    Configuraciones de ambientes
*/

/*
    🔨 Desarrollo
*/
const apiUrl = 'http://100.26.85.207:8880/delfawebsJavaEnvironment/rest/'
const routerMode = true
const publicPath = '/'

/*
    🥕 Backend
*/
// const apiUrl = '../../rest/'
// const routerMode = false
// const publicPath = './'


/*
    Versión
*/
process.env.VUE_APP_VERSION = require('./package.json').version
const webpack = require('webpack')

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
