import React from 'react';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ProductPage from './pages/ProductPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginRegisterPage from './pages/LoginRegisterPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import CheckOutPage from './pages/CheckOutPage';
import ShopCategoryPage from './pages/ShopCategoryPage';
import SalePage from './pages/SalePage';
import ForgotPassword from './pages/ForgotPasswordPage';
import AfterCheckoutPage from './pages/AfterCheckoutPage';
import ProfilePage from './pages/ProfilePage';
import ProductFavoritePage from './pages/ProductFavoritePage';
import ProductSearchPage from './pages/ProductSerachPage';



const routes = [
  {
    path: '/',
    exact: true,
    main: (match) => < HomePage match={match} />
  },

  {
    path: '/products',
    exact: true,
    main: (match) => < ProductPage match={match}/>
  },
  {
    path: '/products/search',
    exact: true,
    main: (match) => < ProductSearchPage match={match} />
  },
  {
    path: '/products/:id',
    exact: true,
    main: (match) => < ProductDetailPage match={match} />
  },
  {
    path: '/login-register',
    exact: false,
    main: (match) => < LoginRegisterPage match={match} />
  },
  {
    path: '/forgot-password',
    exact: false,
    main: (match) => < ForgotPassword  match={match}/>
  },
  {
    path: '/cart',
    exact: false,
    main: (match) => < ShoppingCartPage match={match} />
  },
  {
    path: '/checkout',
    exact: false,
    main: (match) => < CheckOutPage match={match}/>
  },
  {
    path: '/after-checkout',
    exact: false,
    main: (match) => < AfterCheckoutPage match={match}/>
  },
  {
    path: '/categories/:id',
    exact: false,
    main: (match) => < ShopCategoryPage match={match} />
  },
  {
    path: '/contact',
    exact: false,
    main: (match) => < ContactPage match={match}/>
  },
  {
    path: '/about',
    exact: false,
    main: (match) => < AboutPage match={match}/>
  },
  {
    path: '/blogs',
    exact: false,
    main: (match) => < BlogPage match={match}/>
  },
  {
    path: '/sales',
    exact: false,
    main: (match) => < SalePage match={match}/>
  },
  {
    path: '/profile',
    exact: false,
    main: (match) => < ProfilePage match={match}/>
  },
  {
    path: '/product-favorites',
    exact: false,
    main: (match) => < ProductFavoritePage match={match}/>
  },
  {
    path: '',
    exact: true,
    main: (match) => < NotFoundPage match={match}/>
  }

]

export default routes;