import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store"; // fetchUsers 자체 파일에서 가져오는 게 아닌, central point인 index.js로부터 가져오자!!
import Skeleton from "./Skeleton";
import Button from "../components/Button";
import { useThunk } from "../hooks/use-thunk";
import UsersListItem from "./UsersListItem";

function UsersList() {
  // 📚
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);

  // 🌟 Locale Fine-Grained Loading State => 📚
  // const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  // const [loadingUsersError, setLoadingUsersError] = useState(null);

  // 📚
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  // 🌟 Handling Errors with User Creation => 📚
  // const [isCreatingUser, setIsCreatingUser] = useState(false);
  // const [creatingUserError, setCreatingUserError] = useState(null);

  // const dispatch = useDispatch(); // 📚
  const { data } = useSelector((state) => {
    return state.users; // {data: [], isLoading: false, error: null}
  });

  // 💫 컴포넌트가 처음 렌더링될 때 데이터를 가져오기 위해 useEffect 사용
  useEffect(() => {
    doFetchUsers();
    /*
    // setIsLoadingUsers(true);

    // 379. Local Fine-Grained Loading State
    // ✨dispatch(fetchUsers())✨ => Returns a promise
    // This promise's .then gets called whether the request succeeds or 💥'fails'💥.
    // Argument to the .then is the fulfilled or rejected action object.
    dispatch(fetchUsers())
      .unwrap() // ✅ return a brand new Promise which follows the conventional rules.
      // .then(() => {
      //   console.log("SUCCESS");
      // })
      .catch((err) => setLoadingUsersError(err))
      .finally(
        () => setIsLoadingUsers(false)
        // hide the spinner
      );

    // BAD!! ... dispatch call: asynchronous in nature. (Not waiting..!)
    // setIsLoadingUsers(false);
    */
  }, [doFetchUsers]);

  const handleUserAdd = () => {
    doCreateUser();
    /*
    setIsCreatingUser(true); // display the spinner
    dispatch(addUser()) // name은 addUser thunks에서 faker library를 이용해 자동으로 생성하고 있으니 아무 인자가 필요없다!
      .unwrap()
      .then()
      .catch((err) => setCreatingUserError(err))
      .finally(() => setIsCreatingUser(false));
    */
  };

  // 🌟 Locale Fine-Grained Loading State
  // if (isLoading) {
  //   return <Skeleton times={6} className="h-10 w-full" />;
  // }

  // if (error) {
  //   return <div>Error fetching data...</div>;
  // }

  let content;
  if (isLoadingUsers) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data...</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
    });
  }

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>
        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>
        {creatingUserError && "Error creating user..."}
      </div>
      {content}
    </div>
  );
}

export default UsersList;
