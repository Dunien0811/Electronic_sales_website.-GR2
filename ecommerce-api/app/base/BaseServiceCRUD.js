'use strict';
const Boom = require('@hapi/boom');
const Excel = require('exceljs');
const { capitalize } = require('../utils/string');
const moment = require('moment');

class BaseServiceCRUD {
  constructor(model, modelName) {
    this.model = model;
    this.modelName = modelName;
  }

  async getMany(query) {
    const builder = this.model.queryBuilder(query);
    if (this.getSearchQuery && query.q) {
      this.getSearchQuery(builder, query.q);
    }
    return builder;
  }

  async count() {
    return await this.model
      .query()
      .count('id as count')
      .first();
  }

  async getOne(id) {
    const result = await this.model.query().findById(id);
    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    return result;
  }

  async createOne(payload) {
    return this.model
      .query()
      .insert(payload)
      .returning('*');
  }

  async updateOne(id, payload) {
    const result = await this.model.query().patchAndFetchById(id, payload);
    if (!result) {
      throw Boom.notFound(`${this.modelName} not found`);
    }
    return result;
  }

  async deleteOne(id) {
    await this.model.query().deleteById(id);
    return { success: true };
  }

  getExportExecelQuery(query) {
    return this.model.queryBuilder(query);
  }
  async exportExcel(query, h) {
    try {
      delete query.limit;
      delete query.offset;
      const data = await this.getExportExecelQuery(query);
      const options = {
        useStyles: true
      };
      const workbook = new Excel.stream.xlsx.WorkbookWriter(options);
      const sheet = workbook.addWorksheet(this.modelName);
      const columns = Object.keys(data[0]).map((e) => {
        return {
          header: capitalize(e),
          key: e,
          width: 35
        };
      });
      sheet.columns = columns;
      sheet.getRow(1).font = {
        color: { argb: 'FFFFFFFF' },
        bold: true
      };
      sheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '337ab7' }
      };

      for (const e of data) {
        sheet.addRow(e);
      }
      await workbook.commit();
      const stream = workbook.stream;
      const b = stream.read();
      return h
        .response(b)
        .type(
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        .header('Content-Disposition', `attachment; filename=${this.modelName}_${moment().format('DDMMYYYYHHMM')}.xlsx`)
        .header('Access-Control-Expose-Headers', 'Content-Disposition')
        .header('Content-Length', stream.length);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BaseServiceCRUD;
