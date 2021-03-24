import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useGet from "../Hook/useGet";
import Modal from "react-modal";
import { link } from "../axios/link";

Modal.setAppElement("#root");
const Order = () => {
  let today = new Date().toISOString().slice(0, 10);
  const [mopen, setmopen] = useState(false);
  const [total, settotal] = useState(0);
  const [pelanggan, setpelanggan] = useState("");
  const [idorder, setidorder] = useState("");
  const [awal, setawal] = useState("2021-01-01");
  const [akhir, setakhir] = useState(today);
  const [isi] = useGet(`/order/${awal}/${akhir}`);
  const { register, handleSubmit, setValue, errors } = useForm();
  function cari(data) {
    setawal(data.tawal);
    setakhir(data.takhir);
  }
  function filterData(id) {
    const data = isi.filter((val) => val.idorder === id);
    setpelanggan(data[0].pelanggan);
    settotal(data[0].total);
    setidorder(data[0].idorder);
    setmopen(true);
  }
  function isiForm() {
    setValue("total", total);
  }
  async function simpan(data) {
    let hasil = {
      bayar: data.bayar,
      kembali: data.bayar - data.total,
      status: 1,
    };
    const res = await link.put("/order/" + idorder, hasil);
    setmopen(false);
  }
  let no = 1;
  return (
    <div>
      <Modal
        isOpen={mopen}
        onRequestClose={() => setmopen(false)}
        onAfterOpen={isiForm}
        style={{
          overlay: {
            background: "transparent !important",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
          },
        }}
      >
        <div className="row">
          <h2>Pembayaran Order {pelanggan}</h2>
        </div>
        <div className="row">
          <div className="col">
            <form onSubmit={handleSubmit(simpan)}>
              <div className="mb-3">
                <label htmlFor="total" className="form-label">
                  Total
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="total"
                  name="total"
                  placeholder="total"
                  ref={register({ required: true })}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="bayar" className="form-label">
                  Bayar
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="bayar"
                  name="bayar"
                  placeholder="bayar"
                  ref={register({ required: true, min: total })}
                />
                {errors.bayar && "Pembayaran Kurang"}
              </div>
              <div className="mb-3">
                <input
                  type="submit"
                  className="btn btn-primary mr-2"
                  name="submit"
                  value="Bayar"
                />
                <input
                  type="submit"
                  className="btn btn-danger"
                  name="batal"
                  value="Batal"
                  onClick={() => setmopen(false)}
                />
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <div className="row">
        <div>
          <h2>Data Order</h2>
        </div>
      </div>
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
                <th>Pelanggan</th>
                <th>Tgl Order</th>
                <th>Total</th>
                <th>Bayar</th>
                <th>Kembali</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {isi.map((val, index) => (
                <tr key={index}>
                  <td>{no++}</td>
                  <td>{val.idorder}</td>
                  <td>{val.pelanggan}</td>
                  <td>{val.tglorder}</td>
                  <td>{val.total}</td>
                  <td>{val.bayar}</td>
                  <td>{val.kembali}</td>
                  <td>
                    {val.status === 0 ? (
                      <button
                        className="btn btn-danger"
                        onClick={() => filterData(val.idorder)}
                      >
                        Belum Bayar
                      </button>
                    ) : (
                      <p>Lunas</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
