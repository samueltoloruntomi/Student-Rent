import express from "express";
const router = express.Router();
import { catchErrors } from '../handlers/errorHandler'
import Gumtree from '../controller/gumtree';


// Endpoint to get the scraped result
router.get('/gumtree/:postalCode', catchErrors(Gumtree.getSearchedLocationBasedOnPostalCode))

export default router;
