import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// 403. Use this hook to generate some fake text to make a fake ablum title.
import { faker } from "@faker-js/faker";

// ✅ RTK Query의 createApi 함수를 사용해 API를 생성.
// - 여기서 API는 백엔드 서버를 생성하는 것이 아니라, React 애플리케이션에서 데이터를 요청하는 클라이언트 측 코드를 말함.
// - 생성된 API에는 다양한 Redux 기능이 포함 (슬라이스(Slice): 리듀서, 액션 생성기 포함 비동기 작업 관리용 Thunk 함수)
const albumsApi = createApi({
  // 1️⃣ reducerPath: Redux의 전체 상태 객체(useSelector의 인자로 받아와지는 전체 state 객체)에서 특정 API와 관련된 상태를 저장할 위치(키)를 지정하는 문자열
  reducerPath: "albums",

  // 2️⃣ fetchBaseQuery: fetch의 몇 가지 불편한 점(예: JSON 변환, 오류 처리)을 미리 설정하여 편리하게 사용할 수 있도록
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005", // where our server is hosted?
  }),
  // 3️⃣ endpoints: Redux Toolkit Query에 어떤 요청을 할지를 정의하는 부분
  endpoints(builder) {
    return {
      addAlbum: builder.mutation({
        // 📝 408.
        // fetchAlbums의 tag와 같은 이름의 tag를 써주어 addAlbum이라는 mutation이 일어났을 때, 동일한 태그("Album")를 invalid(유효하지 않음) 상태로 만듦으로써, fetchAlbums라는 쿼리함수를 재실행하여 업데이트된 데이터로 화면을 리렌더링 시킴
        // invalidatesTags: ["Album"],
        // 📝 409.
        // 여기서 user는 AlbumsList.js에서 handleAddAlbum함수 안의 addAlbum(user)의 인자값(=user)을 뜻함
        // ✅ 이제 더이상 Myra의 앨범을 추가할 때 다른 유저들의 앨범 리스트 또한 같이 조회되지 않는다! (문제해결!)
        invalidatesTags: (result, error, user) => {
          return [{ type: "Album", id: user.id }];
        },
        // * query Fn: this is used for telling RTK Query about some parameters to use for the request.
        query: (user) => {
          return {
            url: "/albums",
            // we don't need any query string params.
            method: "POST",
            body: {
              userId: user.id,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      // ✅ The goal of this query function is to specify exactly how to make the request!
      // API 생성 시 자동으로 데이터 요청/조작용 Hook이 만들어지고, 이때 훅의 이름은 endpoints함수의 리턴값들의 key값들이 포함된다.
      // ex) use✨FetchAlbums✨Query: 데이터를 가져오는 Query 요청

      // Tell Redux Toolkit Query how to make a req to "fetch the list of albums".
      fetchAlbums: builder.query({
        // 📝 408.
        // fetchAlbums를 호출할 때 해당 요청을 Album 태그로 표시 => 이 쿼리로 가져온 데이터는 "Album"이라는 태그로 표시...
        // 태그는 데이터를 식별하고, 특정 데이터를 재조회(refetch)할 필요가 있을 때 활용.. 즉, 태그는 "데이터 동기화"를 위한 ✨기준점✨으로 사용!
        // 태그 이름은 자유롭게 설정 가능, 일반적으로 리소스의 이름과 관련된 간단한 문자열로 설정..('Album', 'User', 'Post' 등..)
        // 단, 같은 태그 이름을 사용하는 쿼리와 뮤테이션 간에만 동작이 연결되기 때문에, 뮤테이션 발생시, 특정 쿼리의 데이터를 무효화시켜 업데이트된 최신 데이터로 갱신하고 싶으면, 같은 네임의 키를 써줘야 한다!
        // ex) 새로운 앨범을 추가하는 AddAlbum 뮤테이션에서, invalidatesTags: ["Album"]을 설정하면, 해당 태그로 표시된 쿼리(fetchAlbums)가 "유효하지 않음"(stale, not fresh)으로 표시되고 자동으로 재실행

        // 1️⃣ 유효하지 않음 (Invalidated): 특정 태그와 연결된 쿼리가 더 이상 신뢰할 수 없는 상태임을 표시.
        // 2️⃣ stale (구식): 데이터를 다시 가져와야 할 필요성을 의미.
        // => 이 두 표현은 실질적으로 같은 의미로 사용됩니다.
        // providesTags: ["Album"],

        // 📝 409.
        // 🚨 기존 태그(['Album'])의 문제점: 사용자 "Myra"의 앨범 추가 → "Myra"뿐만 아니라 "Elsie"와 "Harold"의 앨범 데이터도 재조회.
        // >>> Myra의 데이터만 변경되었으나, "Album" 태그를 가진 모든 사용자의 데이터가 동시에 재조회됨.
        // 👉 모든 사용자의 데이터를 동일한 태그(Album)로 관리하는 것이 아닌, 특정 사용자에게만 영향을 주는 방식으로 태그를 설정할 필요 (태그의 설정범위를 좁히자!!)
        // 특정 사용자에게만 쿼리함수를 적용시키기 위해 고유한 user의 id값을 태그에 포함시켜 객체형태로 태그를 추가하자...
        // 이때 user는 providesTags를 함수형태로 불러올 때, 자동으로 받는 3가지 인자(result, error, user(arg))에 포함되어 있기 때문에 사용가능! 이때 user는 useFetchAlbumsQuery()라는 훅에 전달한 인자값(= {id: 1, name: 'Myra'})을 지칭.
        providesTags: (result, error, user) => {
          return [{ type: "Album", id: user.id }];
        },
        query: (user) => {
          return {
            url: "/albums",
            params: {
              userId: user.id,
            },
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchAlbumsQuery, useAddAlbumMutation } = albumsApi;
export { albumsApi };

// 📝 Creating a RTK Query API
// 1. Identify a group of related requests that your app needs to make.
// 2. Make a new file that will create the api.
// 3. The API needs to stroe a ton of state related to data, request, status, errors. Add a 'reducerPath'
// 4. The API needs to know how and where to send requests. Add a 'baseQuery'.
// 5. Add 'endpoints', one for each kind of request you want to make. Reqs that read data are queries, write data are mutations.
// 6. Export all of the automatically generated hooks.
// 7. Connect the API to the store. Reducer, middleware, and listeners.
// 8. Export the hooks from store/index.js file.
