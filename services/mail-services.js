const mailer = require("nodemailer");

module.exports = (email, nome, contato, tipo, desc, adicao_personagem, fundo) => {
    const smtpTransport = mailer.createTransport({
        service: "gmail",
        auth: {
            user: "skylst.suporte@gmail.com",
            pass: "@SKYSTORE",
        },
    })

    const mail = {
        from: "Sky <skylst.suporte@gmail.com>",
        to: "skylst.suporte@gmail.com",
        subject: `${nome} solicitou uma encomenda!`,
        html: `<p>Nome completo: ${nome}<br/>
        E-mail do cliente: ${email}<br/>
        Contato (whatsapp): ${contato}<br/>
        Tipo: ${tipo}<br/>
        Descrição do pedido: ${desc}<br/>
        </>`
    };
    
   

    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mail)
            .then(response => {
                smtpTransport.close();
                return resolve(response);
            })
            .catch(error => {
                smtpTransport.close();
                return reject(error);
            });
    })
}