'use strict';
const Errors = require('../../utils/errors.js');

class Mock{
        constructor() {
            this.objects = [];
            this.id = 0;
        }

        isEqualsObjects(a,b){
            return ((a.text === b.text));
        }
        
        async findOne(id) {
            return this.objects.find((elem)=> elem.id = id);
        };

        async create(data) {
            if ((this.objects.findIndex((a)=>this.isEqualsObjects(a,data))) === -1) throw Errors.notFound;

            data.id = this.id++;
            this.objects.push(data);
            return data;
        };

        async findOne(options) {
            let id;
            id = this.objects.findIndex((elem) => elem.text === options.where.text);
            let data = object[id];
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
            let id;
            id = this.objects.findIndex((elem) => elem.id === id);
            if (id === -1) return null;
            else return this.objects[id];
        }

        async destroy(opt) {
            let id = this.objects.findIndex((el)=>el.id===id);

            if(id!==-1){
                let ro = Object.assign({}, this.objects[id]);
                this.objects.delete(id);
                return ro;
            }
            else throw Errors.notFound;
        }

        async update(data, opt) {
            this.objects.forEach((elem) =>{
               if(elem.id === opt.where.id)
                       elem = Object.assign({}, elem, data);
            });

        }
}


module.exports = Mock;