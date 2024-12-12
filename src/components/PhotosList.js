import { useFetchPhotosQuery } from "../store";

function PhotosList({ album }) {
  // endpoints 안의 fetchPhotos 쿼리의 쿼리함수의 인자 = album obj
  useFetchPhotosQuery(album);

  return "PhotosList";
}
export default PhotosList;
