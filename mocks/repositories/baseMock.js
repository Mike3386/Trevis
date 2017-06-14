'use strict';

class Mock {
    constructor() {
        this.objects = [];
        this.id = 0;
    }

    isEqualCreate(a, b) {
        return a.text === b.text;
    }

    isEqualFindOne(a, opt) {
        return a.text === opt.where.text;
    }

    async create(data) {
        if ((this.objects.findIndex((a) => this.isEqualCreate(a, data))) !== -1) throw "Error, duplicate";

        data.id = this.id++;
        this.objects.push(data);
        return data;
    };

    async findOne(options) {
        let id = this.objects.findIndex((elem) => this.isEqualFindOne(elem, options));
        return (id !== -1) ? object[id] : null;
    };

    async find(options) {
        let id = this.objects.findIndex((elem) => this.isEqualFindOne(elem, options));
        return (id !== -1) ? object[id] : null;
    };

    async findAll(options) {
        let out = this.objects.filter((elem) => {
            return this.isEqualFindOne(elem, options);
        });
        return out;
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
        let out = this.objects.map((elem) => {
            if (elem.id === opt.where.id && count < opt.limit) {
                count++;
                elem = Object.assign({}, elem, data);
                obj.push(elem);
                return elem;
            }
            return elem;
        });

        this.objects.length = 0;
        this.objects = out;

        return [obj.length, obj];
    }

    async isExist(id) {
        return this.findById(id)!=null;
    }
}


module.exports = Mock;