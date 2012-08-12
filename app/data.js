(function(){
    var config = require('./config');
    var mongodb = require('mongojs');
    var async = require('async');
    var dbURL = config.mongoHost + ":" + config.mongoPort + "/" + config.mongoDBName;
    console.log(dbURL);
    var db = mongodb.connect(dbURL);

    Data = {};

    var find = function(collection, filter, callback){
        db.collection(collection).find(filter, callback);
    };
    var all = function(collection, callback){
        find(collection, {}, callback);
    }

    var deleteItem = function(collection, filter, callback){
        db.collection(collection).remove(filter, callback);
    };

    Data.deleteJunction = function(filter, callback){
        deleteItem('junctions', filter, callback);
    };
    Data.deleteEndpoint = function(filter, callback){
        deleteItem('endpoints', filter, callback);
    }

    Data.getEndpoints = function(filter, callback){
        console.log('getting endpoints');
        find('endpoints', filter, callback)
    }

    Data.getFloors = function(filter, callback){
        console.log('getting all floors');
        find('floors', filter, callback);
    }

    Data.getElevators = function(filter, callback){
        console.log('getting all elevators');
        find('elevators', filter, callback);
    }

    Data.getJunctions = function(filter, callback){
        console.log('getting all junctions');
        find('junctions', filter, callback);
    }

    var applyFilter = function(f, filter){
            return function(callback){
                return f(filter, callback);
            }
    }

    Data.getAll = function(callback){

        async.parallel({
            'endpoints' : applyFilter(Data.getEndpoints, {}),
            'floors' : applyFilter(Data.getFloors, {}),
            'junctions' : applyFilter(Data.getJunctions, {}),
            'elevators' : applyFilter(Data.getElevators, {})

        }, function(err, results){
            if(!err){
                callback(results);
            }
            if(err)
                callback(err);
        })
    }
    Data.deleteNode = function(filter, callback){
        async.parallel({
            'endpoints' : applyFilter(Data.deleteEndpoint, filter),
            'junctions' : applyFilter(Data.deleteJunction, filter)
        }, function(err, results){
            callback(err);
        })
    };

    Data.addNode = function(type, id, name, pos, locationType, callback) {
        if (type === 'endpoint' || type === 'junction') {
            var doc =  {
                'id': id,
                'name': name,
                'pos': pos,
                'type': type,
                'locationType': locationType,
                'connections': {}
            }
            db.collection(type + 's').insert(doc, {}, function(error){
                callback(error);
            })
        } else {
            callback("Unrecognized node type");
        }
    }


})()
