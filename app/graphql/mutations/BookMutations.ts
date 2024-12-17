import { gql } from '@apollo/client';

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $authorName: String!) {
    addBook(title: $title, authorName: $authorName) {
      id
      title
      author {
        id
        name
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id)
  }
`;