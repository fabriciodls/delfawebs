export default [
    {
        path: '/',
        name: 'Proyecto',
        component: () => import('@/pa_proyecto'),
        admin: true
    },
    {
        path: '/blog',
        name: 'Blog',
        component: () => import('@/pa_blog'),
        admin: false
    },
    {
        path: '/contacto',
        name: 'Contacto',
        component: () => import('@/pa_contacto'),
        admin: false
    },
    // {
    //     path: '/parametros',
    //     name: 'Parámetros',
    //     component: () => import('@/pa_parametros'),
    //     admin: false
    // }
]
