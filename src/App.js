
import './App.css';

import Vocales from './components/Vocales';
import 'semantic-ui-css/semantic.min.css';

function App() {
  return (
    <div className="App" style={{
      backgroundImage: `url(${process.env.PUBLIC_URL + '/images/fondo/fondo.png'})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      minHeight: '100vh',
      width: '100vw'
    }}>
      <Vocales />
      {/* Other components */}
    </div>
  );
}

export  default App;