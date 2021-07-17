import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useQuery, useMutation } from '@apollo/client';

import { getAuthors, getBooks } from 'graphql-client/queries';
import { addSingleBook } from 'graphql-client/mutations';

const BookForm = () => {
  const [newBook, setNewBook] = useState({
    name: '',
    genre: '',
    authorId: ''
  });

  const { loading, data } = useQuery(getAuthors);
  const [addBook] = useMutation(addSingleBook);

  console.log(data);

  const { name, genre, authorId } = newBook;

  const onChange = event => {
    setNewBook({
      ...newBook,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = event => {
    event.preventDefault();

    addBook({
      variables: { name, genre, authorId },
      refetchQueries: [{ query: getBooks }]
    });

    setNewBook({ name: '', genre: '', authorId: '' });
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            type='text'
            placeholder='Book name'
            name='name'
            onChange={onChange}
            value={name}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type='text'
            placeholder='Book genre'
            name='genre'
            onChange={onChange}
            value={genre}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          {loading ? (
            <p>Loading authors...</p>
          ) : (
            <Form.Control
              as='select'
              name='authorId'
              onChange={onChange}
              value={authorId}
              required
            >
              <option value='' disabled>
                Select author
              </option>
              {data.authors.map(author => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </Form.Control>
          )}
        </Form.Group>
        <Button className='float-right' variant='info' type='submit'>
          Add Book
        </Button>
      </Form>
    </div>
  );
};

export default BookForm;
