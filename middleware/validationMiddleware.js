exports.validate = (schema) => (req, res, next) => {
    const {
      error
    } = schema.validate({...req.body,...req.query});
    if (error) {
      res.status(422).send(error.details[0].message);
    } else {
      next();
    }
  };