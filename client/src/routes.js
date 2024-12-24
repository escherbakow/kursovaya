import { Component } from "react"
import Admin from "./page/Admin"
import { ADMIN_ROUTE, REGISTRATION_ROUTE, TRASH_ROUTE, LOGIN_ROUTE, PRODUCTS_ROUTE, SHOP_ROUTE, REVIEW_ROUTE } from "./utils/consts"
import Trash from "./page/Trash"
import Products from "./page/Products"
import Login from "./page/Auth"
import Registration from "./page/Auth"
import Shop from "./page/Shop"
import Reviews from "./page/Reviews"


export const authRoutes = [
    {
        path: ADMIN_ROUTE,  
        Component: Admin
    },
    {
        path: TRASH_ROUTE,
        Component: Trash
    },

]

export const publicRoutes = [
    {
        path: PRODUCTS_ROUTE + '/:id',
        Component: Products
    },

    {
        path: LOGIN_ROUTE,
        Component: Login
    },

    {
        path: REVIEW_ROUTE,  
        Component: Reviews
    },
    
    {
        path: SHOP_ROUTE,
        Component: Shop
    },

    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
]