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
    deleteCartItems
  };
};

export default useData;
