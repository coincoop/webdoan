import axios from 'axios';
import {useSelector} from 'react-redux'
import { API_URL } from '../config';
import { loginStart,loginFailed,loginSuccess,registerFailed,registerStart,registerSuccess,logoutFailed,logoutStart,logoutSuccess,clearProduct } from './slice';

import store from './store';



// Sử dụng biến cart trong logic của bạn

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
      const res = await axios.post(`${API_URL}account/login`, user);
  
      const cart = store.getState().cart.cart;
      if (cart) {
        const masp = cart.map((item) => item.id);
        const quantity = cart.map((item) => item.quantity);
        await axios.post(`${API_URL}cart/addmulti`, {
          quantity: quantity,
          makh: res.data.makh,
          masp: masp,
        });
      }
      dispatch(loginSuccess(res.data));
      dispatch(clearProduct());
      navigate('/');
      window.scrollTo(0, 0);
    } catch (error) {
      if (error.response) {
        // Xử lý lỗi từ phía server (response có status code)
        if (error.response.status === 401) {
          // Sai mật khẩu
          dispatch(loginFailed("Sai mật khẩu"));
        } else if (error.response.status === 404) {
          // Sai tên đăng nhập
          dispatch(loginFailed("Sai tên đăng nhập hoặc mật khẩu"));
        } else {
          // Xử lý các lỗi khác từ phía server
          dispatch(loginFailed("Đã có lỗi xảy ra"));
        }
      } else {
        // Xử lý lỗi không có response từ phía server
        dispatch(loginFailed("Đã có lỗi xảy ra"));
      }
    }
  };

export const registerUser = async (user, dispatch,navigate) => {
    dispatch(registerStart());
    try {
        await axios.post(`${API_URL}account/register`,user);
        dispatch(registerSuccess());
       
        navigate('/account/login');
    } catch (error) {
        dispatch(registerFailed());
    }
}

export const logoutUser = async ( dispatch,id,navigate,accessToken) => {
    dispatch(logoutStart());
    try {
        await axios.post(`${API_URL}account/logout`,id,{
            headers: {token: accessToken}
        });
        dispatch(logoutSuccess());
        navigate('/')
    } catch (error) {
        dispatch(logoutFailed());
      
    }
}

export const addToCart = async (newCart) => {
    try {
      const response = await axios.post(`${API_URL}cart/add`, newCart);
      return response.data;
    } catch (error) {
        console.log(error);
      console.log(newCart);
    }
  };