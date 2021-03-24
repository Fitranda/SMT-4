import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useGet from "../Hook/useGet";

const Detail = () => {
  let today = new Date().toISOString().slice(0, 10);
  const [awal, setawal] = useState("2021-01-01");
  const [akhir, setakhir] = useState(today);
  const [isi] = useGet(`/detail/${awal}/${akhir}`);
  function cari(data) {
    setawal(data.tawal);
    setakhir(data.takhir);
  }
  let No = 1;
  const { register, handleSubmit } = useForm();
  return (
    <div>
      <div className="row"><h2>Detail Penjualan</h2></div>
      <div className="row">
      <form onSubmit={handleSubmit(cari)}>
          <div className="mb-3">
            <label htmlFor="tawal" className="form-label">
              Tanggal Awal
            </label>
            <input
              type="date"
              className="form-control"
              id="tawal"
              name="tawal"
              ref={register}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="takhir" className="form-label">
              Tanggal Akhir
            </label>
            <input
              type="date"
              className="form-control"
              id="takhir"
              name="takhir"
              ref={register}
            />
          </div>
          <div className="mb-3">
            <input
              type="submit"
              className="btn btn-primary"
              name="submit"
              value="Cari"
            />
          </div>
        </form>
      </div>
      <div className="row">
        <div>
          <table className="table mt-4">
            <thead>
              <tr>
                <th>No</th>
                <th>Faktur</th>
                <th>Tgl Order</th>
                <th>Menu</th>
                <th>Harga</th>
                <th>Jumlah</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {isi.map((val, index) => (
                <tr key={index}>
                  <td>{No++}</td>
                  <td>{val.idorder}</td>
                  <td>{val.tglorder}</td>
                  <td>{val.menu}</td>
                  <td>{val.hargajual}</td>
                  <td>{val.jumlah}</td>
                  <td>{val.jumlah * val.hargajual}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Detail;
