export function validateClient(req, res, next) {
    const { nome, sobrenome,email, idade } = req.body;
    const errors = [];
    const idadeInt = parseInt(idade);

    if (!nome || nome.trim() === '') {
      errors.push({ field: 'nome', message: 'Nome é obrigatório' });
    }

    if(!sobrenome || sobrenome.trim() === '') {
        errors.push({ field: 'sobrenome', message: 'Sobrenome é obrigatório' });
      }
  
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push({ field: 'email', message: 'Email inválido' });
    }
  
    if (!idadeInt || idadeInt < 0 || idadeInt > 120) {
      errors.push({ field: 'idade', message: 'Idade inválida' });
    }
  
    if (errors.length > 0) {
        return res.render('clientForm', {
          errors: errors,
          client: req.body 
        });
      }
  
    next(); 
  }