//imports
var express = require('express');
var levelsCtrl = require('./routes/levelsCtrl');
var wordsCtrl = require('./routes/wordsCtrl');
var definitionsCtrl = require('./routes/definitionsCtrl');
var examplesCtrl = require('./routes/examplesCtrl');

//router
exports.router = (function(){
    var apiRouter = express.Router();

    //Levels routes
    apiRouter.route('/levels/:id').get(levelsCtrl.getLevel);
    apiRouter.route('/levels/').get(levelsCtrl.getAllLevels);
    apiRouter.route('/levels/').post(levelsCtrl.createLevel);
    apiRouter.route('/levels/:id').put(levelsCtrl.updateLevel);
    apiRouter.route('/levels/:id').delete(levelsCtrl.deleteLevel);

    //Words routes
    apiRouter.route('/word/:id').get(wordsCtrl.getWord);
    apiRouter.route('/words/:idLevel').get(wordsCtrl.getListWordByLevel);
    apiRouter.route('/words/').get(wordsCtrl.getAllWords);
    apiRouter.route('/word/').post(wordsCtrl.createWord);
    apiRouter.route('/word/:id').put(wordsCtrl.updateWord);
    apiRouter.route('/word/:id').delete(wordsCtrl.deleteWord);

    //Definitions routes
    apiRouter.route('/definitions/:id').get(definitionsCtrl.getDefinition);
    apiRouter.route('/definitions/').get(definitionsCtrl.getAllDefinitions);
    apiRouter.route('/definitions/').post(definitionsCtrl.createDefinition);
    apiRouter.route('/definitions/:id').put(definitionsCtrl.updateDefinition);
    apiRouter.route('/definitions/:id').delete(definitionsCtrl.deleteDefinition);

    //Examples routes
    apiRouter.route('/examples/:id').get(examplesCtrl.getExample);
    apiRouter.route('/examples/').get(examplesCtrl.getAllExamples);
    apiRouter.route('/examples/').post(examplesCtrl.createExample);
    apiRouter.route('/examples/:id').put(examplesCtrl.updateExample);
    apiRouter.route('/examples/:id').delete(examplesCtrl.deleteExample);

    return apiRouter;

})();
