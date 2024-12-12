import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        // 3rd arg: whatever you had provided to your query hook.
        providesTags: (result, error, album) => {
          const tags = result.map((photo) => {
            return { type: "Photo", id: photo.id };
          });
          tags.push({ type: "AlbumPhoto", id: album.id });
          return tags;
        },
        // fetchPhotos 쿼리를 실행할 때, 'album' object를 제공한다는 크나큰 가정이 필요!
        query: (album) => {
          return {
            url: "/photos",
            params: {
              albumId: album.id,
            },
            method: "GET",
          };
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (result, error, album) => {
          return [{ type: "AlbumPhoto", id: album.id }];
        },
        // 현재 mutation을 실행할 때, 'album' object를 제공한다는 크나큰 가정이 필요! (사진을 추가할 때는 어느 앨범 안에 추가할지가 중요하기 때문에 album을 인자로 넣어준다..)
        query: (album) => {
          return {
            method: "POST",
            url: "/photos",
            body: {
              albumId: album.id,
              url: faker.image.abstract(150, 150, true),
            },
          };
        },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (result, error, photo) => {
          return [{ type: "Photo", id: photo.id }];
        },
        // 현재 mutation을 실행할 때, 'photo' object를 제공한다는 크나큰 가정이 필요! (사진을 삭제할 때는 어느 앨범인지 보다, 그 사진의 아이디를 이용해 삭제하는 것이기 때문에 사진을 인자로 넣어준다..)
        query: (photo) => {
          return {
            method: "DELETE",
            url: `/photos/${photo.id}`,
          };
        },
      }),
    };
  },
});

// 6. Export all of the automatically generated hooks
export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;

export { photosApi };
