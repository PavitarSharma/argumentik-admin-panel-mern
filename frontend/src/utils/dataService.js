import { useSelector } from "react-redux";

export default function authHeader() {
  const { token, user } = useSelector((state) => state.users);
  // const user = JSON.parse(localStorage.getItem("user"));

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
