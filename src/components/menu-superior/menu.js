import './menu.css';
import './modal-login/modal-login.css';
import React, { useState, useEffect } from 'react';
import { ReactComponent as Logo } from '../../images/logo.svg';
import PersonIcon from '@material-ui/icons/Person';
import ShareIcon from '@material-ui/icons/ShareOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import { Link } from "react-router-dom";
import { ButtonMobile } from './button-login/button.js';
import ModalCadastro from '../modal-cadastro/modal-cadastro';
import ModalCompartilha from '../modal-compartilhar/modal-compartilhar.js';
import ModalLogin from './modal-login/modal-login';
import { Dropdown } from 'react-bootstrap';
import ModalEsqueciSenha from './modal-login/modal-esquecisenha/modal-esquecisenha';
import { auth, fs } from '../../config/firebase.js';
import CarrinhoDeCompras from '../carrinho/carrinho';


function MenuSuperior() {

    /*Atributos do usuário atual */
    const [userCommun, setUser] = useState(null);
    const [userAdmin, setUserAdmin] = useState(false);


    function GetCurrentUser() {
        useEffect(() => {
            auth.onAuthStateChanged(user => {
                if (user) {
                    if (user.uid.toString() == "UGr7iwkw4ONmIlS16rJzROSTQ6A3") {
                        setUser(user);
                        setUserAdmin(true);
                    } else {
                        setUserAdmin(false);
                        setUser(user);
                    }
                }

                else {
                    setUser(null);
                }
            })
        }, [])
        return userCommun;
    }


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

    /*Funções para abrir e fechar o Modal de compartilhamento */
    const [showcomp, setShowComp] = useState(false);
    const handleCloseComp = () => setShowComp(false);
    const handleShowComp = () => setShowComp(true);

    /* Funções para abrir e fechar o modal de cadastro, login e esqueci a senha e sair*/
    const [showCad, setShowCad] = useState(false);
    const handleCloseCad = () => setShowCad(false);
    const handleCloseLogin = () => {
        setShowCad(false);
        setShow(true);
        setShowEsq(false);
    }
    const handleCloseEsqueci = () => {
        setShowEsq(false);
        setShow(true);
        setShowCad(false);
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
        window.location.reload();
    }

    const [open, setOpen] = useState(false);

    const handleCart = () => {
        setOpen(!open);
    };

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

                    <a href="#"><ShareIcon className="menu-icons" onClick={handleShowComp} style={{ fontSize: 25 }} /></a>
                    <ModalCompartilha
                        show={showcomp}
                        onHide={handleCloseComp}
                    />
                    {!GetCurrentUser() && <>
                        <a href="#" onClick={handleShow} id="login-button"><i class="fas fa-sign-in-alt" /></a>
                    </>}
                    {GetCurrentUser() && <>
                        {!userAdmin && <>
                            {/*<a id="text-user"> Olá, estranho</a>*/}
                            <Dropdown >
                                <Dropdown.Toggle variant="success" id="dropdown-logged">

                                    <a href="#"><PersonIcon className="menu-icons" style={{ fontSize: 28 }} /></a>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="/perfil">Perfil</Dropdown.Item>
                                    <Dropdown.Item onClick={handleLogout}>Sair</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>

                        </>
                        }
                        {userAdmin && <>
                            <Dropdown id="dropdown">
                                <Dropdown.Toggle variant="success" id="dropdown-basic" />
                                <Dropdown.Menu>
                                    <Dropdown.Item href="/perfil">Perfil</Dropdown.Item>
                                    <Dropdown.Item><Link to="/portifolio-list" className="link-dropdown">Adicionar item portifólio</Link></Dropdown.Item>
                                    <Dropdown.Item href="/prateleira-list">Adicionar item prateleira</Dropdown.Item>
                                    <Dropdown.Item onClick={handleLogout}>Sair</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                        }


                    </>}
                    <a href="#"><ShoppingCartOutlinedIcon onClick={handleCart} className="menu-icons" style={{ fontSize: 25 }} /></a>

                    {/*Sidemenu Carrinho */}

                    <CarrinhoDeCompras
                        open={open}
                        handleCart={handleCart}
                    >
                    </CarrinhoDeCompras>



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
                        voltaLogin={handleCloseEsqueci}
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