import { useState } from "react";
import { link } from "../axios/link";


const useDelete = (url) => {
    const [pesan,setpesan] = useState("");
    async function hapus(id) {  
        if (window.confirm("yakin akan menghapus?")) {
            const res = await link.delete(url + id);
            setpesan(res.data.pesan);
          }
    }
    return {hapus,pesan,setpesan};
}

export default useDelete;
