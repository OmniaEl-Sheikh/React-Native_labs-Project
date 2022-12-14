import React, {createContext, useState, useEffect} from 'react'
import ProductsAPI from './Api/ProductsAPI'
import UserAPI from './Api/UserAPI'
import CategoriesAPI from './Api/CategoriesAPI'
import 'localstorage-polyfill'
global.localStorage 

import axios from 'axios'

export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)
    const url = 'https://shopit-jk-ecommerce.herokuapp.com';

    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken = async () =>{
                const res = await axios.get(url + '/user/refresh_token')
                setToken(res.data.accesstoken)
                console.log(res.data.accesstoken);
                setTimeout(() => {
                    refreshToken()
                }, 10 * 60 * 1000)
            }
            refreshToken()
        }
    },[])


    
    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        categoriesAPI: CategoriesAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}