let models = require('../models');
let asyncLib = require('async');

//Routes
module.exports ={

    getLevel : function (req, res) {
        //params
        let idLevel = req.params.id;

        if(idLevel == null){
            return res.status(400).json({'error':'Missing parameter'});
        }

        models.Level.findOne({
            where: { id: idLevel }
        })
        .then(levelFound => res.status(200).json(levelFound))
        .catch(function(err) {
            return res.status(500).json({ 'error': err });
        });

    },

    getAllLevels : function (req, res) {

        models.Level.findAll()
        .then(levelsFound => res.status(200).json(levelsFound))
        .catch(function(err) {
            return res.status(500).json({ 'error': err });
        });
    },

    createLevel : function (req, res) {
        //params
        let order = req.body.order;
        let name = req.body.name?req.body.name.trim():req.body.name;
        let description = req.body.description;

        if(name == null || name.length == 0 || order == null){
            return res.status(400).json({'error':'name and order are require'});
        }
        asyncLib.waterfall([
            function(done) {
                models.Level.findOne({
                    attributes: ['name'],
                    where: { name : name }
                })
                    .then(function(levelFound) {
                        done(null, levelFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': err });
                    });
            },
            function(levelFound, done) {
                if (!levelFound) {

                    /* models.Level.findOne({
                        attributes: ['order'],
                        where: { order : order }
                    }).then(function(levelOrder) {
                            done(null, levelFound);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': err });
                        }); */


                    let newLevel = models.Level.create({
                        order : order,
                        name : name,
                        description : description
                    })
                        .then(function(newLevel) {
                            done(newLevel);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': err });
                        });
                }
                else {
                    return res.status(409).json({ 'error': "A level with the nane '" +name+"' already exist"});
                }
            }
            ],
            function(newLevel) {
                if (newLevel) {
                    return res.status(201).json(newLevel);
                } else {
                    return res.status(500).json({ 'error': err });
                }
            }
        );
    },

    updateLevel : function (req, res) {
        //params
        let idLevel = req.params.id;
        let order = req.body.order;
        let name = req.body.name?req.body.name.trim():req.body.name;
        let description = req.body.description;

        if(name == null || name.length == 0 || order == null){
            return res.status(400).json({'error':'name and order are require'});
        }
        asyncLib.waterfall([
                function(done) {
                    models.Level.findByPk(idLevel)
                        .then(function(levelFound) {
                            done(null, levelFound);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': err.message });
                        });
                },
                function(levelFound, done) {
                    if (levelFound) {
                        levelFound.update({
                            order : order,
                            name : name,
                            description : description
                        })
                            .then(function(newLevel) {
                                done(newLevel);
                            })
                            .catch(function(err) {
                                return res.status(500).json({ 'error': 'can\'t Update level' });
                            });
                    }
                    else {
                        return res.status(409).json({ 'error': "A level with this key don't exist"});
                    }
                }
            ],
            function(newLevel) {
                if (newLevel) {
                    return res.status(201).json(newLevel);
                } else {
                    return res.status(500).json({ 'error': 'can\'t Update level' });
                }
            }
        );
    },

    deleteLevel : function (req, res) {
        //params
        let idLevel = req.params.id;

        if(idLevel == null){
            return res.status(400).json({'error':'Missing parameter'});
        }

        models.Level.findByPk(idLevel).then(function(levelFound) {
            if (levelFound) {
                levelFound.destroy();
            }
            else{
                return res.status(404).json({ 'error': 'Level don\'t exist' });
            }
        })
            .then(function() {
                res.status(200).json({'statut':'ok'});
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to delete level' });
            });

    }

};


