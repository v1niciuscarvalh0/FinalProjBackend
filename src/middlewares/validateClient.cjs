function validateClient(req, res, next) {
    const { nome, sobrenome, email, idade } = req.body;
    const errors = [];
    const idadeInt = parseInt(idade);

    if (!nome || nome.trim() === '') {
        errors.push({ field: 'nome', message: 'Nome é obrigatório' });
    }

    if (nome && (nome.trim().length < 3 || nome.trim().length > 255)) {
        errors.push({ field: 'nome', message: 'Nome deve conter entre 3 e 255 caracteres' });
    }

    if (!sobrenome || sobrenome.trim() === '') {
        errors.push({ field: 'sobrenome', message: 'Sobrenome é obrigatório' });
    }
  
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push({ field: 'email', message: 'Email inválido' });
    }
  
    if (isNaN(idadeInt) || idadeInt < 0 || idadeInt > 120) {
        errors.push({ field: 'idade', message: 'Idade inválida' });
    }
  
    if (errors.length > 0) {
        return res.status(400).json({ erro: errors[0].message });
    }
  
    next(); 
}

module.exports = validateClient;