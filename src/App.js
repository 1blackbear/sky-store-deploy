import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import TelaInicial from './views/tela-inicial/';
import MenuSuperior from './components/menu-superior/menu';
import Portifolio from './views/portifolio/portifolio-main/business/index.js';
import SobreMim from './views/sobre-mim/';
import AddPortifolio from './views/portifolio/envio-imagem/business/index';
import PortifolioList from './views/portifolio/envio-imagem/business/portifolio-list';
import PortifolioSecDetail from './views/portifolio/portifolio-main/business/portifolio-details/sec-detail-page';
import PortifolioFirstDetail from './views/portifolio/portifolio-main/business/portifolio-details/first-detail-page';
import PortifolioThirdDetail from './views/portifolio/portifolio-main/business/portifolio-details/third-detail-page';
import { ReactComponent as BotaoWhatsapp } from './images/botao-whatsapp.svg';
import Prateleira from './views/prateleira';
import PrateleiraList from './views/prateleira/envio-item/envio';

function App() {
  
  return (
    <Router>
      <MenuSuperior className="menu"></MenuSuperior>
      <a href="https://wa.me/553898275301" target="_blank"><BotaoWhatsapp className="button-whatsapp"/></a>
      <Switch>
        <Route exact path='/' component={TelaInicial}/>
        <Route exact path='/portifolio' component={Portifolio}/>
        <Route exact path='/adiciona-portifolio' component={AddPortifolio}/>
        <Route exact path='/portifolio-list' component={PortifolioList}/>
        <Route exact path='/portifolio-details/:id' component={PortifolioFirstDetail}/>
        <Route exact path='/portifolio-details-1/:id' component={PortifolioSecDetail}/>
        <Route exact path='/portifolio-details-2/:id' component={PortifolioThirdDetail}/>
        <Route exact path='/sobre-mim' component={SobreMim}/>
        <Route exact path='/prateleira' component={Prateleira}/>
        <Route exact path='/prateleira-list' component={PrateleiraList}/>
      </Switch>
    </Router> 
  );
}

export default App;
