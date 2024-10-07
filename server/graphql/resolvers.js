let posts = [];

const resolvers = {
  getPost: ({ id }) => {
    return posts.find((post) => post.id === id);
  },
  getAllPosts:() => {
    return posts;
  },
  addPost: ({ input }) => {
    const post = {id: String(posts.length + 1), ...input}
    posts.push(post);
    return post;
  },
  deletePost: ({ id }) => {
    const post = posts.find(post => post.id === id);

    if(!post) {
      throw new Error(`Post with id ${id} not found`);
    }
    posts = posts.filter(post => post.id !== id);
    return `Post with id ${id} was deleted`;
  }
};

module.exports = resolvers;