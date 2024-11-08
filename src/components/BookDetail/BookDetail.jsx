import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { addToStoredReadList } from "../../Utilities/addToDb";
import { Helmet } from "react-helmet-async";

const BookDetail = () => {
  const { bookId } = useParams();
  const id = parseInt(bookId);

  const data = useLoaderData();

  const book = data.find((kitab) => kitab.bookId === id);

  const {
    bookName,
    bookId: currentBookId,
    author,
    image,
    category,
    review,
    tags,
  } = book;

  const handleMarkAsRead = (id) => {
    /**
     * 1: Understand what to stored or saved --> Book id
     * 2: Where to store: --> local stored/ database
     * 3: keep them as collection, list,array
     * 4: check: if the book is already in the readList
     * 5: if not, then add the book to the list
     * 6: if yes, do not add the book in the readList
     * **/

    addToStoredReadList(id);
  };

  return (
    <div className="hero bg-base-200 min-h-screen mt-24 mb-12">
      <Helmet>
        <title>Book detail | {bookName}</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row">
        <img src={image} className="max-w-sm rounded-lg shadow-2xl w-56" />
        <div>
          <h1 className="text-5xl font-bold">{bookName}</h1>
          <p className="mt-4">By: {author}</p>
          <div className="divider"></div>
          <p className="font-bold text-xl">Genre: {category}</p>
          <div className="divider"></div>
          <p className="py-6 ">
            {" "}
            <span className="text-xl font-bold">review:</span> {review}
          </p>
          <div className="py-6">
            {tags.map((tag, idx) => (
              <div
                key={tag.idx}
                className="badge badge-outline bg-lime-50 text-green-400 p-3 font-bold ml-4">
                # {tag}
              </div>
            ))}
          </div>
          <button
            onClick={() => handleMarkAsRead(bookId)}
            className="btn btn-ghost">
            Mark as Read
          </button>
          <button className="btn btn-info ml-6">Add To Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
