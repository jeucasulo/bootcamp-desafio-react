import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('repositories').then((res) => {
      console.log(res);
      setRepositories(res.data);
    });
  }, []);
  async function handleAddRepository() {
    const res = await api.post('repositories', {
      "title": "Desafio Node.js" + Date.now(),
      "url": "http://github.com/...",
      "techs": ["Node.js", "..."],
      "likes": 0
    })
    setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    // alert(id);
    const repIndex = repositories.findIndex(rep => rep.id === id)
    if (repIndex < 0) {
      alert("Not found...");
    }
    // const repIndex = repositories.findIndex(rep=>rep.id===request.params.id)
    // alert(repIndex);

    repositories.splice(repIndex, 1);

    setRepositories([...repositories]);
    api.delete('http://localhost:3333/repositories/' + id)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {/* <li> */}
        {/* Repositório 1 */}

        {repositories.map(rep => (
          <li key={rep.id}>
            {rep.title}
            <button onClick={() => handleRemoveRepository(rep.id)}>
              Remover
            </button>
          </li>
        ))
        }

        {/* <button onClick={() => handleRemoveRepository(1)}>
          Remover
          </button> */}
        {/* </li> */}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
