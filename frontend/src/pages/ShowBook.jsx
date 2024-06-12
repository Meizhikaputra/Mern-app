import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar";

const ShowBook = () => {
  const [book, setBook] = useState({});

  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="w-full flex p-5">
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{book.judul}</h2>
            <p>{book.deskripsi}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">{book.tahun}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowBook;
