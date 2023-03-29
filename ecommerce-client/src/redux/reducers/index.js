import { combineReducers } from 'redux';
import products from './products';
import categories from './categories';
import product from './product';
import cart from './cart';
import auth from './auth';
import productsNew from './productsNew';
import productsLaptop from './productsLaptop';
import productsOffice from './productsOffice';
import productsOther from './productsOther';
import productRatings from './productRatings';
import favorites from './favorites';
import producers from './producers';
import loading from './loading';

const appReducers = combineReducers({
    products,
    categories,
    product,
    cart,
    auth,
    productsNew,
    productsLaptop,
    productsOffice,
    productsOther,
    productRatings,
    favorites,
    producers,
    loading
});

export default appReducers;