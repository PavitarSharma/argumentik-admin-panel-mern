

export default function authHeader() {
  // const { token, user } = useSelector((state) => state.users);
  const token = JSON.parse(localStorage.getItem("token"));

  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
