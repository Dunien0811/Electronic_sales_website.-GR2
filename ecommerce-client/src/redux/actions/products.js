import * as Types from '../../constants/ActionType';
import callApi from '../../utils/apiCaller';
import { actShowLoading, actHiddenLoading } from './loading'

export const actFetchProductsRequest = (value, offset) => {
    const newOffset = offset === null || offset === undefined ? 0 : offset
    const newValue = (value === undefined || value === '' || value === null) ? '-createdAt' : value
    const limit = 12;
    return dispatch => {
    dispatch(actShowLoading());
       return new Promise((resolve, reject) => {
        callApi(`products?limit=${limit}&offset=${newOffset}&orderBy=${newValue}`, 'GET', null)
          .then(res => {
            if (res && res.status === 200) {
                dispatch(actFetchProducts(res.data.results));
                resolve(res.data);
                setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
            }
          })
          .catch(err => {
            console.log(err);
            reject(err);
            setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
          });
      });
    };
  };

export const actFetchProductsPriceRequest = (price, id) => {
    let minPrice;
    let maxPrice;
    if (price === 1.5) {
        minPrice = 10;
        maxPrice = 50;
    }
    if (price === 5.2) {
        minPrice = 50;
        maxPrice = 200;
    }
    if (price === 2.1) {
        minPrice = 200;
        maxPrice = 1000;
    }
    if (price === 1) {
        minPrice = 1000;
        maxPrice = 99999999999;
    }
    const limit = 12;
    return dispatch => {
        dispatch(actShowLoading());
        return new Promise((resolve, reject) => {
            callApi(`categories/${id}/products?limit=${limit}&orderBy=-createdAt&minPrice=${minPrice}&maxPrice=${maxPrice}`, 'GET', null)
            .then(res => {
            if (res && res.status === 200) {
                dispatch(actGetProductOfCategory(res.data.results));
                resolve(res.data);
                setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
            }  
            })
            .catch(err => {
              console.log(err);
              reject(err);
              setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
            });
        });
    }
}

export const actFetchProducts = (products) => {
    return {
        type: Types.FETCH_PRODUCTS,
        products
    }
}

export const actGetProductRequest = (id) => {
    return async dispatch => {
        dispatch(actShowLoading());
        const res = await callApi(`products/${id}`, 'GET', null);
        if (res && res.status === 200) {
            dispatch(actGetProduct(res.data));
        }
        setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
    }
}

export const actGetProduct = (product) => {
    return {
        type: Types.FETCH_PRODUCT,
        product
    }
}

//Fetch product by category

export const actGetProductOfCategoryRequest = (id, value, offset) => {
    const newOffset = offset === null || offset === undefined ? 0 : offset
    const newValue = (value === undefined || value === '' || value === null) ? '-createdAt' : value
    const limit = 9;
    return dispatch => {
    dispatch(actShowLoading());
      return new Promise((resolve, reject) => {
        callApi(`categories/${id}/products?limit=${limit}&offset=${newOffset}&orderBy=${newValue}`, 'GET', null)
          .then(res => {
            if (res && res.status === 200) {
                dispatch(actGetProductOfCategory(res.data.results));
                resolve(res.data);
                setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
            }
          })
          .catch(err => {
            console.log(err);
            reject(err);
            setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
          });
      });
    };
  };

export const actGetProductOfCategory = (products) => {
    return {
        type: Types.FETCH_CATEGORIES_PRODUCT,
        products
    }
}

//Search products
export const actSearchProductsRequest = (q) => {
    return async dispatch => {
        dispatch(actShowLoading());
        const res = await callApi(`products?q=${q}`, 'GET', null);
        if (res && res.status === 200) { 
            dispatch(actSearchProducts(res.data.results));
        }
        setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
    };
}

export const actSearchProducts = (products) => {
    return {
        type: Types.SEARCH_PRODUCTS,
        products
    }
}

