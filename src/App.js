import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TelaInicial from './views/tela-inicial/';
import MenuSuperior from './components/menu-superior/menu';
import Portifolio from './views/portifolio/';
import SobreMim from './views/sobre-mim/';
import AddPortifolio from './views/portifolio/envio-imagem/';
import { ReactComponent as BotaoWhatsapp } from './images/botao-whatsapp.svg';
import Prateleira from './views/prateleira';

function App() {
  
  return (
    <Router>
      <MenuSuperior className="menu"></MenuSuperior>
      <a href="https://wa.me/553898275301" target="_blank"><BotaoWhatsapp className="button-whatsapp"/></a>
      <Switch>
        <Route exact path='/' component={TelaInicial}/>
        <Route exact path='/portifolio' component={Portifolio}/>
        <Route exact path='/adiciona-portifolio' component={AddPortifolio}/>
        <Route exact path='/sobre-mim' component={SobreMim}/>
        <Route exact path='/prateleira' component={Prateleira}/>
      </Switch>
    </Router> 
  );
}

export default App;
