'use strict';
const Errors = require('../../utils/errors.js');

module.exports = 
class Mock{
        objects;
        
        constructor(){
            this.objects = [];
        
        }
        async findOne(id) {
            return objects[id];
        };

        async create(data) {
            if (this.find(data) == null) objects.push(data);
            else throw Errors.notFound;
        };

        /*find = async(options) =>{
            return objects.find((elem) => elem.name = options.where.name);
        };

        findAndCountAll = async(options) => {
            var arr = objects.splice(options.offset,options.limit);
            
            return {
                'rows': arr,
                'count': objects.count
            }
        };*/

        async findById(id) {
            let elem = objects[id];
            if (elem == null) Errors.notFound;
            else return elem;
        }

        /*destroy = async (opt) => {
            objects.delete(opt.where.id);
            return;
        }

        update = async (data, opt) => {
            objects[opt.where.id] = data;
        }*/
}