import express from "express";
const router = express.Router();
import { catchErrors } from '../handlers/errorHandler'
import Gumtree from '../controller/gumtree';
import ScrapeZoopla from "../controller/zoopla";

// Endpoint to get the scraped result
router.get('/gumtree/:postalCode', catchErrors(Gumtree.getSearchedLocationBasedOnPostalCode))
router.get('/zoopla/:postalCode', catchErrors(ScrapeZoopla.getSearchedZooplaHouses));
router.get('/zooplaAlt/:postalCode/:minPrice/:maxPrice/:minBedroom/:maxBedroom', catchErrors(ScrapeZoopla.getAltSearchedZooplaHouses));

export default router;