import { Navigate, Outlet } from "react-router-dom";

function AuthRouter(props) {
  const { isLogined } = props;
  return !isLogined ? <Outlet /> : <Navigate to="/" />;
}

export default AuthRouter;
