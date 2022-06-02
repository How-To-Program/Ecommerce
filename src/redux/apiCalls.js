import { 
  loginFailure, 
  loginStart, 
  loginSuccess, 
  logout,
  addUserStart, 
  addUserSuccess, 
  addUserFailure, 
} from "./userRedux";
import { 
  getCart,
  addCart, 
  deleteCart, 
  updateaddCart, 
  updatereduceCart
} from './cartRedux';
import { publicRequest, userRequest } from "../requestMethods";

//LOGIN
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    const token = res.data.accessToken
    userRequest.interceptors.request.use(function (config) {
        config.headers.token = 'Bearer ' + token
      return config
    }, function (error) {
      // Do something with request error
      return Promise.reject(error)
    })
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
//LOGOUT
export const logOut = async (dispatch) => {
  dispatch(logout());
};
//REGISTER
export const addUsers = async (user, dispatch) => {
  dispatch(addUserStart());
  try {
    const res = await userRequest.post(`/auth/register`, user);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailure());
  }
};

//GETUSERCART
export const getCarts = async (userId, dispatch) => {
  try {
    const res = await userRequest.get(`/carts/${userId}`);
    console.log("res: ",res.data)
    dispatch(getCart(res.data));
  } catch (err) {
    console.log(err);
  }
};
//ADD
export const addCarts = async (product, dispatch) => {
  try {
    const res = await userRequest.post(`./carts/`, product);
    dispatch(addCart(res.data.products[0]));
  } catch (err) {
    console.log(err)
  }
};
//DELETECART
export const deleteCarts = async (id, product, dispatch) => {
  try {
    const res = await userRequest.delete(`/carts/${id}`, {product});
    console.log('res: ', res)
    dispatch(deleteCart(product, dispatch));
  } catch (err) {
    console.log(err);
  }
};
//UPDATEADDCART
export const updateaddCarts = async (id, product, dispatch) => {
  try {
    const res = await userRequest.put(`/carts/${id}`, { product });
    dispatch(updateaddCart({product}));
  } catch (err) {
    console.log(err);
  }
};
//UPDATEREDUCECART
export const updatereduceCarts = async (id, product, dispatch) => {
  try {
    const res = await userRequest.put(`/carts/${id}`, { product });
    dispatch(updatereduceCart({product}));
  } catch (err) {
    console.log(err);
  }
};