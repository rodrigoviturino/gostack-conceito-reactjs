import React from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = React.useState([]);

  React.useEffect(() => {
    api.get('repositories').then( (response) => { 
      setRepositories(response.data) 
    });
  },[]);

  async function handleAddRepository() {
    const addNew = await api.post('repositories', {
      title: 'FullStack',
      url: 'https://github.com/rodrigoviturino',
      techs: ['JS', 'HTML', 'CSS']
    })

    setRepositories([...repositories, addNew.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const removeItem= repositories.filter(repository => repository.id !== id)
    setRepositories(removeItem);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return(
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
        )})}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}



export default App;
