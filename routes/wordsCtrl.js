let models = require('../models');
let asyncLib = require('async');

//Routes
module.exports ={

    getWord : function (req, res) {
        //params
        let idWord = req.params.id;

        if(idWord == null){
            return res.status(400).json({'error':'Missing parameter'});
        }

        models.Word.findOne({
            where: { id: idWord }
        })
            .then(wordFound => res.status(200).json(wordFound))
            .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to get word' });
            });

    },

    getAllWords : function (req, res) {

        models.Word.findAll()
            .then(wordsFound => res.status(200).json(wordsFound))
            .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to get word\'s list' });
            });
    },

    createWord : function (req, res) {
        //params
        let name = req.body.name?req.body.name.trim():req.body.name;
        let plural = req.body.plural?req.body.plural.trim():req.body.plural;
        let idLevel = req.body.idLevel;

        if(name == null || plural == null || idLevel == null || name.length == 0 || plural.length == 0){
            return res.status(400).json({'error':'Missing parameters'});
        }
        asyncLib.waterfall([
                function(done) {
                    models.Word.findOne({
                        attributes: ['name'],
                        where: { name : name }
                    })
                        .then(function(wordFound) {
                            done(null, wordFound);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': err.message });
                        });
                },
                function(wordFound, done) {
                    if (!wordFound) {
                        models.Word.create({
                            name : name,
                            plural : plural,
                            idLevel : idLevel
                        })
                            .then(function(newWord) {
                                done(newWord);
                            })
                            .catch(function(err) {
                                return res.status(500).json({ 'error': 'can\'t add word' });
                            });
                    }
                    else {
                        return res.status(409).json({ 'error': "A word '" +name+"' already exist"});
                    }
                }
            ],
            function(newWord) {
                if (newWord) {
                    return res.status(201).json(newWord);
                } else {
                    return res.status(500).json({ 'error': 'can\'t add word' });
                }
            }
        );
    },

    updateWord : function (req, res) {
        //params
        let name = req.body.name?req.body.name.trim():req.body.name;
        let plural = req.body.plural?req.body.plural.trim():req.body.plural;
        let idLevel = req.body.idLevel;
        let idWord = req.params.id;

        if(idLevel == null || name == null || plural == null || idLevel == null || name.length == 0 || plural.length == 0){
            return res.status(400).json({'error':'Missing parameters'});
        }

        asyncLib.waterfall([
                function(done) {
                    models.Word.findByPk(idWord)
                        .then(function(wordFound) {
                            done(null, wordFound);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': err.message });
                        });
                },
                function(wordFound, done) {
                    if (wordFound) {
                        wordFound.update({
                            name : name,
                            plural : plural,
                            idLevel : idLevel
                        })
                            .then(function(newWord) {
                                done(newWord);
                            })
                            .catch(function(err) {
                                return res.status(500).json({ 'error': 'can\'t Update word' });
                            });
                    }
                    else {
                        return res.status(409).json({ 'error': "A word '" +name+"' don't exist"});
                    }
                }
            ],
            function(newWord) {
                if (newWord) {
                    return res.status(201).json(newWord);
                } else {
                    return res.status(500).json({ 'error': 'can\'t add word' });
                }
            }
        );
    },

    deleteWord : function (req, res) {
        //params
        let idWord = req.params.id;

        if(idWord == null){
            return res.status(400).json({'error':'Missing parameter'});
        }

        models.Word.findByPk(idWord).then(function(wordFound) {
            if (wordFound) {
                wordFound.destroy();
            }
            else{
                return res.status(404).json({ 'error': 'Word don\'t exist' });
            }
        })
            .then(function() {
                res.sendStatus(200);
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to delete word' });
            });



    }

};


