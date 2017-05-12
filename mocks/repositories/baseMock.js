'use strict';
const Errors = require('../../utils/errors.js');

module.exports = 
class Mock{
        constructor() {
            this.objects = [];
        }
        
        async findOne(id) {
            return this.objects[id];
        };

        async create(data) {
            if (this.objects.find((dt)=>{JSON.stringify(data)==JSON.stringify(dt)})) throw Errors.notFound;
            else this.objects.push(data);        
            console.log("c1");
            return data;
        };

        async find(options) {
            return this.objects.find((elem) => elem.name === options.where.name);
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