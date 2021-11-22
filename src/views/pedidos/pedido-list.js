import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { fs, auth } from '../../config/firebase.js'
import { PedidoItem } from './pedido-list/individual-item/pedido-item.js';


const PedidosList = () => {
    const [items, setItems] = useState([]);

    /*useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection('Pedidos-list').onSnapshot(snapshot => {
                    const newItem = // Variável com vetor de itens do map seguinte:
                        snapshot.docs.map((doc) => ({  //Faz um map na lista de documentos da seleção
                            ID: doc.id,
                            ...doc.data(),
                        }));
                        setItems(newItem)
                })
            }
        })
    }, [])*/

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                fs.collection("Pedidos-list").where("uid", "==", user.uid.toString())
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            // doc.data() is never undefined for query doc snapshots
                            console.log(doc.id, " => ", doc.data());
                            setItems((prevState) => [...prevState, doc.data()]);
                        });
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
            }
        })
    },[])

    //Renderizar tabela database 
    return (
        <Container>
            <Row id="table-body" className="items-body-pedido">
            <h1 id="minhas-compras-title">Minhas compras</h1>
                {items.length > 0 && (<>
                    <PedidoItem items={items} />

                </>)}
                {items.length <= 0 && (
                    <div className='container-fluid'>Por favor, espere....</div>
                )}
            </Row>
        </Container>
    )
};

export default PedidosList;