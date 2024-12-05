import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../store"; // fetchUsers 자체 파일에서 가져오는 게 아닌, central point인 index.js로부터 가져오자!!

function UsersList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return "Users List";
}

export default UsersList;
