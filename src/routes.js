export default [
    {
        path: '/',
        name: 'Proyecto',
        component: () => import('@/pa_proyecto')
    },
    {
        path: '/blog',
        name: 'Blog',
        component: () => import('@/pa_blog')
    },
    {
        path: '/contacto',
        name: 'Contacto',
        component: () => import('@/pa_contacto')
    },
    {
        path: '/parametros',
        name: 'Parámetros',
        component: () => import('@/pa_parametros')
    }
]
