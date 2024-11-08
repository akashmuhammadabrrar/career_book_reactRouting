import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getStoredReadList } from "../../Utilities/addToDb";
// import Book from "../Book/Book";
import ReadListDetail from "../ReadListDetail/ReadListDetail";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { Helmet } from "react-helmet-async";

const ListedBooks = () => {
  const [sort, setSort] = useState("");

  const [readList, setReadList] = useState([]);

  // Ideally we will directly get the read book lists from the database

  const allBooks = useLoaderData();

  useEffect(() => {
    const storedReadList = getStoredReadList();
    const storedReadListInt = storedReadList.map((id) => parseInt(id));

    // not the best way to get stored data
    console.log(storedReadList, allBooks, storedReadListInt);

    //
    const readBookList = allBooks.filter((book) =>
      storedReadListInt.includes(book.bookId)
    );
    setReadList(readBookList);
  }, []);

  const handleSort = (sortType) => {
    setSort(sortType);
    //

    if (sortType === "No. Of Pages") {
      const sortedReadList = [...readList].sort(
        (a, b) => a.totalPages - b.totalPages
      );
      setReadList(sortedReadList);
    }

    if (sortType === "Ratings") {
      const sortedReadList = [...readList].sort((a, b) => a.rating - b.rating);
      setReadList(sortedReadList);
    }
  };

  return (
    <div className="mt-10 mb-10">
      <Helmet>
        <title>EKRAH | Listed Books</title>
      </Helmet>
      <h3 className="text-3xl my-8 text-center bg-slate-100 p-6">
        Listed Books
      </h3>

      <div className="dropdown flex justify-center">
        <div tabIndex={0} role="button" className="btn btn-success m-1">
          {sort ? `Sort By: ${sort}` : "Sort By"} <IoIosArrowDropdownCircle />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow mt-12">
          <li onClick={() => handleSort("Ratings")}>
            <a>Ratings</a>
          </li>
          <li onClick={() => handleSort("No. Of Pages")}>
            <a>No. Of Pages</a>
          </li>
        </ul>
      </div>

      <Tabs>
        <TabList className="">
          <Tab>Read Lists</Tab>
          <Tab>Wishlists</Tab>
        </TabList>

        <TabPanel>
          <h2 className="text-2xl">Books I Read: {readList.length}</h2>
          <div className="">
            {readList.map((book) => (
              <ReadListDetail book={book} key={book.bookId}></ReadListDetail>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <h2 className="text-2xl">My Wishlist</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ListedBooks;
