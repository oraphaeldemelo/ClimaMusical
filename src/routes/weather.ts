import express from 'express';
import controller from '../controllers/weather';

const router = express.Router();

router.get('/weather/:city', controller.getPlaylistByCity);

router.post('/weather', controller.getPlaylistByCoordinates);

router.get('/', (req, res, next) => res.send("Ola mundo"));

export = router;