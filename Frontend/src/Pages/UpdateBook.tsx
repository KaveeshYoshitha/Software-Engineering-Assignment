import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";

const UpdateBook = () => {
  const { id } = useParams<{ id: string }>();
  const bookId: number = Number(id);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/");
  };

  const [updateTitle, setUpdateTitle] = useState("");
  const [updateAuthor, setUpdateAuthor] = useState("");
  const [updateDescription, setUpdateDescription] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5214/api/Library/${bookId}`)
      .then((result) => {
        const book = result.data;
        setUpdateTitle(book.title);
        setUpdateAuthor(book.author);
        setUpdateDescription(book.description);
        console.log("Book Id is", bookId);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [bookId]);

  const handleUpdateBook = (id: number) => {
    console.log("Book ID is", bookId);
    axios
      .put(`http://localhost:5214/api/Library/${id}`, {
        id: bookId,
        title: updateTitle,
        author: updateAuthor,
        description: updateDescription,
      })
      .then((result) => {
        if (result.status === 200) {
          toast.success(`${updateTitle} has been updated`);
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <>
      <div className="h-screen bg-purple-900 ">
        <ToastContainer />
        {/* Add gradient to the container start */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#363537] to-[#EED9FF] opacity-70">
          {/* Main Content div start*/}
          <div className="absolute inset-0 m-auto bg-[#16002B] h-4/5 w-4/5 flex justify-center items-center rounded-3xl">
            <h1 className="absolute top-6 w-full flex justify-center text-3xl bg-gradient-to-r from-[#4A53FF] via-[#BEC1FF] to-[#FFFFFF] text-transparent bg-clip-text font-bold">
              Update a Book From The Library
            </h1>
            {/* Form & button parent div start*/}
            <div className="bg-inherit h-4/5 w-4/5 flex flex-col justify-start items-start rounded-3xl">
              {/* Form Start */}

              <form
                action="POST"
                className="flex flex-col align-top top-0 text-white text-2xl gap-2"
              >
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={updateTitle}
                  onChange={(e) => setUpdateTitle(e.target.value)}
                  className="mb-5 rounded-xl
                  text-black
                  h-12
                  p-3
                  border-0
                  outline-none"
                />

                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  value={updateAuthor}
                  onChange={(e) => setUpdateAuthor(e.target.value)}
                  className="mb-5 rounded-xl
                  text-black
                  h-12
                  p-3
                  border-0
                  outline-none"
                />

                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={updateDescription}
                  onChange={(e) => setUpdateDescription(e.target.value)}
                  className="mb-5 rounded-xl
                  text-black
                  h-12
                  p-3
                  border-0
                  outline-none"
                />
              </form>

              {/* Form End */}

              {/* Button div start */}
              <div className="bg-inherit w-full flex justify-start mt-5  ">
                {/* Add Book Button */}
                <button
                  type="submit"
                  className=" bg-[#7809D0] w-72 h-12 rounded-3xl hover:bg-[#DBADFF] transition duration-300 ease-in-out mr-6 text-white text-lg font-bold"
                  onClick={() => handleUpdateBook(bookId)}
                >
                  Add Book
                </button>

                {/* Go Back Button */}
                <button
                  className=" bg-[#7809D0] w-72 h-12 rounded-3xl hover:bg-[#DBADFF] transition duration-300 ease-in-out mr-6 text-white text-lg font-bold"
                  onClick={() => handleNavigate()}
                >
                  Go Back
                </button>
              </div>
              {/* Buttom div End */}
            </div>
            {/* Form & button parent div end */}
          </div>
          {/* Main Content div end */}
        </div>
        {/* Add gradient to the container end */}
      </div>
    </>
  );
};
export default UpdateBook;
