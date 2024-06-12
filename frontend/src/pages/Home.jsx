import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSnackbar } from "notistack";
import Modal from "../components/Modal";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const refresh = () => {
    axios
      .get("http://localhost:3000/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleDelete() {
    const setuju = confirm("yakin");
    if (setuju) {
      axios
        .delete(`http://localhost:3000/books/${id}`)
        .then((response) => {
          refresh();
          enqueueSnackbar("Buku berhasil di hapus!", { variant: "warning" });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  return (
    <>
      <Navbar />

      {isOpen && (
        <Modal closeModal={closeModal} isOpen={isOpen} setBooks={setBooks} />
      )}

      <div className="p-4 w-full">
        <div className="flex my-4 w-full justify-between">
          <h1 className="text-3xl">Books List</h1>
          <Link
            className="inline-block border border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500
            hover:text-white font-bold py-2 px-4 rounded "
            onClick={openModal}
          >
            Add New Book
          </Link>
        </div>
        <div className="flex justify-between items-center">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>Judul</th>
                  <th>Deskripsi</th>
                  <th>Tahun Terbit</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {books.map((book, index) => {
                  return (
                    <tr key={book._id}>
                      <th>{index + 1}</th>
                      <td>{book.judul}</td>
                      <td>{book.deskripsi}</td>
                      <td>{book.tahun}</td>
                      <td className="flex gap-2">
                        <Link
                          className="btn  btn-info bg-transparent text-info btn-xs hover:text-white"
                          to={"/books/detail/" + book._id}
                        >
                          Show
                        </Link>
                        <Link
                          className="btn  btn-warning bg-transparent text-warning btn-xs hover:text-white"
                          to={"/books/edit/" + book._id}
                        >
                          Edit
                        </Link>
                        <Link
                          className="btn  btn-error bg-transparent text-error btn-xs hover:text-white"
                          onClick={() => {
                            handleDelete();
                          }}
                        >
                          Delete
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
