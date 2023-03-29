'use strict';

const Excel = require('exceljs');

async function exportExcel(query, h, getData, formatColumns) {
  try {
    delete query.limit;
    delete query.offset;
    const data = await getData(query);
    const workbook = new Excel.stream.xlsx.WorkbookWriter();
    const sheet = workbook.addWorksheet('Sheet 1');
    let columns = [];
    if (formatColumns) {
      columns = formatColumns;
    } else {
      columns = Object.keys(data[0]).map((e) => {
        return { header: e, key: e };
      });
    }
    sheet.columns = columns;
    for (const e of data) {
      sheet.addRow(e);
    }
    await workbook.commit();
    const stream = workbook.stream;
    const b = stream.read();
    return h
      .response(b)
      .type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      .header('Content-Disposition', 'attachment; filename=file.xlsx')
      .header('Access-Control-Expose-Headers', 'Content-Disposition')
      .header('Content-Length', stream.length);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  exportExcel
};
