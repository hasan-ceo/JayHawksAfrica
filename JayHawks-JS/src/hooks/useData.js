import { useState } from "react";
import createPersistedState from "use-persisted-state";
const useAuthState = createPersistedState("auth");
const useRoleState = createPersistedState("role");
const useMenusState = createPersistedState("menus");
const useSubMenusState = createPersistedState("subMenus");
const useModulesState = createPersistedState("modules");

const useData = () => {
  const [user, setUser] = useAuthState(null);
  const [role, setRole] = useRoleState(null);
  const [menubar, setMenubar] = useState(null);
  const [modules, setModules] = useModulesState(null);
  const [menus, setMenus] = useMenusState(null);
  const [subMenus, setSubmenus] = useSubMenusState(null);

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
  };
};

export default useData;
