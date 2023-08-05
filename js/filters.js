const filters = document.querySelector('.img-filters');
const COUNT_RANDOM_POSTS = 10;

filters.classList.remove('img-filters--inactive');

const generateRandomPosts = (posts) => {
  const randomPosts = [];
  for (let i = 0; i < COUNT_RANDOM_POSTS; i++) {
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
