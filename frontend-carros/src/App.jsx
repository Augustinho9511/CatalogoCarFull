import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:8080/catalogo';

function App() {
  const [carros, setCarros] = useState([]);
  const [editId, setEditId] = useState(null);

  // Estado com todos os campos + a nova Imagem
  const [formData, setFormData] = useState({
    name: '', mark: '', price: '', year: '', warranty: '', 
    kilometragem: '', condition: '', serviceHistory: '', fuelType: '', 
    transmission: '', engine: '', doors: '', exteriorColor: '', interiorColor: '',
    imageUrl: '' // <--- Novo campo para o link da foto
  });

  const carregarCarros = async () => {
    try {
      const res = await axios.get(API_URL);
      setCarros(res.data);
    } catch (err) {
      console.error("Erro ao buscar:", err);
    }
  };

  useEffect(() => { carregarCarros(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Converte textos para números para o Java aceitar
    const payload = {
      ...formData,
      price: Number(formData.price),
      year: Number(formData.year),
      kilometragem: Number(formData.kilometragem)
    };

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }
      limparForm();
      carregarCarros();
      alert("Salvo com sucesso!");
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao salvar. Verifique se o backend está rodando.");
    }
  };

  const prepararEdicao = (carro) => {
    setEditId(carro.id);
    setFormData(carro);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deletarCarro = async (id) => {
    if (confirm("Tem certeza que deseja excluir?")) {
      await axios.delete(`${API_URL}/${id}`);
      carregarCarros();
    }
  };

  const limparForm = () => {
    setEditId(null);
    setFormData({
      name: '', mark: '', price: '', year: '', warranty: '', 
      kilometragem: '', condition: '', serviceHistory: '', fuelType: '', 
      transmission: '', engine: '', doors: '', exteriorColor: '', interiorColor: '', imageUrl: ''
    });
  };

  const formatMoney = (val) => Number(val).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="main-container">
      <div className="content-wrapper">
        
        <header className="app-header">
          <h1>🏎️ Catálogo Premium</h1>
          <p>Gerenciamento de Estoque Profissional</p>
        </header>

        {/* --- FORMULÁRIO --- */}
        <section className="form-card">
          <h2>{editId ? 'Editar Veículo' : 'Cadastrar Novo Veículo'}</h2>
          
          <form onSubmit={handleSubmit}>
            
            {/* Campo da FOTO (Destaque) */}
            <div className="image-input-section">
              <label>Foto do Carro (URL)</label>
              <input 
                placeholder="Cole o link da imagem aqui (https://...)" 
                value={formData.imageUrl} 
                onChange={e => setFormData({...formData, imageUrl: e.target.value})} 
              />
              {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="img-preview"/>}
            </div>

            <h3>Dados Principais</h3>
            <div className="inputs-grid">
              <input placeholder="Marca (Ex: BMW)" value={formData.mark} onChange={e => setFormData({...formData, mark: e.target.value})} required />
              <input placeholder="Modelo (Ex: M5)" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
              <input type="number" placeholder="Preço (R$)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required className="input-price" />
              <input type="number" placeholder="Ano" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} required />
              
              <select value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})} required>
                <option value="">Selecione a Condição</option>
                <option value="Novo">Novo</option>
                <option value="Seminovo">Seminovo</option>
                <option value="Usado">Usado</option>
              </select>
            </div>

            <h3>Especificações</h3>
            <div className="inputs-grid">
              <input type="number" placeholder="KM" value={formData.kilometragem} onChange={e => setFormData({...formData, kilometragem: e.target.value})} required />
              <input placeholder="Motor (Ex: V8)" value={formData.engine} onChange={e => setFormData({...formData, engine: e.target.value})} required />
              
              <select value={formData.transmission} onChange={e => setFormData({...formData, transmission: e.target.value})} required>
                <option value="">Câmbio</option>
                <option value="Automático">Automático</option>
                <option value="Manual">Manual</option>
                <option value="CVT">CVT</option>
              </select>

              <select value={formData.fuelType} onChange={e => setFormData({...formData, fuelType: e.target.value})} required>
                <option value="">Combustível</option>
                <option value="Gasolina">Gasolina</option>
                <option value="Híbrido">Híbrido</option>
                <option value="Elétrico">Elétrico</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>

            <h3>Detalhes & Aparência</h3>
            <div className="inputs-grid">
              <input placeholder="Cor Externa" value={formData.exteriorColor} onChange={e => setFormData({...formData, exteriorColor: e.target.value})} required />
              <input placeholder="Cor Interna" value={formData.interiorColor} onChange={e => setFormData({...formData, interiorColor: e.target.value})} required />
              <input placeholder="Portas" value={formData.doors} onChange={e => setFormData({...formData, doors: e.target.value})} required />
              <input placeholder="Garantia" value={formData.warranty} onChange={e => setFormData({...formData, warranty: e.target.value})} required />
              <input placeholder="Histórico" value={formData.serviceHistory} onChange={e => setFormData({...formData, serviceHistory: e.target.value})} required style={{gridColumn: 'span 2'}} />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-save">{editId ? 'Salvar Alterações' : 'Cadastrar'}</button>
              {editId && <button type="button" onClick={limparForm} className="btn-cancel">Cancelar</button>}
            </div>
          </form>
        </section>

        {/* --- LISTA DE CARROS (GRID) --- */}
        <section className="cars-list">
          {/* Proteção extra: só mostra o tamanho se a lista existir */}
          <h2>Estoque Disponível ({carros?.length || 0})</h2>
          
          <div className="cars-grid">
            {/* Proteção extra: Verifica se 'carros' é uma lista antes de mapear */}
            {Array.isArray(carros) && carros.map(carro => {
               // Se por milagre um carro vier nulo, pula ele
               if (!carro) return null;

               return (
              <div key={carro.id} className="car-card">
                
                {/* Imagem do Carro */}
                <div className="card-image">
                  {/* Proteção: usa ?. para evitar erro se 'condition' for nulo */}
                  <span className={`badge-condition ${carro?.condition === 'Novo' ? 'bg-green' : 'bg-orange'}`}>
                    {carro?.condition || 'N/A'}
                  </span>
                  <img 
                    src={carro.imageUrl || "https://via.placeholder.com/400x250?text=Sem+Foto"} 
                    alt={carro.name || 'Carro'} 
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x250?text=Erro+na+Foto"; }}
                  />
                </div>

                <div className="card-content">
                  <div className="card-header-info">
                    {/* Proteções extras com || 'Texto Padrão' */}
                    <span className="badge-brand">{carro?.mark || 'Marca?'}</span>
                    <span className="year-text">{carro?.year || 'Ano?'}</span>
                  </div>
                  
                  <h3>{carro?.name || 'Modelo sem nome'}</h3>
                  
                  {/* Proteção crucial no preço: só formata se o preço existir */}
                  <div className="price">
                    {carro.price ? formatMoney(carro.price) : 'Preço sob consulta'}
                  </div>

                  <div className="specs-row">
                    <span>🛣️ {carro?.kilometragem || '?'}km</span>
                    <span>⚙️ {carro?.transmission || '?'}</span>
                    <span>⛽ {carro?.fuelType || '?'}</span>
                  </div>

                  <div className="card-actions">
                    <button onClick={() => prepararEdicao(carro)} className="btn-edit">Editar</button>
                    <button onClick={() => deletarCarro(carro.id)} className="btn-del">Excluir</button>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App;