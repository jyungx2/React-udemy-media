import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store"; // fetchUsers 자체 파일에서 가져오는 게 아닌, central point인 index.js로부터 가져오자!!
import Skeleton from "./Skeleton";
import Button from "../components/Button";

function UsersList() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => {
    return state.users; // {data: [], isLoading: false, error: null}
  });

  // 💫 컴포넌트가 처음 렌더링될 때 데이터를 가져오기 위해 useEffect 사용
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleUserAdd = () => {
    dispatch(addUser()); // name은 addUser thunks에서 faker library를 이용해 자동으로 생성하고 있으니 아무 인자가 필요없다!
  };

  if (isLoading) {
    return <Skeleton times={6} className="h-10 w-full" />;
  }

  if (error) {
    return <div>Error fetching data...</div>;
  }

  const renderedUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button onClick={handleUserAdd}>+ Add User</Button>
      </div>
      {renderedUsers}
    </div>
  );
}

export default UsersList;
