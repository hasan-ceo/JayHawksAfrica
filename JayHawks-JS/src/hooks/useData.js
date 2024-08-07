import { useState } from "react";
import createPersistedState from "use-persisted-state";
const useAuthState = createPersistedState("auth");
const useRoleState = createPersistedState("role");
const useMenusState = createPersistedState("menus");
const useSubMenusState = createPersistedState("subMenus");
const useModulesState = createPersistedState("modules");
const useCartState = createPersistedState("cart");

const useData = () => {
  const [user, setUser] = useAuthState(null);
  const [role, setRole] = useRoleState(null);
  const [menubar, setMenubar] = useState(null);
  const [modules, setModules] = useModulesState(null);
  const [menus, setMenus] = useMenusState(null);
  const [subMenus, setSubmenus] = useSubMenusState(null);
  const [cartItems, setCartItems] = useCartState([]);
  const [isDayOpen, setIsDayOpen] = useState(null);

  const addToCart = (currentProduct) => {
    const alreadyAdded = cartItems.find(
      (cartProduct) => cartProduct.trId === currentProduct.trId
    );
    if (alreadyAdded) {
      const newItems = cartItems.map((cartItem) => {
        return cartItem.trId === alreadyAdded.trId ? currentProduct : cartItem;
      });
      setCartItems(newItems);
    } else {
      setCartItems([...cartItems, currentProduct]);
    }
  };

  const quantityIncreaseOrDecrease = (trId, quantity) => {
    const newCartItems = cartItems.map((cartItem) => {
      if (cartItem.trId === trId) {
        cartItem.quantity = quantity;
      }
      return cartItem;
    });
    setCartItems(newCartItems);
  };

  const deleteCartItem = (trId) => {
    const newCartItems = cartItems.filter((item) => item.trId !== trId);
    setCartItems(newCartItems);
  };

  const deleteCartItems = () => {
    setCartItems([]);
  };

  const signOut = () => {
    setUser(null);
    setRole(null);
    setIsDayOpen(null);
  };

  return {
    user,
    setUser,
    role,
    setRole,
    menubar,
    setMenubar,
    signOut,
    subMenus,
    setSubmenus,
    menus,
    setMenus,
    modules,
    setModules,
    cartItems,
    setCartItems,
    deleteCartItem,
    deleteCartItems,
    addToCart,
    quantityIncreaseOrDecrease,
    isDayOpen,
    setIsDayOpen,
  };
};

export default useData;
