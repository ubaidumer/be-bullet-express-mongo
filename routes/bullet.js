var express = require('express');
const { Headline } = require('../models/headline');
const { Point } = require('../models/point');
var router = express.Router();
const { validate, Joi } = require('express-validation');


const pointValidation = {
  body: Joi.object({
    point: Joi.string()
      .required(),
  }),
};

const headlineValidation = {
  body: Joi.object({
    headline: Joi.string()
      .required(),
  }),
};

/*middleware. */
router.use(function (req, res, next) {
  console.log("router middleware called",Date.now());
  next()
});

/*point id middleware. */
router.use('/point/:id',async function (req, res, next) {
  const data = await Point.findOne({_id:req.params.id});
  if(!data){
    res.status(404).json({
      message: "point record not found",
    });
  }
  next()
});

/*headline id middleware. */
router.use('/headline/:id',async function (req, res, next) {
  const data = await Headline.findOne({_id:req.params.id});
  if(!data){
    res.status(404).json({
      message: "headline record not found",
    });
  }
  next()
});

/* GET Headline listing. */
router.get('/headline', async function(req, res, next) {
  try{
  const data = await Headline.find();
  if(data.length == 0){
    let headline = new Headline({headline:'new headline body'});
    await headline.save();
    res
    .status(200)
    .send(headline);
  }
  res
  .status(200)
  .send(data);
}catch(err){
 console.log(err);   
}
});

/* POST Headline insertion. */
router.post('/headline', async function(req, res, next) {
  try {

    let headline = new Headline(req.body);
    await headline.save();

    res
    .send(headline);

  } catch (err) {
    console.log("Error in creating headline", err);
  }
});

/* PUT headline insertion. */
router.put('/headline/:id',validate(headlineValidation, {}, {}), async function(req, res, next) {
  try {
   await Headline.findOneAndUpdate({_id:req.params.id},{
      $set:{
        headline:req.body.headline
        },
    },{new:true});

    res
    .status(200)
    .json({message:'successfully updated headline'});

  } catch (err) {
    console.log("Error in updating headline", err);
  }
});


/* GET Point listing. */
router.get('/point', async function(req, res, next) {
  const data = await Point.find();
  res
  .status(200)
  .send(data);
});

/* POST Point insertion. */
router.post('/point',validate(pointValidation, {}, {}), async function(req, res, next) {
  try {

    let point = new Point(req.body);
    await point.save();

    res
    .send(point);

  } catch (err) {
    console.log("Error in creating Point", err);
  }
});

/* PUT Point insertion. */
router.put('/point/:id',validate(pointValidation, {}, {}), async function(req, res, next) {
  try {
   await Point.findOneAndUpdate({_id:req.params.id},{
      $set:{
        point:req.body.point
        },
    },{new:true});

    res
    .status(200)
    .json({message:'successfully updated point'});

  } catch (err) {
    console.log("Error in updating Point", err);
  }
});

/* DELETE Point insertion. */
router.delete('/point/:id', async function(req, res, next) {
  try {

   await Point.deleteOne({_id:req.params.id});

    res
    .status(200)
    .json({message:'successfully deleted point'});

  } catch (err) {
    console.log("Error in deleting Point", err);
  }
});

module.exports = router;
