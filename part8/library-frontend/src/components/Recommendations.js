import { useEffect, useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../apollo/queries';

const Recommendations = (props) => {
  const me = useQuery(ME);
  const [getBooks, books] = useLazyQuery(ALL_BOOKS);

  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    if (me.data) {
      const g = me.data.me.favoriteGenre || '';
      console.log(g);
      setSelectedGenre(g);
      if (g !== '') getBooks({ variables: { genre: g } });
    }
  }, [me.data]);

  if (!props.show) {
    return null;
  }

  return !books || books.loading ? (
    <p>fetching recommendations...</p>
  ) : (
    <div>
      <h2>books</h2>
      <p>
        books in your favourite genre{' '}
        <span style={{ fontWeight: 'bold' }}>{selectedGenre || 'none'}</span>
      </p>
      {!books.data ? (
        <p>no books found</p>
      ) : (
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {books.data?.allBooks.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Recommendations;
