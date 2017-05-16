'use strict';

class Mock{
    constructor() {
        this.objects = [];
        this.id = 0;
    }

    async create(data) {
        if ((this.objects.findIndex((a) => a.text === data.text)) !== -1) throw "Error, duplicate";

        data.id = this.id++;
        this.objects.push(data);
        return data;
    };

    async findOne(options) {
        let id;
        id = this.objects.findIndex((elem) => elem.text === options.where.text);
        return object[id];
    };

    async findAndCountAll(options) {
        let arr = this.objects.slice(options.offset, options.limit);

        return {
            'rows': arr,
            'count': this.objects.count
        }
    };

    async findById(id) {
        let arrId;
        arrId = this.objects.findIndex((elem) => elem.id === id);
        if (arrId === -1) return null;
        else return this.objects[arrId];
    }

    async destroy(opt) {
        let out = this.objects.filter((elem) => {
            return (elem.id !== opt.where.id);
        });
        this.objects.length = 0;
        this.objects = out;
    }

    async update(data, opt) {
        let obj = [];
        let count = 0;
        let out = this.objects.map((elem)=>{
            if(elem.id === opt.where.id && count < opt.limit){
                count++;
                obj.push(JSON.parse(JSON.stringify(elem)));
                return Object.assign({}, elem, data);
            }
            else return elem;
        });

        this.objects.length = 0;
        this.objects = out;

        return [obj.length, obj];
    }
}


module.exports = Mock;