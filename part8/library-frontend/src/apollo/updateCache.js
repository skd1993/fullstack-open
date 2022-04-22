export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (b) => {
    let seen = new Set();
    return b.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};
