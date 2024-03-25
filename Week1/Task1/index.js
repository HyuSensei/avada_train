const fetchData = async (url) => {
  try {
    let res = await fetch(url);
    let data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getPost = async () => {
  return await fetchData("https://jsonplaceholder.typicode.com/posts");
};

const getUser = async () => {
  return await fetchData("https://jsonplaceholder.typicode.com/users");
};

const getComment = async () => {
  return await fetchData("https://jsonplaceholder.typicode.com/comments");
};

const getRes = async () => {
  try {
    // Promise.all
    let [users, posts, comments] = await Promise.all([
      getUser(),
      getPost(),
      getComment(),
    ]);
    const newUser = users.map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    }));
    const mergedData = newUser.map((user) => {
      const userPosts = posts
        .filter((post) => post.userId === user.id)
        .map((post) => ({
          id: post.id,
          title: post.title,
          body: post.body,
        }));
      // const userComments = comments
      //   .filter((comment) => comment.email === user.email)
      //   .map((comment) => ({
      //     id: comment.id,
      //     postId: comment.postId,
      //     name: comment.name,
      //     body: comment.body,
      //   }));
      const userComments = userPosts.map((post) => {
        const postComments = comments
          .filter((comment) => comment.postId === post.id)
          .map((comment) => ({
            id: comment.id,
            postId: comment.postId,
            name: comment.name,
            body: comment.body,
          }));
        return postComments;
      });
      console.log("newUser:", newUser);
      console.log("userPosts:", userPosts);
      console.log("userComments:", userComments);
      return {
        ...user,
        posts: userPosts,
        comments: userComments,
      };
    });
    //console.log(mergedData);
    return mergedData;
  } catch (error) {
    console.log(error);
  }
};

const getUserRes = async () => {
  const users = await getRes();
  const resUser = users
    .filter((user) => user.comments.length > 3)
    .map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      commentsCount: user.comments.length,
      postsCount: user.posts.length,
    }));
  console.log(resUser);
  return resUser;
};

const sortUser = async () => {
  const users = await getUserRes();
  users.sort((a, b) => b.postsCount - a.postsCount);
  console.log(users);
};

const getDetailUser = async (userId) => {
  try {
    let res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    );
    console.log(`UserId:${userId}`, await res.json());
  } catch (error) {
    console.log(error);
  }
};
//getRes();
//getUserRes();
//sortUser();
getDetailUser(1);
