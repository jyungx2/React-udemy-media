import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import AlbumsListItem from "./AlbumsListItem";

function AlbumsList({ user }) {
  // ✅ 416. More Clever Tag Implementation
  // 👉 isLoading: query 훅이 최초 요청을 보낼 때만 true.
  // ** 따라서 캐시에 요청 데이터가 없는 상태에서 네트워크 요청이 시작될 때 true로 설정되고, 한 번 데이터를 성공적으로 가져오고 캐시에 저장되었다면, 같은 데이터를 요청할 때는 isLoading이 다시 true로 설정되지 않습니다.**
  // 👉 isFetching: 데이터를 가져오는 중인지 여부를 나타내어, 네트워크 요청이 시작될 때 true가 되고, 완료되면 false로 변경됨.
  // **isFetching은 캐시된 데이터를 사용하는 동안 UI를 업데이트할 수 있도록 합니다.**
  // 따라서 최초 요청뿐만 아니라 이미 캐시에 데이터가 있을 때도 refetch나 invalidate로 데이터를 다시 가져오는 중이면 true.
  const { data, error, isFetching } = useFetchAlbumsQuery(user);

  // 410. Styling Fixups
  // results - isLoading 속성을 이용해 스피너 구현!
  // Button 컴포넌트에서 loading속성이 true일 때 스피너 구현해놨기 때문에 바로 prop으로만 넘겨주면 OK
  const [addAlbum, results] = useAddAlbumMutation();

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  let content;
  if (isFetching) {
    content = <Skeleton className="h-10 w-full" times={3} />;
  } else if (error) {
    content = <div>Error loading albums.</div>;
  } else {
    content = data.map((album) => {
      return <AlbumsListItem key={album.id} album={album} />;
    });
  }

  return (
    <div>
      <div className="m-2 flex flex-row items-center justify-between">
        <h3 className="text-lg font-bold">Albums for {user.name}</h3>
        <Button loading={results.isLoading} onClick={handleAddAlbum}>
          + Add Album
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
