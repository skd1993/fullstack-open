const listHelper = require('./list_helper');

describe('List Helper test', () => {
  test('dummy returns one', () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe('Total Likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  const listWithEmptyBlog = [];

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test('when list is empty', () => {
    const result = listHelper.totalLikes(listWithEmptyBlog);
    expect(result).toBe(0);
  });
});

describe('Favorite Blog', () => {
  const listWithEmptyBlog = [];
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMultipeUniqueLikesBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 15,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f0',
      title: 'New blog',
      author: 'SKD',
      url: 'http://www.fb.com/',
      likes: 10,
      __v: 1,
    },
  ];

  const listWithMultipleSameLikesBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f0',
      title: 'New blog',
      author: 'SKD',
      url: 'http://www.fb.com/',
      likes: 5,
      __v: 1,
    },
  ];

  test('empty blog', () => {
    const result = listHelper.favoriteBlog(listWithEmptyBlog);
    expect(result).toEqual({});
  });

  test('list with one blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });

  test('list with multiple blog with unique likes', () => {
    const result = listHelper.favoriteBlog(listWithMultipeUniqueLikesBlog);
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 15,
    });
  });

  test('list with multiple blog with same likes', () => {
    const result = listHelper.favoriteBlog(listWithMultipleSameLikesBlog);
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });
});

describe('Most Blogs', () => {
  const listWithEmptyBlog = [];
  const listWithManyBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 15,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f1',
      title: 'New blog 1',
      author: 'SKD',
      url: 'http://www.fb.com/',
      likes: 10,
      __v: 1,
    },
    {
      _id: '5a422aa71b54a676234d17f2',
      title: 'New blog 2',
      author: 'SKD',
      url: 'http://www.fb.com/',
      likes: 100,
      __v: 2,
    },
    {
      _id: '5a422aa71b54a676234d17f3',
      title: 'New blog 3',
      author: 'SKD',
      url: 'http://www.fb.com/',
      likes: 20,
      __v: 3,
    },
  ];

  test('when list is empty', () => {
    const result = listHelper.mostBlogs(listWithEmptyBlog);
    expect(result).toEqual('Empty Blog List');
  });
  test('when list has multiple blogs, return author with most number of blogs and count of  their blogs', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs);
    expect(result).toEqual({
      author: 'SKD',
      blogs: 3,
    });
  });
});

describe('Most Likes', () => {
  const listWithEmptyBlog = [];
  const listWithManyBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 15,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f1',
      title: 'New blog 1',
      author: 'SKD',
      url: 'http://www.fb.com/',
      likes: 10,
      __v: 1,
    },
    {
      _id: '5a422aa71b54a676234d17f2',
      title: 'New blog 2',
      author: 'SKD',
      url: 'http://www.fb.com/',
      likes: 100,
      __v: 2,
    },
    {
      _id: '5a422aa71b54a676234d17f3',
      title: 'New blog 3',
      author: 'SKD',
      url: 'http://www.fb.com/',
      likes: 20,
      __v: 3,
    },
  ];

  test('when list is empty', () => {
    const result = listHelper.mostLikes(listWithEmptyBlog);
    expect(result).toEqual('Empty Blog List');
  });
  test('when list has multiple blogs, return author with most number of blogs and count of  their blogs', () => {
    const result = listHelper.mostLikes(listWithManyBlogs);
    expect(result).toEqual({
      author: 'SKD',
      likes: 130,
    });
  });
});
