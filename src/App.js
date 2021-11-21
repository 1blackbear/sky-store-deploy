import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import TelaInicial from './views/tela-inicial/';
import MenuSuperior from './components/menu-superior/menu';
import Portifolio from './views/portifolio/portifolio-main/business/index.js';
import SobreMim from './views/sobre-mim/';
import {Manutencao} from './manutencao.js';
import {Encomendas} from './views/encomendas/index.js';
import AddPortifolio from './views/portifolio/envio-imagem/business/index';
import PortifolioList from './views/portifolio/envio-imagem/business/portifolio-list';
import PortifolioSecDetail from './views/portifolio/portifolio-main/business/portifolio-details/sec-detail-page';
import PortifolioFirstDetail from './views/portifolio/portifolio-main/business/portifolio-details/first-detail-page';
import PortifolioThirdDetail from './views/portifolio/portifolio-main/business/portifolio-details/third-detail-page';
import { ReactComponent as BotaoWhatsapp } from './images/botao-whatsapp.svg';
import Prateleira from './views/prateleira';
import PrateleiraList from './views/prateleira/envio-item/envio';
import { storage, fs, auth } from './config/firebase.js';
import { useState, useEffect } from 'react';
import { AnimatePresence } from "framer-motion";
import FormsEditPortifolio from './views/portifolio/envio-imagem/editar/form-edita';
import FormsPrateleira from './views/prateleira/envio-item/adicionar/forms-prateleira';
import FormsEditPrateleira from './views/prateleira/envio-item/editar/forms-edit-prateleira';
import EncomendasList from './views/encomendas/encomendas-list/encomendas-list.js';
import EncomendasListSky from './views/encomendas/encomendas-list/encomendas-list-sky.js';
import Perfil from './views/perfil/index.js';
import SubmenuList from './views/prateleira/submenu/submenu';
import FormSubmenu from './views/prateleira/submenu/adicionar/forms-submenu';
import FormSubmenuEdit from './views/prateleira/submenu/editar/forms-submenu-edit';

const App = () => {
  const [showBtn, setShowBtn] = useState(false);
    
  //Atualização dinâmicas de itens da coluna com base em lista do firebase
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user && user.uid == "UGr7iwkw4ONmIlS16rJzROSTQ6A3") {
        setShowBtn(true);
      }
    })
  }, [])

  
  return (
    <AnimatePresence>
      <Router>
        <MenuSuperior className="menu"></MenuSuperior>
        {!showBtn && (
          <a href="https://wa.me/553898275301" target="_blank"><BotaoWhatsapp className="button-whatsapp" /></a>
        )}
        <Switch> 
          <Route exact path='/' component={TelaInicial} />
          <Route exact path='/manutencao' component={Manutencao} />
          <Route exact path='/portifolio' component={Portifolio} />
          <Route exact path='/adiciona-portifolio' component={AddPortifolio} />
          <Route exact path='/portifolio-list' component={PortifolioList} />
          <Route exact path='/portifolio-details/:id' component={PortifolioFirstDetail} />
          <Route exact path='/portifolio-details-1/:id' component={PortifolioSecDetail} />
          <Route exact path='/portifolio-details-2/:id' component={PortifolioThirdDetail} />
          <Route exact path='/sobre-mim' component={SobreMim} />
          <Route exact path='/prateleira' component={Prateleira} />
          <Route exact path='/prateleira-list' component={PrateleiraList} />
          <Route exact path='/encomendas' component={Encomendas} />
          <Route exact path='/adiciona-prateleira' component={FormsPrateleira}/>
          <Route exact path='/edita-portifolio/:id' component={FormsEditPortifolio}/>
          <Route exact path='/edita-prateleira/:id' component={FormsEditPrateleira}/>
          <Route exact path='/encomendas-list' component={EncomendasList} />
          <Route exact path='/encomendas-list-sky' component={EncomendasListSky} />
          <Route exact path='/perfil' component={Perfil} />
          <Route exact path='/submenu-list' component={SubmenuList} />
          <Route exact path='/adiciona-submenu' component={FormSubmenu} />
          <Route exact path='/edita-submenu/:id' component={FormSubmenuEdit} />

        </Switch>
      </Router>
    </AnimatePresence>
  );
}

export default App;
