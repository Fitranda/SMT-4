import React, { useState } from "react";
import { link } from "../axios/link";
import { useForm } from "react-hook-form";
import useGet from "../Hook/useGet";

const Kategori = () => {
  // const [isi, setIsi] = useState([]);
  const [pesan, setpesan] = useState([]);
  const [idkategori, setidkategori] = useState([]);
  const [pilihan, setpilihan] = useState(true);

  const { register, handleSubmit, reset, errors, setValue } = useForm();

  // async function fetcData() {
  //   const request = await link.get("/kategori");
  //   setIsi(request.data);
  // }
  const [isi] = useGet('/kategori');

  function simpan(data) {
    if (pilihan) {
      link.post("/kategori", data).then((res) => {
        setpesan(res.data.pesan);
      });
    } else {
      link
        .put("/kategori/" + idkategori, data)
        .then((res) => setpesan(res.data.pesan));
      setpilihan(true);
    }

    // fetcData();
    reset();
  }

  async function hapus(id) {
    if (window.confirm("yakin akan menghapus?")) {
      const res = await link.delete("/kategori/" + id);
      setpesan(res.data.pesan);
    }
  }

  async function showData(id) {
    const res = await link.get("/kategori/" + id);
    console.log(res.data);
    console.log(res.data[0].kategori);
    setValue("kategori", res.data[0].kategori);
    setValue("keterangan", res.data[0].keterangan);
    setidkategori(res.data[0].idkategori);
    setpilihan(false);
  }

  // fetcData();

  // useEffect(() => {
  //   fetcData();
  // }, [isi]);

  let no = 1;

  return (
    <div>
      <div className="row">
        <h2>Data Kategori</h2>
      </div>
      <div className="row">
        <p>{pesan}</p>
      </div>
      <div className="row">
        <div className="col-4">
          <form onSubmit={handleSubmit(simpan)}>
            <div className="mb-3">
              <label htmlFor="kategori" className="form-label">
                Kategori
              </label>
              <input
                type="text"
                className="form-control"
                id="kategori"
                name="kategori"
                placeholder="kategori"
                ref={register({ required: true })}
              />
              {errors.kategori && "Kategori harus diisi"}
            </div>
            <div className="mb-3">
              <label htmlFor="keterangan" className="form-label">
                Keterangan
              </label>
              <input
                type="text"
                className="form-control"
                id="keterangan"
                name="keterangan"
                placeholder="keterangan"
                ref={register}
              />
            </div>
            <div className="mb-3">
              <input
                type="submit"
                className="btn btn-primary"
                name="keterangan"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <table className="table mt-4">
          <thead>
            <tr>
              <th>No</th>
              <th>Kategori</th>
              <th>Keterangan</th>
              <th>Hapus</th>
              <th>Ubah</th>
            </tr>
          </thead>

          <tbody>
            {isi.map((val, index) => (
              <tr key={index}>
                <td>{no++}</td>
                <td>{val.kategori}</td>
                <td>{val.keterangan}</td>
                <td>
                  <button
                    onClick={() => hapus(val.idkategori)}
                    className="btn btn-danger"
                  >
                    Hapus
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => showData(val.idkategori)}
                    className="btn btn-warning"
                  >
                    Ubah
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Kategori;
