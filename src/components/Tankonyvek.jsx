import { useEffect, useState } from "react";

function Tankonyvek() {
  const [tankonyvek, setTankonyvek] = useState([]);
  const [szuro, setSzuro] = useState("");
  const [szerkesztesAlatt, setSzerkesztesAlatt] = useState(null);
  const [uj, setUj] = useState({ az: "", kiadoikod: "", cim: "", targy: "" });

  useEffect(() => {
    const mentett = localStorage.getItem("tk");
    if (mentett) {
      setTankonyvek(JSON.parse(mentett));
    } else {
      fetch("/tk.txt")
        .then((res) => res.text())
        .then((text) => {
          const rows = text.trim().split("\n");
          const data = rows.map((row, i) => {
           
            const [az, kiadoikod, cim, targy] = row.split("\t").map(s => s.trim());
            return { 
              az: Number(az) || i, 
              kiadoikod: kiadoikod || "", 
              cim: cim || "", 
              targy: targy || "" 
            };
          });
          setTankonyvek(data);
          localStorage.setItem("tk", JSON.stringify(data));
        });
    }
  }, []);

  const mentesLocalStoragebe = (ujLista) => {
    setTankonyvek(ujLista);
    localStorage.setItem("tk", JSON.stringify(ujLista));
  };

  const handleAdd = () => {
    if (!uj.cim || !uj.targy || !uj.kiadoikod) return alert("Minden mezőt ki kell tölteni!");
    
    const ujElem = { 
        ...uj, 
        az: Date.now(),
        targy: uj.targy.trim(),
        cim: uj.cim.trim(),
        kiadoikod: uj.kiadoikod.trim()
    };
    
    mentesLocalStoragebe([...tankonyvek, ujElem]);
    setUj({ az: "", kiadoikod: "", cim: "", targy: "" }); 
    setSzuro("");
  };

  const handleDelete = (id) => {
    const frissitve = tankonyvek.filter(t => t.az !== id);
    mentesLocalStoragebe(frissitve);
  };

  const handleEditClick = (konyv) => setSzerkesztesAlatt({ ...konyv });

  const handleUpdate = () => {
    if (!szerkesztesAlatt.cim || !szerkesztesAlatt.targy || !szerkesztesAlatt.kiadoikod) {
        return alert("Szerkesztéskor sem maradhat üres mező!");
    }

    const tisztitottSzerkesztes = {
        ...szerkesztesAlatt,
        targy: szerkesztesAlatt.targy.trim(),
        cim: szerkesztesAlatt.cim.trim(),
        kiadoikod: szerkesztesAlatt.kiadoikod.trim()
    };

    const frissitve = tankonyvek.map(t => 
      t.az === szerkesztesAlatt.az ? tisztitottSzerkesztes : t
    );
    mentesLocalStoragebe(frissitve);
    setSzerkesztesAlatt(null);
  };

  const targyak = [...new Set(tankonyvek.map((t) => t.targy.trim()))].sort();


  const megjelenitett = szuro
    ? tankonyvek.filter(t => t.targy.trim().toLowerCase() === szuro.trim().toLowerCase())
    : tankonyvek;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Tankönyv Nyilvántartás</h2>

      <div style={{ marginBottom: "20px" }}>
        <label>Szűrés tárgy szerint: </label>
        <select onChange={(e) => setSzuro(e.target.value)} value={szuro}>
          <option value="">Összes tárgy</option>
          {targyak.map((t, i) => <option key={i} value={t}>{t}</option>)}
        </select>
      </div>

      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>Cím</th>
            <th>Tárgy</th>
            <th>Kiadói kód</th>
            <th>Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {megjelenitett.map((t) => (
            <tr key={t.az}>
              <td>{t.cim}</td>
              <td>{t.targy}</td>
              <td><code>{t.kiadoikod}</code></td>
              <td>
                <button onClick={() => handleEditClick(t)}>Szerkeszt</button>
                <button onClick={() => handleDelete(t.az)} style={{ color: "red", marginLeft: "5px" }}>Törlés</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr style={{ margin: "30px 0" }} />

      {szerkesztesAlatt ? (
        <div style={{ background: "#e1f5fe", padding: "15px", borderRadius: "8px" }}>
          <h3>Könyv szerkesztése</h3>
          <input placeholder="Cím" value={szerkesztesAlatt.cim} onChange={e => setSzerkesztesAlatt({...szerkesztesAlatt, cim: e.target.value})} />
          <input placeholder="Tárgy" value={szerkesztesAlatt.targy} onChange={e => setSzerkesztesAlatt({...szerkesztesAlatt, targy: e.target.value})} />
          <input placeholder="Kiadói kód" value={szerkesztesAlatt.kiadoikod} onChange={e => setSzerkesztesAlatt({...szerkesztesAlatt, kiadoikod: e.target.value})} />
          <div style={{ marginTop: "10px" }}>
            <button onClick={handleUpdate} style={{ backgroundColor: "#4caf50", color: "white", padding: "5px 15px" }}>Mentés</button>
            <button onClick={() => setSzerkesztesAlatt(null)} style={{ marginLeft: "10px" }}>Mégse</button>
          </div>
        </div>
      ) : (
        <div style={{ background: "#f5f5f5", padding: "15px", borderRadius: "8px" }}>
          <h3> Új tankönyv hozzáadása</h3>
          <input placeholder="Cím" value={uj.cim} onChange={(e) => setUj({ ...uj, cim: e.target.value })} />
          <input placeholder="Tárgy" value={uj.targy} onChange={(e) => setUj({ ...uj, targy: e.target.value })} />
          <input placeholder="Kiadói kód" value={uj.kiadoikod} onChange={(e) => setUj({ ...uj, kiadoikod: e.target.value })} />
          <button onClick={handleAdd} style={{ marginLeft: "10px", padding: "5px 15px" }}>Hozzáadás</button>
        </div>
      )}
    </div>
  );
}

export default Tankonyvek;