import React from 'react';
import Container from 'react-bootstrap/Container';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { BookList, Form } from 'components';

const client = new ApolloClient({
  uri: 'http://localhost:4000/specialUrl',
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Container className='py-3 mt-3' style={{ backgroundColor: 'lightcyan' }}>
				<h1 className='text-center text-info mb-3'>My Books</h1>
        <hr />
        <Form />
        <hr />
        <BookList />
			</Container>
    </ApolloProvider>
  )
}

export default App;
