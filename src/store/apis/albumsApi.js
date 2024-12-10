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
        // *query Fn: this is used for telling RTK Query about some parameters to use for the request.
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
