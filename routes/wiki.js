const express = require('express');
const router = express.Router();
const { addPage, wikiPage, main } = require('../views');
const { Page } = require('../models');

//get /wiki
router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (error) {
    next(error);
  }
});

//post /wiki
router.post('/', async (req, res, next) => {
  try {
    const page = await Page.create(req.body);
    res.redirect('/wiki/' + page.slug);
  } catch (error) {
    next(error);
  }
});

//get /wiki/add
router.get('/add', (req, res, next) => {
  res.send(addPage());
});

//get /wiki/:slug
router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    console.log(page.__proto__);
    const author = await page.getAuthor();
    res.send(wikiPage(page, author));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
