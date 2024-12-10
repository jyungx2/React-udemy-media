import { useFetchAlbumsQuery } from "../store";

function AlbumsList({ user }) {
  const results = useFetchAlbumsQuery(user);

  console.log(results);
  return <div>Albums for {user.name}</div>;
}

export default AlbumsList;
