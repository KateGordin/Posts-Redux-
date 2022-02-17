import axios from "axios";

const API_URL = `https://codaisseur-coders-network.herokuapp.com`;

export const startLoading = () => ({
  type: "feed/startLoading",
});

export function postsFetched(morePosts) {
  return {
    type: "feed/postsFetched",
    payload: morePosts,
  };
}

export async function fetchNext5Posts(dispatch, getState) {
  dispatch(startLoading());

  const offset = getState().feed.posts.length;
  console.log(offset);

  const res = await axios.get(`${API_URL}/posts?offset=${offset}&limit=5`);

  const morePosts = res.data.rows;

  dispatch(postsFetched(morePosts));
}

//const state.posts = [a, b, c, d]
//const payload = [e, f]

//posts [[a, b, c, d],[e, f]] ---> if we don't copy

//...payload !== [e, f]
//...payload === e, f
