import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../store"; // fetchUsers 자체 파일에서 가져오는 게 아닌, central point인 index.js로부터 가져올 수 있다!!

function UsersList() {
  return "Users List";
}

export default UsersList;
