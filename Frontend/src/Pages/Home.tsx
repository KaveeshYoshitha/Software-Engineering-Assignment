import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

const Home = () => {
  const navigate = useNavigate();

  const bookData = [
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      description:
        "The story of the mysteriously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted “gin was the national drink",
    },
    {
      id: 2,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      description:
        "The hero-narrator of The Catcher in the Rye is an ancient child of sixteen, a native New Yorker named Holden Caulfield.",
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      description:
        "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.",
    },
  ];

  const handleAddBook = () => {
    navigate("/add-book");
  };

  const handleEdit = (id: number) => {
    navigate(`/update-book/${id}`);
  };
  const handleDelete = (id: number, title: string) => {
    if (window.confirm(`Delete book with id: ${id}`) == true) {
      alert(`${title} has been deleted`);
    }
  };

  const [data, setData] = useState<Book[]>([]);

  useEffect(() => {
    setData(bookData);
  }, []);
  return (
    <>
      {/* Container */}
      <div className=" min-h-screen bg-purple-900 ">
        {/* Add gradient to the container */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#363537] to-[#EED9FF] opacity-70">
          {/* Header start*/}
          <h1 className="absolute top-0 w-full flex justify-center bg-[#581C87] bg-opacity-80 p-4 rounded-b-lg">
            <span className="bg-gradient-to-r from-[#4A53FF] via-[#BEC1FF] to-[#FFFFFF] text-transparent bg-clip-text text-2xl md:text-3xl font-extrabold z-10">
              LIBRARY MANAGEMENT SYSTEM
            </span>
          </h1>
          {/* Header end */}

          {/* Main Content */}
          <div className="absolute inset-0 m-auto bg-[#16002B] h-4/5 w-11/12 md:w-4/5 flex flex-col justify-center items-center rounded-3xl px-2 md:px-0">
            {/*Add Book Button div start */}
            <div className="absolute top-0 left-0 right-0 h-14 flex justify-end items-center rounded-t-3xl px-4 md:px-6  ">
              <button className=" bg-[#7809D0] w-36 md:w-72 h-10 md:h-3/4 rounded-3xl hover:bg-[#DBADFF] transition duration-300 ease-in-out text-white text-base md:text-lg font-bold">
                <a
                  href=""
                  className="text-white text-lg font-bold flex justify-center items-center h-full"
                  onClick={() => {
                    handleAddBook();
                  }}
                >
                  <p>Add Book</p>
                </a>
              </button>
            </div>
            {/* Button div end */}

            {/* Table start */}
            <div className="w-full h-full mt-16 overflow-x-auto">
              <table className="w-full border border-white text-white text-lg md:text-2xl">
                <thead>
                  <tr className="bg-[#6A008A]">
                    <th className="border border-white px-2 py-4">ID</th>
                    <th className="border border-white px-2 py-4">Title</th>
                    <th className="border border-white px-2 py-4">Author</th>
                    <th className="border border-white px-2 py-4">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((book) => (
                    <tr className="bg-[#32004A]" key={book.id}>
                      <td className="border border-white text-center px-2 py-2 text-sm md:text-lg">
                        {book.id}
                      </td>
                      <td className="border border-white text-center px-2 py-2 text-sm md:text-lg">
                        {book.title}
                      </td>
                      <td className="border border-white text-center px-2 py-2 text-sm md:text-lg">
                        {book.author}
                      </td>
                      <td className="border border-white text-center px-2 py-2 text-sm md:text-lg">
                        {book.description}
                      </td>
                      <td>
                        {/* Edit Button */}
                        <button
                          className="border-b border-b-white text-center ml-2 px-2 py-2 text-sm md:text-lg"
                          onClick={() => {
                            handleEdit(book.id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="yellow"
                            className="size-6"
                          >
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                          </svg>
                        </button>
                        {/* Delete Button */}
                        <button
                          className="border-b border-b-white text-center ml-2 px-2 py-2 text-sm md:text-lg"
                          onClick={() => handleDelete(book.id, book.title)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="red"
                            className="size-6"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table End */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
