const { Router } = require('express');
const diet = require('./Diet.js');
const recipe = require('./Recipe.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', recipe);
router.use('/', diet);


module.exports = router;
