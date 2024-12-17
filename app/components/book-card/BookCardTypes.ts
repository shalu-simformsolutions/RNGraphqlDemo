export interface Book {
  id: string;
  title: string;
  author: {name: string};
}

export interface BookCardPropTypes {
  book: Book;
}
