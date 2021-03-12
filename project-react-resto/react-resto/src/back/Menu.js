import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { link } from "../axios/link";
import useDelete from "../Hook/useDelete";
import useGet from "../Hook/useGet";

const Menu = () => {
  const [isi] = useGet("/menu");
  const [kategori, setkategori] = useState([]);
  const [gambar, setgambar] = useState([]);
  const [idkategori, setidkategori] = useState([]);
  const [idmenu, setidmenu] = useState([]);
  const [pilihan, setpilihan] = useState(true);
  const { hapus, pesan, setpesan } = useDelete("/menu/");

  const { register, handleSubmit, reset, errors, setValue } = useForm();

  useEffect(() => {
    let ambil = true;
    async function fetchdata() {
      const res = await link.get("/kategori");
      if (ambil) {
        setkategori(res.data);
      }
    }
    fetchdata();
    return () => {
      ambil = false;
    };
  }, [kategori]);

  function simpan(data) {
    console.log(data);
    console.log(data.gambar[0]);

    const formData = new FormData();
    formData.append("idkategori", data.idkategori);
    formData.append("menu", data.menu);
    formData.append("gambar", data.gambar[0]);
    formData.append("harga", data.harga);

    if (pilihan) {
      link.post("/menu", formData).then((res) => {
        setpesan(res.data.pesan);
      });
      setpilihan(true);
    } else {
      link.post("/menu/" + idmenu, formData).then((res) => {
        setpesan(res.data.pesan);
      });
      setpilihan(true);
    }

    reset();
  }

  async function showData(id) {
    const res = await link.get("/menu/" + id);
    // console.log(res.data);
    setValue("menu", res.data[0].menu);
    setValue("harga", res.data[0].harga);
    setgambar(<img src={res.data[0].gambar} alt="" height="200" width="250" />);
    setidkategori(res.data[0].idkategori);
    setidmenu(res.data[0].idmenu);
    setpilihan(false);
  }

  let no = 1;

  return (
    <div>
      <div className="row">
        <h2>Data Menu</h2>
      </div>
      <div className="row">
        <div>
          <p>{pesan}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <form onSubmit={handleSubmit(simpan)}>
            <div className="mb-3">
              <label htmlFor="idkategori" className="form-label">
                Kategori
              </label>
              <select
                name="idkategori"
                id="idkategori"
                ref={register}
                className="form-control"
              >
                {kategori.map((val, index) =>
                  val.idkategori === idkategori ? (
                    <option key={index} selected value={val.idkategori}>
                      {val.kategori}
                    </option>
                  ) : (
                    <option key={index} value={val.idkategori}>
                      {val.kategori}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="menu" className="form-label">
                Menu
              </label>
              <input
                type="text"
                className="form-control"
                id="menu"
                name="menu"
                placeholder="menu"
                ref={register({ required: true })}
              />
              {errors.menu && "menu harus diisi"}
            </div>
            <div className="mb-3">
              <label htmlFor="harga" className="form-label">
                Harga
              </label>
              <input
                type="number"
                className="form-control"
                id="harga"
                name="harga"
                placeholder="harga"
                ref={register}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gambar" className="form-label">
                Gambar
              </label>
              <input
                type="file"
                className="form-control"
                id="gambar"
                name="gambar"
                ref={register}
              />
            </div>

            <div className="mb-3">
              <input type="submit" className="btn btn-primary" name="submit" />
            </div>
          </form>
        </div>
        <div className="col-4">{gambar}</div>
      </div>
      <div className="row">
        <table className="table mt-4">
          <thead>
            <tr>
              <th>No</th>
              <th>Kategori</th>
              <th>Menu</th>
              <th>Gambar</th>
              <th>Harga</th>
              <th>Hapus</th>
              <th>Ubah</th>
            </tr>
          </thead>
          <tbody>
            {isi.map((val, index) => (
              <tr key={index}>
                <td>{no++}</td>
                <td>{val.kategori}</td>
                <td>{val.menu}</td>
                <td>
                  <img src={val.gambar} height="100" width="150" alt="" />
                </td>
                <td>{val.harga}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => hapus(val.idmenu)}
                  >
                    Hapus
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => showData(val.idmenu)}
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

export default Menu;
