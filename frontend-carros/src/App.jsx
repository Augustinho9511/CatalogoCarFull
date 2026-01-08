import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = 'http://localhost:8080/catalogo';

function App() {
  const [carros, setCarros] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({ mark: '', name: '', year: '', kilometragem: '' });

  const carregarCarros = async () => {
    try {
      const res = await axios.get(API_URL);
      setCarros(res.data);
    } catch (err) { console.error("Erro ao buscar:", err); }
  };

  useEffect(() => { carregarCarros(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Converte os campos para números antes de enviar
    const payload = {
      mark: formData.mark,
      name: formData.name,
      year: Number(formData.year),
      kilometragem: Number(formData.kilometragem)
    };

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }
      setEditId(null);
      setFormData({ mark: '', name: '', year: '', kilometragem: '' });
      carregarCarros();
    } catch (err) {
      console.error("Erro no POST:", err);
      alert("Erro ao salvar! Verifique se o Java está rodando na porta 8080.");
    }
  };

  const deletarCarro = async (id) => {
    if (window.confirm("Deseja excluir?")) {
      await axios.delete(`${API_URL}/${id}`);
      carregarCarros();
    }
  };

  return (
    <div className="app-container">
      <h1>🏎️ Catálogo Profissional</h1>
      <section className="form-box">
        <form onSubmit={handleSubmit}>
          <h2>{editId ? 'Editar Carro' : 'Adicionar Novo'}</h2>
          <div className="input-grid">
            <input placeholder="Marca" value={formData.mark} onChange={e => setFormData({...formData, mark: e.target.value})} required />
            <input placeholder="Modelo" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            <input type="number" placeholder="Ano" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} required />
            <input type="number" placeholder="KM" value={formData.kilometragem} onChange={e => setFormData({...formData, kilometragem: e.target.value})} required />
          </div>
          <button type="submit" className="btn-main">{editId ? 'Salvar' : 'Cadastrar'}</button>
        </form>
      </section>

      <div className="car-list">
        {carros.map(carro => (
          <div key={carro.id} className="car-card">
            <h3>{carro.mark} - {carro.name}</h3>
            <p>📅 Ano: {carro.year} | 🛣️ KM: {carro.kilometragem}</p>
            <div className="card-actions">
              <button onClick={() => { setEditId(carro.id); setFormData(carro); }} className="btn-edit">Editar</button>
              <button onClick={() => deletarCarro(carro.id)} className="btn-del">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;