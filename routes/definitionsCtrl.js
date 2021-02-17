let models = require('../models');
let asyncLib = require('async');

//Routes
module.exports ={

    getDefinition : function (req, res) {
        //params
        let idDefinition = req.params.id;

        if(idDefinition == null){
            return res.status(400).json({'error':'Missing parameter'});
        }

        models.Definition.findOne({
            where: { id: idDefinition }
        })
            .then(definitionFound => res.status(200).json(definitionFound))
            .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to get definition' });
            });

    },

    getAllDefinitions : function (req, res) {

        models.Definition.findAll()
            .then(definitionsFound => res.status(200).json(definitionsFound))
            .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to get definition\'s list' });
            });
    },

    createDefinition : function (req, res) {
        //params
        let nature = req.body.nature?req.body.nature.trim():req.body.nature;
        let description = req.body.description?req.body.description.trim():req.body.description;
        let idWord = req.body.idWord;

        if(nature == null || description == null || idWord == null || nature.length == 0 || description.length == 0){
            return res.status(400).json({'error':'Missing parameters'});
        }
        asyncLib.waterfall([
                function(done) {
                    models.Definition.findOne({
                        where: {
                            nature : nature,
                            description : description,
                            idWord : idWord,
                        }
                    })
                        .then(function(definitionFound) {
                            done(null, definitionFound);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': err.message });
                        });
                },
                function(definitionFound, done) {
                    if (!definitionFound) {
                        models.Definition.create({
                            nature : nature,
                            description : description,
                            idWord : idWord,
                        })
                            .then(function(newDefinition) {
                                done(newDefinition);
                            })
                            .catch(function(err) {
                                return res.status(500).json({ 'error': 'can\'t add definition' });
                            });
                    }
                    else {
                        return res.status(409).json({ 'error': "This definition already exist"});
                    }
                }
            ],
            function(newDefinition) {
                if (newDefinition) {
                    return res.status(201).json(newDefinition);
                } else {
                    return res.status(500).json({ 'error': 'can\'t add definition' });
                }
            }
        );
    },

    updateDefinition : function (req, res) {
        //params
        let idDefinition = req.params.id;
        let nature = req.body.nature?req.body.nature.trim():req.body.nature;
        let description = req.body.description?req.body.description.trim():req.body.description;
        let idWord = req.body.idWord;

        if(idDefinition == null || nature == null || description == null || idWord == null || nature.length == 0 || description.length == 0){
            return res.status(400).json({'error':'Missing parameters'});
        }

        asyncLib.waterfall([
                function(done) {
                    models.Definition.findByPk(idDefinition)
                        .then(function(definitionFound) {
                            done(null, definitionFound);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': err.message });
                        });
                },
                function(definitionFound, done) {
                    if (definitionFound) {
                        definitionFound.update({
                            nature : nature,
                            description : description,
                            idWord : idWord,
                        })
                            .then(function(newDefinition) {
                                done(newDefinition);
                            })
                            .catch(function(err) {
                                return res.status(500).json({ 'error': 'can\'t Update definition' });
                            });
                    }
                    else {
                        return res.status(409).json({ 'error': "This definition don't exist"});
                    }
                }
            ],
            function(newDefinition) {
                if (newDefinition) {
                    return res.status(201).json(newDefinition);
                } else {
                    return res.status(500).json({ 'error': 'can\'t add definition' });
                }
            }
        );
    },

    deleteDefinition : function (req, res) {
        //params
        let idDefinition = req.params.id;

        if(idDefinition == null){
            return res.status(400).json({'error':'Missing parameter'});
        }

        models.Definition.findByPk(idDefinition).then(function(definitionFound) {
            if (definitionFound) {
                definitionFound.destroy();
            }
            else{
                return res.status(404).json({ 'error': 'Definition don\'t exist' });
            }
        })
            .then(function() {
                res.sendStatus(200);
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to delete definition' });
            });
    }

};


