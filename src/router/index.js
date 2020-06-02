import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/login',
  component: () =>
            import ('@/views/login/index'),
  hidden: true
},

{
  path: '/404',
  component: () =>
            import ('@/views/404'),
  hidden: true
},

{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () =>
                import ('@/views/dashboard/index'),
    meta: { title: '主页', icon: 'dashboard' }
  }]
},

{
  path: '/example',
  component: Layout,
  redirect: '/example/tree',
  name: 'Example',
  meta: { title: '示例', icon: 'example' },
  children: [{
    hidden: true,
    path: 'table',
    name: 'Table',
    component: () =>
                    import ('@/views/table/index'),
    meta: { title: '表格', icon: 'table' }
  },
  {
    path: 'tree',
    name: 'Tree',
    component: () =>
                    import ('@/views/tree/index'),
    meta: { title: '结构树', icon: 'tree' }
  }
  ]
},

{
  path: '/form',
  component: Layout,
  children: [{
    path: 'index',
    name: 'Form',
    component: () =>
                import ('@/views/form/index'),
    meta: { title: '表单', icon: 'form' }
  }]
},
{
  path: '/article',
  component: Layout,
  redirect: '/article/add',
  meta: { title: '文章', icon: 'nested' },
  children: [{
    path: 'add',
    name: 'Addarticle',
    component: () =>
                import ('@/views/article/Article'),
    meta: { title: '添加文章', icon: 'form' }
  }, {
    path: 'articleList',
    name: 'ArticleList',
    component: () =>
                import ('@/views/article/ArticleList'),
    meta: { title: '文章列表', icon: 'form' }
  }]
},
{
  path: '/system',
  component: Layout,
  redirect: '/system/Category',
  meta: { title: '系统设置', icon: 'nested' },
  children: [{
    path: 'Category',
    name: 'Category',
    component: () =>
                import ('@/views/system/system'),
    meta: { title: '标签设置', icon: 'nested' }
  }, {
    path: 'Column',
    name: 'Column',
    component: () =>
                import ('@/views/system/system'),
    meta: { title: '专栏设置', icon: 'nested' }
  }]
},

{
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1',
  name: 'Nested',
  hidden: true,
  meta: {
    title: 'Nested',
    icon: 'nested'
  },
  children: [{
    path: 'menu1',
    component: () =>
                    import ('@/views/nested/menu1/index'), // Parent router-view
    name: 'Menu1',
    meta: { title: 'Menu1' },
    children: [{
      path: 'menu1-1',
      component: () =>
                            import ('@/views/nested/menu1/menu1-1'),
      name: 'Menu1-1',
      meta: { title: 'Menu1-1' }
    },
    {
      path: 'menu1-2',
      component: () =>
                            import ('@/views/nested/menu1/menu1-2'),
      name: 'Menu1-2',
      meta: { title: 'Menu1-2' },
      children: [{
        path: 'menu1-2-1',
        component: () =>
                                    import ('@/views/nested/menu1/menu1-2/menu1-2-1'),
        name: 'Menu1-2-1',
        meta: { title: 'Menu1-2-1' }
      },
      {
        path: 'menu1-2-2',
        component: () =>
                                    import ('@/views/nested/menu1/menu1-2/menu1-2-2'),
        name: 'Menu1-2-2',
        meta: { title: 'Menu1-2-2' }
      }
      ]
    },
    {
      path: 'menu1-3',
      component: () =>
                            import ('@/views/nested/menu1/menu1-3'),
      name: 'Menu1-3',
      meta: { title: 'Menu1-3' }
    }
    ]
  },
  {
    path: 'menu2',
    component: () =>
                    import ('@/views/nested/menu2/index'),
    meta: { title: 'menu2' }
  }
  ]
},

{
  path: 'external-link',
  component: Layout,
  children: [{
    path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
    meta: { title: 'External Link', icon: 'link' }
  }],
  hidden: true
},

// 404 page must be placed at the end !!!
{ path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
