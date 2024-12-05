import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store"; // fetchUsers 자체 파일에서 가져오는 게 아닌, central point인 index.js로부터 가져오자!!

function UsersList() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => {
    return state.users; // {data: [], isLoading: false, error: null}
  });

  // 💫 컴포넌트가 처음 렌더링될 때 데이터를 가져오기 위해 useEffect 사용
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching data...</div>;
  }

  return <div>{data.length}</div>;
}

export default UsersList;