//Fetch products new
export const actFetchProductsNewRequest = (q) => {
    const offset = q ? q : 0;
    const limit = 10;
    return async dispatch => {
        dispatch(actShowLoading());
        const res = await callApi(`products?limit=${limit}&offset=${offset}&orderBy=-createdAt`, 'GET', null);
        if (res && res.status === 200) {
            dispatch(actFetchProductsNew(res.data.results));
        }
        setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);

    };
}

export const actFetchProductsNew = (products) => {
    return {
        type: Types.FETCH_PRODUCTS_NEW,
        products
    }
}

//Fetch products category laptop
export const actFetchProductsLaptopRequest = (q) => {
    const offset = q ? q : 0;
    const limit = 8;
    return async dispatch => {
        const res = await callApi(`categories/5/products?limit=${limit}&offset=${offset}&orderBy=-createdAt`, 'GET', null);
        if (res && res.status === 200) {
            dispatch(actFetchProductsLaptop(res.data.results));
        }

    };
}

export const actFetchProductsLaptop = (products) => {
    return {
        type: Types.FETCH_PRODUCTS_LAPTOP,
        products
    }
}

//Fetch products category office
export const actFetchProductsOfficeRequest = (q) => {
    const offset = q ? q : 0;
    const limit = 10;
    return async dispatch => {
        const res = await callApi(`categories/4/products?limit=${limit}&offset=${offset}&orderBy=-createdAt`, 'GET', null);
        if (res && res.status === 200) {
            dispatch(actFetchProductsOffice(res.data.results));
        }
    };
}

export const actFetchProductsOffice = (products) => {
    return {
        type: Types.FETCH_PRODUCTS_OFFICE,
        products
    }
}
//Fetch products other
export const actFetchProductsOtherRequest = (q, categoryId) => {
    const category = categoryId;
    const offset = q ? q : 0;
    const limit = 10;
    return async dispatch => {
        const res = await callApi(`categories/${category}/products?limit=${limit}&offset=${offset}&orderBy=-createdAt`, 'GET', null);
        if (res && res.status === 200) {
            dispatch(actFetchProductsOther(res.data.results));
        }
    };
}

export const actFetchProductsOther = (products) => {
    return {
        type: Types.FETCH_PRODUCTS_OHTER,
        products
    }
}


export const actFetchProductsOfProducerRequest = (id) => {
    const limit = 9;
    return dispatch => {
    dispatch(actShowLoading());
       return new Promise((resolve, reject) => {
        callApi(`producer/${id}/products?limit=${limit}&orderBy=-createdAt`, 'GET', null, null)
          .then(res => {
            if (res && res.status === 200) { 
                dispatch(actFetchProductOfProducer(res.data.results));
                resolve(res.data);
                setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
            }
          })
          .catch(err => {
            console.log(err);
            reject(err);
            setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
          });
      });
    };
}

export const actFetchProductOfProducer = (products) => {
    return {
        type: Types.FETCH_PRODUCTS,
        products
    }
}

export const actFetchProductsOfRatingPointRequest = (categoryId, point) => {
    console.log(categoryId);
    console.log(point);
    
    const limit = 9;
    return dispatch => {
    dispatch(actShowLoading());
       return new Promise((resolve, reject) => {
        callApi(`products/category/${categoryId}/point/${point}?limit=${limit}&orderBy=-createdAt`, 'GET', null, null)
          .then(res => {
            if (res && res.status === 200) { 
                dispatch(actFetchProductOfRatingPoint(res.data.results));
                resolve(res.data);
                setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
            }
          })
          .catch(err => {
            console.log(err);
            reject(err);
            setTimeout(function(){ dispatch(actHiddenLoading()) }, 200);
          });
      });
    };
}

export const actFetchProductOfRatingPoint = (products) => {
    return {
        type: Types.FETCH_PRODUCTS,
        products
    }
}

