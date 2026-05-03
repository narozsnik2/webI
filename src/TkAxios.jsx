import React, { useState, useEffect } from 'react';
import axios from 'axios';

const api = "http://www.njewebeadando.nhely.hu/fetchapi/tk.php";

function TkAxios() {
    const [konyvek, setKonyvek] = useState([]);
    const [form, setForm] = useState({ az: '', kiadoikod: '', cim: '', targy: '' });
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => { loadKonyvek(); }, []);

    const loadKonyvek = async () => {
        const res = await axios.get(api);
        console.log(res.data);

        setKonyvek(res.data.data || []);
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (isEdit) {
            await axios.put(api, form);
        } else {
            await axios.post(api, form);
        }

        setForm({ az: '', kiadoikod: '', cim: '', targy: '' });
        setIsEdit(false);
        loadKonyvek();
    };

    const deleteKonyv = async (az) => {
        if (window.confirm("Törli ezt a könyvet?")) {
            await axios.delete(api, { data: { az } });
            loadKonyvek();
        }
    };

    const prepareEdit = (konyv) => {
        setForm(konyv);
        setIsEdit(true);
    };

    return (
        <div>
            <h2>Tankönyv adatbázis</h2>

            <form onSubmit={handleSave}>
                <input type="number" placeholder="ID"
                    value={form.az}
                    onChange={e => setForm({ ...form, az: e.target.value })}
                    disabled={isEdit}
                    required
                />

                <input type="text" placeholder="Kiadói kód"
                    value={form.kiadoikod}
                    onChange={e => setForm({ ...form, kiadoikod: e.target.value })}
                    required
                />

                <input type="text" placeholder="Cím"
                    value={form.cim}
                    onChange={e => setForm({ ...form, cim: e.target.value })}
                    required
                />

                <input type="text" placeholder="Tárgy"
                    value={form.targy}
                    onChange={e => setForm({ ...form, targy: e.target.value })}
                    required
                />

                <button type="submit">{isEdit ? "Módosítás" : "Hozzáadás"}</button>
            </form>

            <table border="1" width="100%">
                <thead>
                    <tr>
                        <th>ID</th><th>Kód</th><th>Cím</th><th>Tárgy</th><th>Művelet</th>
                    </tr>
                </thead>
                <tbody>
                    {konyvek.map(k => (
                        <tr key={k.az}>
                            <td>{k.az}</td>
                            <td>{k.kiadoikod}</td>
                            <td>{k.cim}</td>
                            <td>{k.targy}</td>
                            <td>
                                <button onClick={() => prepareEdit(k)}>Szerkeszt</button>
                                <button onClick={() => deleteKonyv(k.az)}>Töröl</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TkAxios;