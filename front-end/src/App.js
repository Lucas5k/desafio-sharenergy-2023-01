import './App.css';
import RouterPages from './Components/RouterPages';
import Provider from './Context/Provider';

function App() {
  return (
    <section>
      <Provider>
        <RouterPages />
      </Provider>
    </section>
  );
}

export default App;
