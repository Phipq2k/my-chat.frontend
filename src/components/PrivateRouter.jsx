import { Navigate, Outlet } from "react-router-dom";

function ProtectedRouter(props) {
  const { isLogined, websocket } = props;
  return isLogined ? (
    <Outlet context={websocket} />
  ) : (
    <Navigate to="/sign-in" />
  );
}

export default ProtectedRouter;
