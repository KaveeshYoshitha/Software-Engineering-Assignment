import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AddBook = () => {
  //useNavigate hook for navigation
  const navigate = useNavigate();
  //handleNavigate function for navigation to Home page
  const handleNavigate = () => {
    navigate("/");
  };

  //useState hook for set the data
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");

  //handleAddBook function for add a book to the library
  const handleAddBook = () => {
    //check the input fields are empty or not
    if (!title.trim() || !author.trim() || !description.trim()) {
      toast.error("Please fill all the fields");
    }

    const url: string = "http://localhost:5214/api/Library";
    const data = {
      title: title,
      author: author,
      description: description,
    };
    //post the data to the db
    axios
      .post(url, data)
      .then((result) => {
        console.log(result.data);
        cleanFields();
        alert(`${title} has been added to the library`);
        navigate("/");
      })
      //show the error message
      .catch((error) => {
        toast.error(error);
      });
  };

  //cleanFields function for clear the input fields after submit data
  const cleanFields = () => {
    setTitle("");
    setAuthor("");
    setDescription("");
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
              Add a Book To The Library
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
                  className="mb-5 rounded-xl
                  text-black
                  h-12
                  p-3
                  border-0
                  outline-none"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="author">Author</label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  className="mb-5 rounded-xl
                  text-black
                  h-12
                  p-3
                  border-0
                  outline-none"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />

                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  className="mb-5 rounded-xl
                  text-black
                  h-12
                  p-3
                  border-0
                  outline-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </form>

              {/* Form End */}

              {/* Button div start */}
              <div className="bg-inherit w-full flex justify-start mt-5  ">
                {/* Add Book Button */}
                <button
                  className=" bg-[#7809D0] w-72 h-12 rounded-3xl hover:bg-[#DBADFF] transition duration-300 ease-in-out mr-6 text-white text-lg font-bold"
                  onClick={() => handleAddBook()}
                >
                  <FontAwesomeIcon
                    icon={faCirclePlus}
                    beatFade
                    size="xl"
                    style={{ color: "#ffffff" }}
                  />{" "}
                  Add Book
                </button>

                {/* Go Back Button */}
                <button
                  className=" bg-[#7809D0] w-72 h-12 rounded-3xl hover:bg-[#DBADFF] transition duration-300 ease-in-out mr-6 text-white text-lg font-bold"
                  onClick={() => handleNavigate()}
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    beatFade
                    size="xl"
                    style={{ color: "#ffffff" }}
                  />{" "}
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
export default AddBook;
