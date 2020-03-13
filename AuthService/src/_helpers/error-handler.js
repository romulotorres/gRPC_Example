function errorHandler(err, req, res, next) {
  if (typeof err === "string") {
    // Erros Gerais da app
    return res.status(400).json({ errors: [err] });
  }

  if (err.name === "UnauthorizedError") {
    // Erros da autenticação jwt
    return res.status(401).json({
      errors: [err.message]
    });
  }

  if (err.name === "ValidationError") {
    // Erros da Validações
    const errors = Object.keys(err.errors).map(e => err.errors[e].message);
    return res.status(401).json({
      errors
    });
  }

  // Erro 500 padrão
  return res.status(500).json({ errors: [err.message] });
}

module.exports = errorHandler;
