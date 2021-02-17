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
            return res.status(500).json({ 'error': 'unable to get level' });
        });

    },

    getAllLevels : function (req, res) {

        models.Level.findAll()
        .then(levelsFound => res.status(200).json(levelsFound))
        .catch(function(err) {
            return res.status(500).json({ 'error': 'unable to get level\'s list' });
        });
    },

    createLevel : function (req, res) {
        //params
        let level = req.body.level?req.body.level.trim():req.body.level;
        let description = req.body.description;

        if(level == null || level.length == 0){
            return res.status(400).json({'error':'Level\'s name is require'});
        }
        asyncLib.waterfall([
            function(done) {
                models.Level.findOne({
                    attributes: ['level'],
                    where: { level : level }
                })
                    .then(function(levelFound) {
                        done(null, levelFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error': err.message });
                    });
            },
            function(levelFound, done) {
                if (!levelFound) {
                    let newLevel = models.Level.create({
                        level : level,
                        description : description
                    })
                        .then(function(newLevel) {
                            done(newLevel);
                        })
                        .catch(function(err) {
                            return res.status(500).json({ 'error': 'cannot add level' });
                        });
                }
                else {
                    return res.status(409).json({ 'error': "A level with the nane '" +level+"' already exist"});
                }
            }
            ],
            function(newLevel) {
                if (newLevel) {
                    return res.status(201).json(newLevel);
                } else {
                    return res.status(500).json({ 'error': 'cannot add level' });
                }
            }
        );
    },

    updateLevel : function (req, res) {
        //params
        let idLevel = req.params.id;
        let level = req.body.level?req.body.level.trim():req.body.level;
        let description = req.body.description;

        if(level == null || level.trim().length == 0){
            return res.status(400).json({'error':'Level\'s name is require'});
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
                            level : level,
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
                        return res.status(409).json({ 'error': "A level with the nane '" +level+"' don't exist"});
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
                res.sendStatus(200);
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'unable to delete level' });
            });

    }

};


