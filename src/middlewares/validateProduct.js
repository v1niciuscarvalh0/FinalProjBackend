export function validateProduct(req, res, next) {
    const { nome, descricao, preco } = req.body;
    const errors = [];
  
    if (!nome || nome.trim() === '') {
      errors.push({ field: 'nome', message: 'Nome é obrigatório' });
    }

    if (!descricao || descricao.trim() === '') {
        errors.push({ field: 'descricao', message: 'Descrição é obrigatório' });
      }
  
  
    if (!preco || preco.trim() === '' || isNaN(preco) || preco <= 0) {
      errors.push({ field: 'preco', message: 'Preço inválido' });
    } 
  
    console.log(req.body);
    
    if (errors.length > 0) {
      return res.render('productForm', {
        errors: errors,
        product: req.body 
      });
    }
  
    next(); 
  }