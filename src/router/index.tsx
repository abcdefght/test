import React, {Suspense, lazy} from 'react';
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom';


interface routeType {
    path: string,
    component: React.LazyExoticComponent<any>,
    routes?: Array<routeType>,
    meta?: any
    exact?: boolean
}

const routes: Array<routeType> = [
    {
        path: `/index`,
        component: lazy(() => import('@com/index')),
        exact: true
    },
    {
        path: `/index/search/:keyword`,
        component: lazy(() => import('@com/search/search')),
        exact: true
    },
    {
        path: `/test`,
        component: lazy(() => import('@com/test/test'))
    },
    {
        path: `/report`,
        component: lazy(() => import('@com/report/report'))
    },
    {
        path: `/resume`,
        component: lazy(() => import('@com/resume/resume'))
    },
    {
        path: `*`,
        component: lazy(() => import('@com/Error404'))
    }
]

//
const RouteWithSubRoutes = (route: routeType) => {
    if (route.meta && route.meta.login) {
        // 需要登录的页面进行拦截
        return <Redirect to="/user"/>
    } else {
        return (
            <Route
                path={route.path}
                render={props => (
                    <route.component {...props} routes={route.routes}/>
                )}
            />
        );
    }
}

const RenderRoute = () => {
    return (
        <HashRouter>
            <Suspense fallback={<div/>}>
                <Switch>
                    {
                        routes.map((route, i) => (
                            <RouteWithSubRoutes key={i} {...route} />
                        ))
                    }
                </Switch>
            </Suspense>
        </HashRouter>
    )
}

const RouterView = (props: { routes: Array<routeType> }) => {
    const {routes} = props;
    return (
        <Switch>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </Switch>
    )
}

export {
    RenderRoute,
    RouterView
}
