import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import withFilter, { FILTER_KEY } from "./withFilter";
import { messageSuccess } from "utilities/message";

const withCart = (WrappedComponent) => {
  const WithCart = (props) => {
    const { filters: cart = [], setFiltersFieldAction: setCartAction } = props;

    const cartTotalPrice = useMemo(() => {
      return Array.isArray(cart)
        ? cart.reduce((acc, cur) => {
          acc += cur.price;
          return acc;
        }, 0)
        : 0;
    }, [cart]);

    const addToCart = useCallback(
      (item, redirect = false) =>
        () => {
          const idx = cart.findIndex((c) => c.id === item.id);
          if (idx < 0) {
            cart.push(item);
            setCartAction([...cart]);
          }
          messageSuccess({
            key: "addCartSuccess",
            content: "Template is added to cart"
          });
          if (redirect) {
            // useNavigate
          }
        },
      [cart]
    );

    const removeCartItem = useCallback(
      (item) => {
        cart.splice(
          cart.findIndex((c) => c.id === item.id),
          1
        );
        setCartAction([...cart]);
      },
      [cart]
    );

    const removeCart = useCallback(() => {
      setCartAction([]);
    }, []);

    return (
      <WrappedComponent
        {...props}
        cart={cart}
        cartTotalPrice={cartTotalPrice}
        setCartAction={setCartAction}
        addToCart={addToCart}
        removeCartItem={removeCartItem}
        removeCart={removeCart}
      />
    );
  };

  WithCart.propTypes = {
    filters: PropTypes.array,
    setFiltersFieldAction: PropTypes.func
  };

  return withFilter({ filterKey: FILTER_KEY.CART })(WithCart);
};

export default withCart;
