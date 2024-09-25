import { createContext } from "react";

const adminLoginRoute = "http://localhost:5000/api/admin/login";
 

export const routeContext = createContext(null);

const RoutesContextProvider = (props) => {
  return (
    <routeContext.Provider value={{ adminLoginRoute }}>
      {props.children}
    </routeContext.Provider>
  );
};

export default RoutesContextProvider;
