import axios from "axios";
import { useState } from "react";
import { useSnackbar } from "notistack";

const Modal = ({ closeModal, setBooks }) => {
  const [judul, setJudul] = useState();
  const [deskripsi, setDeskripsi] = useState();
  const [tahun, setTahun] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const refresh = () => {
    axios
      .get("http://localhost:3000/books")
      .then((response) => {
        setBooks(response.data);
        enqueueSnackbar("Berhasil menambahkan buku baru", {
          variant: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleSubmit() {
    const data = {
      judul,
      deskripsi,
      tahun,
    };
    axios
      .post("http://localhost:3000/books", data)
      .then(() => {
        closeModal();

        refresh();
      })
      .catch((error) => {
        alert("Data gagal di tambahkan");
        console.log(error);
      });
  }
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeModal}
    >
      <div className="modal modal-open">
        <div
          className="modal-box true w-1/2"
          onClick={(event) => event.stopPropagation()}
        >
          <button
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={closeModal}
          >
            ✕
          </button>
          <h2 className="text-lg font-bold">Add New Book</h2>
          <p className="py-4">Silahkan masukan data buku baru!</p>
          <div className="modal-action w-full">
            <div className=" w-full">
              <input
                type="text"
                placeholder="Judul"
                className="input input-bordered input-primary w-full max-w-xl mt-3 "
                onChange={(judul) => setJudul(judul.target.value)}
                name="judul"
              />

              <input
                type="text"
                placeholder="Deskripsi"
                className="input input-bordered input-primary w-full max-w-xl mt-3"
                onChange={(deskripsi) => setDeskripsi(deskripsi.target.value)}
                name="deskripsi"
              />
              <input
                type="years"
                placeholder="Tahun"
                className="input input-bordered input-primary w-full max-w-xl mt-3"
                onChange={(tahun) => setTahun(tahun.target.value)}
                name="tahun"
              />
              <br />
              <button
                className="inline-block border border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500
            hover:text-white font-bold py-2 px-4 rounded mt-3"
                type="submit"
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
