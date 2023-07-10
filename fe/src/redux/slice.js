import { createSlice } from '@reduxjs/toolkit';

const userReducer = createSlice({
    name: "user",
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
            loi: null,
        },
        register: {
            isFetching: false,
            error: false,
            success: false
        },
        logout: {
            isFetching: false,
            error: false
        },
    },

    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;

        },
        updateUser : (state,action) => {
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state, action) => {
            state.login.isFetching = false;
            state.login.loi = action.payload;
            state.login.error = true;
        },
        registerStart: (state) => {
            state.register.isFetching = true;

        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.success = true;
            state.register.error = false;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },
        logoutStart: (state) => {
            state.login.isFetching = true;

        },
        logoutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },
        logoutFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },


    }
})

export const {
    loginStart,
    loginFailed,
    loginSuccess,
    updateUser,
    registerFailed,
    registerStart,
    registerSuccess,
    logoutStart,
    logoutSuccess,
    logoutFailed,
} = userReducer.actions;



const cartReducer = createSlice({
    name: 'cart',
    initialState: {
        cart: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        // addProduct:(state,action)=>{
        //     state.quantity  +=1;
        //     state.products.push(action.payload.product);
        //     state.total+=action.payload.price*action.payload.quantity;
        // }       
        addProduct: (state, action) => {
            const productToAdd = action.payload.product;
            const quantityToAdd = action.payload.quantity;
            
          
            const productIndex = state.cart.findIndex((product) => product.id === productToAdd.id);
          
            if (productIndex >= 0) {
              state.cart[productIndex].quantity += quantityToAdd;
            } else {
              state.quantity += quantityToAdd;
              state.cart.push({
                ...productToAdd,
                quantity: quantityToAdd,
              });
            }
            console.log(productToAdd.dongia);
              state.total += parseInt(productToAdd.dongia)  * quantityToAdd;
            
          },
        clearProduct: (state) => {
            state.cart = []
            state.quantity = 0
            state.total = 0
        }
    }
})

export const { addProduct,clearProduct } = cartReducer.actions;

export const reducers = {
    user: userReducer.reducer,
    cart: cartReducer.reducer
}

