import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [noticias, setNoticias] = useState([]);
  const [form, setForm] = useState({
    titulo: '',
    categoria: '',
    contenido: '',
    autor: ''
  });

  const API_URL = process.env.REACT_APP_API_URL;

  const cargarNoticias = async () => {
    try {
      const res = await fetch(`${API_URL}/noticias`);
      const data = await res.json();
      setNoticias(data);
    } catch (error) {
      console.error('Error cargando noticias:', error);
    }
  };

  useEffect(() => {
    cargarNoticias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/noticias`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setForm({ titulo: '', categoria: '', contenido: '', autor: '' });
    cargarNoticias();
  };

  return (
    <div className="app">
      <div className="news-card">
        <header className="header">
          <div className="badge">📰 Diario</div>
          <h1>El Diario Digital</h1>
          <p>Cuenca, Ecuador · {new Date().toLocaleDateString()}</p>
        </header>

      <main className="content">
     <div className="left-columns">
    <section className="featured">
      <h2>Portada</h2>
      {noticias[0] ? (
        <article className="featured-article">
          <h3>{noticias[0].titulo}</h3>
          <p className="meta">{noticias[0].categoria} · {noticias[0].fecha}</p>
          <p>{noticias[0].contenido}</p>
        </article>
      ) : (
        <p className="empty">No hay noticias aún.</p>
      )}
    </section>

    <section className="list">
      <h2>Más noticias</h2>
      {noticias.slice(1).length === 0 && (
        <p className="empty">Aún no se publican más notas.</p>
      )}
      {noticias.slice(1).map(n => (
        <article key={n.id} className="card">
          <h3>{n.titulo}</h3>
          <p className="meta">{n.categoria} · {n.fecha}</p>
          <p>{n.contenido}</p>
          <p className="autor">Por: {n.autor}</p>
        </article>
      ))}
    </section>
  </div>

  <aside className="form-panel">
            <h2>Publicar noticia</h2>
            <form onSubmit={handleSubmit} className="form">
              <input
                type="text"
                name="titulo"
                placeholder="Título"
                value={form.titulo}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="categoria"
                placeholder="Categoría"
                value={form.categoria}
                onChange={handleChange}
              />
              <input
                type="text"
                name="autor"
                placeholder="Autor"
                value={form.autor}
                onChange={handleChange}
              />
              <textarea
                name="contenido"
                placeholder="Contenido"
                value={form.contenido}
                onChange={handleChange}
                required
              />
              <button type="submit">Publicar</button>
            </form>
          </aside>
        </main>

        <footer className="footer">
          © 2025 El Diario Digital · Proyecto académico
        </footer>
      </div>
    </div>
  );
}

export default App;
