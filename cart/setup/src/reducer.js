
const reducer = (state, action) => {
    if (action.type === "CLEAR_CART")
    {
        return {...state, cart:[]}
    }
    else if (action.type === "REMOVE_ITEM")
    {
        let newCart = state.cart.filter((item) => item.id !== action.payload);
        return {...state, cart: newCart};
    }
    else if(action.type === "INCREASE")
    {
        let newCart = state.cart.map((cartItem) => {
            if (cartItem.id === action.payload)
            {
              return  {...cartItem, amount: cartItem.amount+1};
            }
            return cartItem;
        })
        return {...state, cart: newCart};
    }
    else if(action.type === "DECREASE")
    {
        let newCart = state.cart.map((cartItem) => {
            if (cartItem.id === action.payload) {
                return { ...cartItem, amount: cartItem.amount - 1 };
            }
            return cartItem;
        }).filter((cartItem) => cartItem.amount !== 0);
       return {...state, cart: newCart}
    }

    else if (action.type === "TOTAL") {
        let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
            const { price, amount } = cartItem;
            cartTotal.amount += amount;
            cartTotal.total = cartTotal.total + (amount * price);
            return cartTotal;
        }, { total: 0, amount: 0 })
        total = parseFloat(total.toFixed(2));
        return {...state, total, amount}
    }
    else if (action.type === "LOADING")
    {
        return {...state, loading: true}
    }
    else if (action.type === "DISPLAY_ITEMS")
    {
        return { ...state, cart: action.payload, loading: false };
    }
    
    return state;
}

export default reducer