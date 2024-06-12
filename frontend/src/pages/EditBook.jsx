import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSnackbar } from "notistack";
import Navbar from "../components/Navbar";

const EditBook = () => {
  const [judul, setJudul] = useState();
  const [deskripsi, setDeskripsi] = useState();
  const [tahun, setTahun] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((response) => {
        setJudul(response.data.judul);
        setDeskripsi(response.data.deskripsi);
        setTahun(response.data.tahun);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleSubmit() {
    const data = {
      judul,
      deskripsi,
      tahun,
    };
    axios
      .put(`http://localhost:3000/books/${id}`, data)
      .then(() => {
        navigate("/");
        enqueueSnackbar("Berhasil merubah buku", {
          variant: "success",
        });
      })
      .catch((error) => {
        alert("Data gagal di tambahkan");
        console.log(error);
      });
  }
  return (
    <>
      <Navbar />
      <div className="modal-box true w-1/2">
        <h2 className="text-lg font-bold">Edit Book</h2>
        <p className="py-4">Silahkan masukan merubah data buku!</p>
        <div className="modal-action w-full">
          <div className=" w-full">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xl mt-3 "
              onChange={(judul) => setJudul(judul.target.value)}
              defaultValue={judul}
              name="judul"
            />

            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xl mt-3"
              onChange={(deskripsi) => setDeskripsi(deskripsi.target.value)}
              name="deskripsi"
              defaultValue={deskripsi}
            />
            <input
              type="years"
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xl mt-3"
              onChange={(tahun) => setTahun(tahun.target.value)}
              defaultValue={tahun}
              name="tahun"
            />
            <br />
            <button
              className="inline-block border border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500
            hover:text-white font-bold py-2 px-4 rounded mt-3"
              type="submit"
              onClick={handleSubmit}
            >
              Ubah
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBook;
