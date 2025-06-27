function validateProduct(req, res, next) {
    const { nome, descricao, preco } = req.body;
    const errors = [];
  
    if (!nome || nome.trim() === '') {
        errors.push({ field: 'nome', message: 'Nome é obrigatório' });
    }

    if (!descricao || descricao.trim() === '') {
        errors.push({ field: 'descricao', message: 'Descrição é obrigatório' });
    }
  
    if (!preco || String(preco).trim() === '' || isNaN(preco) || parseFloat(preco) <= 0) {
        errors.push({ field: 'preco', message: 'Preço inválido' });
    } 
  
    if (errors.length > 0) {
        return res.status(403).json({ erro: errors[0].message});
    }
  
    next(); 
}

module.exports = validateProduct;