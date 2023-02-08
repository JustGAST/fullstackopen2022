import {gql} from '@apollo/client';

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            id
            name
            born
            bookCount
        }
    }
`;

export const ALL_BOOKS = gql`
    query ($genre: String) {
        allBooks(genre: $genre) {
            id
            author {
                id
                name
            }
            title
            published
            genres
        }
    }
`;

export const ALL_GENRES = gql`
    query {
        allGenres
    }
`

export const ME = gql`
    query {
        me {
            id
            username
            favoriteGenre
        }
    }
`

export const ADD_BOOK = gql`
    mutation($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
        addBook(title: $title, published: $published, author: $author, genres: $genres) {
            id
            author {
                id
                name
                born
                bookCount
            }
            title
            published
            genres
        }
    }
`

export const EDIT_AUTHOR = gql`
    mutation ($name: String!, $setBornTo: Int!) {
        editAuthor(name: $name, setBornTo: $setBornTo) {
            name
            born
        }
    }
`

export const LOGIN = gql`
    mutation ($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`