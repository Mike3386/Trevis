'use strict';
const Errors = require('../../utils/errors.js');

module.exports = 
class Mock{
        constructor() {
            this.objects = [];
            this.id = 0;
        }
        
        async findOne(id) {
            return objects.find((elem)=> elem.id = id);
        };

        async create(data) {
            let id;
            if (this.objects.findIndex()) throw Errors.notFound;
            else this.objects.push(data);
            return data;
        };

        async find(options) {
            let id;
            id = this.objects.findIndex((elem) => elem.name === options.where.name);
            let data = object[id];
            data.id = id;
            return data;
        };

        async findAndCountAll(options) {
            var arr = this.objects.splice(options.offset,options.limit);
            
            return {
                'rows': arr,
                'count': this.objects.count
            }
        };

        async findById(id) {
            let elem = this.objects[id];
            if (elem === undefined) return null;
            else return elem;
        }

        async destroy (opt) {
            this.objects.delete(opt.where.id);
            return;
        }

        async update (data, opt) {
            this.objects[opt.where.id] = data;
        }
}