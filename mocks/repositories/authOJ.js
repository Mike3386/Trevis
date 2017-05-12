'use strict';
const domainModel = require('./domainModel');
const jest = require('jest');
modules.exports = () => {


    class Mock{
        constructor(){
            this.objects = [];
            this.findOne = async(id) => {
            return objects[id];
            };
            create: async(data) => {
                objects.push(data);
            },
            find: async(options) =>{
                objects.find((elem) => elem.name = options.where.name);
            },
            findAndCountAll: async(options) => {
                var arr = objects.splice(options.offset,options.limit);
                
                return {
                'rows': arr,
                'count': objects.count,
            }
        }
        }
    }

    return {Reposetory:Mock};
}