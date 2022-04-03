import { useRef, useState } from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, UPDATE_AUTHOR } from '../apollo/queries';

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS);

  const [nameInp, setNameInp] = useState('');
  const bornInp = useRef(null);

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  const selectAuthorHandler = (e) => {
    setNameInp(e.target.value);
  };

  const submit = async (e) => {
    e.preventDefault();

    console.log(nameInp, bornInp.current.value);

    await updateAuthor({
      variables: { name: nameInp, setBornTo: +bornInp.current.value },
    });

    setNameInp('');
    bornInp.current.value = '';
  };

  return authors.loading ? (
    <div>loading ....</div>
  ) : (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born || 'N/A'}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <div>
        <form onSubmit={submit}>
          <div>
            <select onChange={selectAuthorHandler}>
              <optgroup label='Select Author'>
                <option disabled selected value>
                  {' '}
                  -- select an option --{' '}
                </option>
                {authors.data.allAuthors.map((a) => (
                  <option value={a.name} key={a.id} required>
                    {a.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
          <div>
            born
            <input ref={bornInp} />
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;
