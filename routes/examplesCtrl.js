let models = require('../models');
let asyncLib = require('async');

//Routes
module.exports ={

    getExample : function (req, res) {
        //params
        let idExample = req.params.id;

        if(idExample == null){
            return res.status(400).json({'error':'Missing parameter'});
        }

        models.Example.findOne({
            where: { id: idExample }
        })
            .then(exampleFound => res.status(200).json(exampleFound))
            .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to get example' });
            });

    },

    getAllExamples : function (req, res) {

        models.Example.findAll()
            .then(examplesFound => res.status(200).json(examplesFound))
            .catch(function(err) {
                return res.status(500).json({ 'error': err });
            });
    },

    createExample : function (req, res) {
        //params
        let statement = req.body.statement?req.body.statement.trim():req.body.statement;
        let idDefinition = req.body.idDefinition;

        if(statement == null || idDefinition == null || statement.length == 0 ){
            return res.status(400).json({'error':'Missing parameters'});
        }
        asyncLib.waterfall([
                function(done) {
                    models.Example.findOne({
                        where: {
                            statement : statement,
                            idDefinition : idDefinition,
                        }
                    })
                        .then(function(exampleFound) {
                            done(null, exampleFound);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': err.message });
                        });
                },
                function(exampleFound, done) {
                    if (!exampleFound) {
                        models.Example.create({
                            statement : statement,
                            idDefinition : idDefinition,
                        })
                            .then(function(newExample) {
                                done(newExample);
                            })
                            .catch(function(err) {
                                return res.status(500).json({ 'error': 'can\'t add example' });
                            });
                    }
                    else {
                        return res.status(409).json({ 'error': "This example already exist"});
                    }
                }
            ],
            function(newExample) {
                if (newExample) {
                    return res.status(201).json(newExample);
                } else {
                    return res.status(500).json({ 'error': 'can\'t add example' });
                }
            }
        );
    },

    updateExample : function (req, res) {
        //params
        let idExample = req.params.id;
        let statement = req.body.statement?req.body.statement.trim():req.body.statement;
        //let idDefinition = req.body.idDefinition;

        if(idExample == null || statement == null|| statement.length == 0){
            return res.status(400).json({'error':'Missing parameters'});
        }

        asyncLib.waterfall([
                function(done) {
                    models.Example.findByPk(idExample)
                        .then(function(exampleFound) {
                            done(null, exampleFound);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': err.message });
                        });
                },
                function(exampleFound, done) {
                    if (exampleFound) {
                        exampleFound.update({
                            statement : statement,
                            //idDefinition : idDefinition,
                        })
                            .then(function(newExample) {
                                done(newExample);
                            })
                            .catch(function(err) {
                                return res.status(500).json({ 'error': err });
                            });
                    }
                    else {
                        return res.status(409).json({ 'error': "This example don't exist"});
                    }
                }
            ],
            function(newExample) {
                if (newExample) {
                    return res.status(201).json(newExample);
                } else {
                    return res.status(500).json({ 'error': 'can\'t add example' });
                }
            }
        );
    },

    deleteExample : function (req, res) {
        //params
        let idExample = req.params.id;

        if(idExample == null){
            return res.status(400).json({'error':'Missing parameter'});
        }

        models.Example.findByPk(idExample).then(function(exampleFound) {
            if (exampleFound) {
                exampleFound.destroy();
            }
            else{
                return res.status(404).json({ 'error': 'Example don\'t exist' });
            }
        })
            .then(function() {
                res.status(200).json({'statut':'ok'});
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to delete example' });
            });
    }

};


