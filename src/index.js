const Joi = require('joi');

const funcionarioSchema = Joi.object({
  nome: Joi.string().required(),
  funcao: Joi.string().required(),
  telefone: Joi.string().pattern(/^[0-9]{10,11}$/).required(),
  cpf: Joi.string().pattern(/^\d{11}$/).required(), 
});

app.post('/ficha', async (req, res) => {
  try {
    const { error } = funcionarioSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ erro: error.details[0].message });
    }

    const dados = await funcionario.create(req.body);

    // Geração do PDF
    const doc = new PDFDocument();
    let buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment;filename=ficha.pdf',
        'Content-Length': pdfData.length,
      }).end(pdfData);
    });

    doc.fontSize(20).text('Ficha do Funcionário', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Nome: ${dados.nome}`);
    doc.text(`Função: ${dados.funcao}`);
    doc.text(`Telefone: ${dados.telefone}`);
    doc.text(`Email: ${dados.email}`);
    doc.text(`CPF: ${dados.cpf}`);
    doc.text(`Data de Entrada: ${dados.dataEntrada}`);
    doc.end();
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao criar ficha', detalhes: erro.message });
  }
});
