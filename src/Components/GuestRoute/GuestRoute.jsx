import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function GuestRoute({ children }) {
  const { token } = useContext(UserContext);
  if (token) {
    <Navigate to="/" />;
  } else {
    return children;
  }
}
