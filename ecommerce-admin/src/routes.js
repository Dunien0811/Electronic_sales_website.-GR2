import React from 'react';
import DashBoardPage from './pages/DashBoardPage';
import Login from './components/Login/Login';
import RolePage from './pages/RolePage';
import OrderPage from './pages/OrderPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import DiscountPage from './pages/DiscountPage';
import UserPage from './pages/UserPage';
import ActionRolePage from './pages/ActionRolePage';
import ActionUserPage from './pages/ActionUserPage';
import ActionDiscountPage from './pages/ActionDiscountPage';
import ActionProductPage from './pages/ActionProductPage';
import ActionCategoryPage from './pages/ActionCategoryPage';
import ActionOrderPage from './pages/ActionOrderPage';
import ProducerPage from './pages/ProducerPage';
import ActionProducerPage from './pages/ActionProducerPage';
import RatingPage from './pages/RatingPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';


const routes = [
  {
    path: '/',
    exact: true,
    main: () => <DashBoardPage />
  },
  {
    path: '/login',
    exact: false,
    main: () => <Login />
  },
  {
    path: '/orders',
    exact: true,
    main: () => <OrderPage />
  },
  {
    path: '/categories',
    exact: true,
    main: () => <CategoryPage />
  },
  {
    path: '/products',
    exact: true,
    main: ({ match }) => <ProductPage  match={match}/>
  },
  {
    path: '/discounts',
    exact: true,
    main: () => <DiscountPage />
  },
  {
    path: '/users',
    exact: true,
    main: () => <UserPage />
  },
  {
    path: '/roles',
    exact: true,
    main: () => <RolePage />
  },
  {
    path: '/producers',
    exact: true,
    main: () => <ProducerPage />
  },
  {
    path: '/ratings',
    exact: true,
    main: () => <RatingPage />
  },
  {
    path: '/contacts',
    exact: true,
    main: () => <ContactPage />
  },
  {
    path: '/about',
    exact: true,
    main: () => <AboutPage />
  },
  {
    path: '/roles/add',
    exact: false,
    main: ({ history }) => <ActionRolePage history={history} />
  },
  {
    path: '/roles/edit/:id',
    exact: false,
    main: ({ match, history }) => <ActionRolePage match={match} history={history} />
  },
  {
    path: '/users/add',
    exact: false,
    main: ({ history }) => <ActionUserPage history={history} />
  },
  {
    path: '/users/edit/:id',
    exact: false,
    main: ({ match, history }) => <ActionUserPage match={match} history={history} />
  },
  {
    path: '/discounts/add',
    exact: false,
    main: ({ history }) => <ActionDiscountPage history={history} />
  },
  {
    path: '/discounts/edit/:id',
    exact: false,
    main: ({ match, history }) => <ActionDiscountPage match={match} history={history} />
  },
  {
    path: '/products/add',
    exact: false,
    main: ({ history }) => <ActionProductPage history={history} />
  },
  {
    path: '/products/edit/:id',
    exact: false,
    main: ({ match, history }) => <ActionProductPage match={match} history={history} />
  },
  {
    path: '/categories/add',
    exact: false,
    main: ({ history }) => <ActionCategoryPage history={history} />
  },
  {
    path: '/categories/edit/:id',
    exact: false,
    main: ({ match, history }) => <ActionCategoryPage match={match} history={history} />
  },
  {
    path: '/orders/add',
    exact: false,
    main: ({ history }) => <ActionOrderPage history={history} />
  },
  {
    path: '/orders/edit/:id',
    exact: false,
    main: ({ match, history }) => <ActionOrderPage match={match} history={history} />
  },
  {
    path: '/producers/add',
    exact: false,
    main: ({ history }) => <ActionProducerPage history={history} />
  },
  {
    path: '/producers/edit/:id',
    exact: false,
    main: ({ match, history }) => <ActionProducerPage match={match} history={history} />
  }

]

export default routes;