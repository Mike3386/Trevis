'use strict';
const messages = require('../utils/messages');

module.exports = class BaseService {
    constructor(repository) {
        this.repository = repository;

        this.defaultConfig = {
            readChunk: {
                limit: 10,
                page: 1,
                order: 'asc',
                orderField: 'id'
            }
        };
    };

    async readChunk(options) {
        options = Object.assign({}, this.defaultConfig.readChunk, options);
        let limit = options.limit;
        let offset = (options.page - 1) * options.limit;

        let result = await this.repository.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [[options.orderField, options.order.toUpperCase()]],
            raw: true
        });

        return {
            'data': result.rows,
            'recordsTotal': result.count,
            'recordsFiltered': result.rows.length
        };
    };

    async readById(id) {
        return await this.repository.findById(id, {raw: true});
    };

    async baseCreate(data) {
        return await this.repository.create(data);
    };

    async baseUpdate(id, data) {
        return this.repository.update(data, {where: {id: id}, limit: 1});
    };

    async baseDelete(id) {
        return this.repository.destroy({where: {id: id}});
    };
};