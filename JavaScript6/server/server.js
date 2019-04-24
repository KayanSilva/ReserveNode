import { createServer } from 'http';
import app from './config/express';

createServer(app).listen(3000, function() {
    console.log('Servidor estutando na porta: ' + this.address().port);
});

