import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrash,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

//Book interface for define the type of data
interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

const Home = () => {
  //useNavigate hook for navigation
  const navigate = useNavigate();
  //handleAddBook function for navigation to AddBook page
  const handleAddBook = () => {
    navigate("/add-book");
  };

  //handleEdit function for navigation to UpdateBook page
  const handleEdit = (id: number) => {
    navigate(`/update-book/${id}`);
  };

  //handleDelete function for delete a book
  const handleDelete = (id: number, title: string) => {
    //check user really want to delete the book or not
    if (window.confirm(`Delete ${title} with the ID number ${id}`) == true) {
      axios
        .delete(`http://localhost:5214/api/Library/${id}`)
        .then((result) => {
          if (result.status === 200) {
            //show the success message
            toast.success(`${title} has been deleted`);
            //get the updated data from the db to the grid
            getData();
          }
        })
        //show the error message
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  //useState hook for set the data . data is an array of Book type
  const [data, setData] = useState<Book[]>([]);

  useEffect(() => {
    getData();
  }, []);

  //getData function for get the data from the db
  const getData = () => {
    axios.get("http://localhost:5214/api/Library").then((result) => {
      console.log(result.data);
      setData(result.data);
    });
  };

  return (
    <>
      {/* Container */}
      <div className=" min-h-screen bg-purple-900 ">
        <ToastContainer />
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
              <button
                className=" bg-[#7809D0] w-36 md:w-72 h-10 md:h-3/4 rounded-3xl hover:bg-[#DBADFF] transition duration-300 ease-in-out text-white text-base md:text-lg font-bold"
                onClick={() => {
                  handleAddBook();
                }}
              >
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  fade
                  size="xl"
                  style={{ color: "#ffffff" }}
                />{" "}
                Add Book
              </button>
            </div>
            {/* Add Book Button div end */}

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
                    <th className="border border-white px-2 py-4">
                      Update | Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* //map the data array to the table */}
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
                      <td className="border border-white text-center px-2 py-2 text-sm md:text-lg flex justify-evenly">
                        {/* Edit Button */}
                        <button
                          className=" text-center ml-2 px-2 py-2 text-sm md:text-lg"
                          onClick={() => {
                            handleEdit(book.id);
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            size="xl"
                            style={{ color: "#00ff04" }}
                          />
                        </button>
                        {/* Delete Button */}
                        <button
                          className="text-center ml-2 px-2 py-2 text-sm md:text-lg"
                          onClick={() => handleDelete(book.id, book.title)}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            size="xl"
                            style={{ color: "#d60000" }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table End */}
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 w-full flex justify-center items-center bg-transparent  p-4 ">
            <span className="text-lg md:text-xl text-white font-thin ">
              Made with 💖 by{" "}
              <a href="https://www.linkedin.com/in/kaveeshyoshitha/">
                Kaveesh Yoshitha
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
