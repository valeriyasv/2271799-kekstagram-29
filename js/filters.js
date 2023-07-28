const filters = document.querySelector('.img-filters');

filters.classList.remove('img-filters--inactive');

const generateRandomPosts = (posts) => {
  const randomPosts = [];
  for (let i = 0; i < 10; i++) {
    const randomId = Math.floor(Math.random() * posts.length);
    if (!randomPosts.some((obj) => obj.id === randomId)) {
      randomPosts.push(posts[randomId]);
    } else {
      i--;
    }
  }
  return randomPosts;
};

export { generateRandomPosts };
