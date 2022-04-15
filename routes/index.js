const express = require('express');
const router = express.Router();
const soapController = require('../controllers/soapController');
const baseController = require('../controllers/baseController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', baseController.homePage);

router.get('/signup', baseController.signup);
router.post('/signup', soapController.triggerEmail, soapController.createProfile); 

router.get('/thankyou', baseController.thankyou)

router.get('/survey', baseController.survey)
router.post('/survey', soapController.surveyEvent)

/*
router.get('/getoffer', (req, res) => {
  res.render('getOffer')
}
)*/
//router.post('/getofferrequest', soapController.runSoapRequest);

/*
router.get('/survey', (req, res) => {
  res.render('survey')
})
*/
module.exports = router;
