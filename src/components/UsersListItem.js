import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { removeUser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import ExpandablePanel from "./ExpandablePanel";

function UsersListItem({ user }) {
  const [doRemoveUser, isLoading, error] = useThunk(removeUser);

  const handleClick = () => {
    doRemoveUser(user); // 삭제할 유저 데이터를 전달
  };

  const header = (
    <>
      <Button className="mr-3" loading={isLoading} onClick={handleClick}>
        <GoTrashcan />
      </Button>
      {error && <div>Error deleting user..</div>}
      {user?.name}
    </>
  );

  return (
    <ExpandablePanel header={header}>content</ExpandablePanel>
    // <div className="mb-2 border rounded">
    //   <div className="flex p-2 justify-between items-center cursor-pointer">
    //     <div className="flex flex-row items-center justify-between">
    //       <Button className="mr-3" loading={isLoading} onClick={handleClick}>
    //         <GoTrashcan />
    //       </Button>
    //       {error && <div>Error deleting user..</div>}
    //       {user?.name}
    //     </div>
    //   </div>
    // </div>
  );
}

export default UsersListItem;
