import { useRemovePhotoMutation } from "../store";
import { GoTrashcan } from "react-icons/go";

function PhotosListItem({ photo }) {
  // ** results: photo를 삭제할 땐, loading spinner를 보여주지 않을 것이기 때문에 굳이 필요없다. (Button 컴포넌트의 속성으로 loading={results.isLoading}을 넘겨줄 때 사용하므로,, 이 속성값이 true일 때, 스피너가 표시되고 회전됨.)
  const [removePhoto] = useRemovePhotoMutation();

  const handleRemovePhoto = () => {
    removePhoto(photo);
  };

  return (
    <div onClick={handleRemovePhoto} className="relative m-2 cursor-pointer">
      <img className="h-20 w-20" src={photo.url} alt="random pic" />
      <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80">
        <GoTrashcan className="text-3xl" />
      </div>
    </div>
  );
}
export default PhotosListItem;
