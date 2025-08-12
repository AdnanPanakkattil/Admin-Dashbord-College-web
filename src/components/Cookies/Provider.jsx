import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export const RouteProtect = ({ children})=>{
    const token = Cookies.get("accessToken");
    if (token) {
        return <>{children}</>;
      } else {
        return <Navigate to={"/login"} />;
      }
}