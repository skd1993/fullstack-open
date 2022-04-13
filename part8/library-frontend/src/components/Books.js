import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS, GENRES } from '../apollo/queries';

const Books = (props) => {
  const books = useQuery(ALL_BOOKS);
  const genreList = useQuery(GENRES);

  const [selectedGenre, setSelectedGenre] = useState('all');

  const fetchGenreBooks = async (e) => {
    e.preventDefault();
    const v = e.target.value;
    if (v !== 'all') {
      books.refetch({ genre: v });
    } else {
      books.refetch({ genre: '' });
    }
    setSelectedGenre(v);
  };

  if (!props.show) {
    return null;
  }

  if (books.loading) {
    return <div>loading ...</div>;
  } else {
    return (
      <div>
        <h2>books</h2>
        <p>
          in genre <span style={{ fontWeight: 'bold' }}>{selectedGenre}</span>
        </p>
        {genreList.data &&
          genreList.data.genres.map((g, idx) => (
            <button key={idx} value={g} onClick={fetchGenreBooks}>
              {g}
            </button>
          ))}
        <button value={'all'} onClick={fetchGenreBooks}>
          all
        </button>
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
      </div>
    );
  }
};

export default Books;
