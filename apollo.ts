import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

const restLink = new RestLink({
    uri: 'http://localhost:3000', //process.env.BASE_URL,
    headers: { 
        'Content-Type': 'application/json',
        mode: 'cors',
        credentials: 'include'
    },
});

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: restLink,
});