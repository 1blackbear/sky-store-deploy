import './menu.css';
import './modal-login/modal-login.css';
import React, { useState, useEffect } from 'react';
import { ReactComponent as Logo } from '../../images/logo.svg';
import PersonIcon from '@material-ui/icons/Person';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import {  Link } from "react-router-dom";
import { ButtonMobile } from './button-login/button.js';
import ModalCadastro from '../modal-cadastro/modal-cadastro';
import ModalLogin from './modal-login/modal-login';
import { Dropdown } from 'react-bootstrap';
import ModalEsqueciSenha from './modal-login/modal-esquecisenha/modal-esquecisenha';
import { auth } from '../../config/firebase.js';


function MenuSuperior() {

    /*Atributos do usuário atual */
    function GetCurrentUser() {
        const [userAdmin, setUser] = useState(null);
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    if (user.uid.toString() == "UGr7iwkw4ONmIlS16rJzROSTQ6A3") {
                        setUser(user);
                    }
                }

                else {
                    setUser(null);
                }
            })
        }, [])
        return userAdmin;
    }

    const userAdmin = GetCurrentUser();
   

    /*Atributos do login e do cadastro */
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false); 

    /*Funções para abrir e fechar o Modal de Login */
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

     /* Funções para abrir e fechar o modal de esqueci minha senha*/
     const [showEsq, setShowEsq] = useState(false);
     const handleCloseEsq = () => setShowEsq(false);

    /* Funções para abrir e fechar o modal de cadastro, login e esqueci a senha e sair*/
    const [showCad, setShowCad] = useState(false);
    const handleCloseCad = () => setShowCad(false);
    const handleCloseLogin = () => {
        setShowCad(false);
        setShow(true);
        setShowEsq(false);
    }
    const handleShowCad = () => {
        setShowCad(true);
        setShow(false);
        setShowEsq(false);
    }
    const handleShowEsq = () => {
        setShowCad(false);
        setShowEsq(true);
        setShow(false);
    }
    const handleLogout = () => { 
        auth.signOut();
    }

    return (
        <header className="menu">
            <nav className="container d-flex justify-content-between align-items-center navbar-collapse offcanvas-collapse">
                <div className='menu-icon' onClick={handleClick}>
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                </div>
                <a href="/"><Logo className="logo col-2" /></a>
                <ul className={click ? 'nav  active justify-content-center col-8' : 'nav justify-content-center col-8'}>
                    <li className="nav-item">
                        <Link to="/" onClick={closeMobileMenu} className="nav-link" id="home">HOME</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/encomendas" onClick={closeMobileMenu} className="nav-link" >ENCOMENDAS</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/prateleira" onClick={closeMobileMenu} className="nav-link">PRATELEIRA</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/portifolio" onClick={closeMobileMenu} className="nav-link" >PORTIFÓLIO</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/sobre-mim" className="nav-link" onClick={closeMobileMenu} id="sobre-mim">SOBRE MIM</Link>
                    </li>
                    <a href="#" onClick={handleShow} className="button-link"><ButtonMobile id="button-mobile" /></a>
                </ul>
                <div className="icons col-2">
                    <a href="#"><ShareIcon className="menu-icons" style={{ fontSize: 25 }} /></a>
                    {!userAdmin && <>
                        <a href="#"><PersonIcon onClick={handleShow} className="menu-icons" style={{ fontSize: 28 }} /></a>
                    </>}
                    {userAdmin && <>
                        <Dropdown id="dropdown">
                            <Dropdown.Toggle variant="success" id="dropdown-basic"/>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/perfil">Perfil</Dropdown.Item>
                                <Dropdown.Item href="/adiciona-portifolio">Adicionar item portifólio</Dropdown.Item>
                                <Dropdown.Item href="/adiciona-prateleira">Adicionar item prateleira</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout}>Sair</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </>}
                    <a href="#"><ShoppingCartOutlinedIcon className="menu-icons" style={{ fontSize: 25 }} /></a>

                    {/*Modal de Cadastro */}
                    <ModalCadastro
                        show={showCad}
                        onHide={handleClose}
                        voltaLogin={handleCloseLogin}
                        toggle={handleCloseCad}
                    >
                    </ModalCadastro>

                    {/*Modal  de Cadastro */}

                    {/*Modal  de Login */}
                    <ModalLogin
                        show={show}
                        onHide={handleClose}
                        onClick={handleShowCad}
                        showEsq={handleShowEsq}
                    >
                    </ModalLogin>
                    {/*Modal  de Login */}

                    {/*Modal  de Esqueci Minha Senha */}
                    <ModalEsqueciSenha
                        showEsq={showEsq}
                        handleCloseLogin={handleCloseLogin}
                        handleCloseEsq={handleCloseEsq}
                    >
                    </ModalEsqueciSenha>

                    {/*Modal  de Esqueci Minha Senha */}

                </div>
            </nav>
        </header>
    )
}
export default MenuSuperior;