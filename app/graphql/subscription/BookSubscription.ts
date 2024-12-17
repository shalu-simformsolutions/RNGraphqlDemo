import { gql } from '@apollo/client';

export const BOOK_ADDED_SUBSCRIPTION = gql`
  subscription BookAdded {
    bookAdded {
      id
      title
      author {
        id
        name
      }
    }
  }
`;

export const BOOK_DELETED_SUBSCRIPTION = gql`
  subscription BookAdded {
    bookDeleted
  }
`;