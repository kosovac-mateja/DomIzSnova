import exress from 'express';
import { OtkazivanjePoslaController } from '../controllers/otkazivanje.controller';

const otkazivanjeRuter = exress.Router();

otkazivanjeRuter
    .route('/ubaci')
    .post((req, res) => new OtkazivanjePoslaController().ubaci(req, res));

otkazivanjeRuter
    .route('/dohvatiOtkazivanja')
    .get((req, res) =>
        new OtkazivanjePoslaController().dohvatiOtkazivanja(req, res)
    );

otkazivanjeRuter
    .route('/promeniStatus')
    .post((req, res) =>
        new OtkazivanjePoslaController().promeniStatus(req, res)
    );

otkazivanjeRuter
    .route('/zahtevPostoji')
    .post((req, res) =>
        new OtkazivanjePoslaController().zahtevPostoji(req, res)
    );

export default otkazivanjeRuter;
