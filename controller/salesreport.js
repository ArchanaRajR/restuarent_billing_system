// const Order = require('../model/order');
// const PDFDocument = require('pdfkit');
// const moment =require("moment")

// const generateSalesReportPDF = (orders, start, end, res) => {
//   const doc = new PDFDocument({ size: 'A4' });
//   let filename = `Sales_Report_${start.format('YYYY-MM-DD')}_to_${end.format('YYYY-MM-DD')}.pdf`;

//   res.setHeader('Content-disposition', `attachment; filename=${filename}`);
//   res.setHeader('Content-type', 'application/pdf');
//   doc.pipe(res);

//   doc.fontSize(20).text(`Sales Report from ${start.format('YYYY-MM-DD')} to ${end.format('YYYY-MM-DD')}`, {
//     align: 'center'
//   });
//   doc.moveDown();

//   const tableTop = 150;
//   const itemWidth = 100;
//   const rowHeight = 15; 
//   const emptyLineHeight = 15; 

//   doc.fontSize(12).text(`SL.no`, 50, tableTop);
//   doc.text(`Dish Name(s)`, 100, tableTop);
//   doc.text(`Quantity`, 250, tableTop);
//   doc.text(`Order Total`, 350, tableTop);
//   doc.text(`Order Date`, 450, tableTop);
//   doc.text(`Payment Method`, 550, tableTop);

//   let totalSales = 0;
//   let y = tableTop + 20;

//   orders.forEach((order, index) => {
//     totalSales += order.grandTotal;

//     const dishNames = order.orderedItems.map(item => item.dishName).join('\n');
//     const quantities = order.orderedItems.map(item => item.quantity).join('\n');
//     const paymentMethods = order.orderedItems.map(item => item.paymentMethod).join('\n');

//     const maxLines = Math.max(dishNames.split('\n').length, quantities.split('\n').length);

    
//     if (y + (maxLines * rowHeight) + emptyLineHeight > doc.page.height - 50) {
//       doc.addPage();
//       y = 50; 
//     }

//     doc.text(index + 1, 50, y);
//     doc.text(dishNames, 100, y, { width: itemWidth });
//     doc.text(quantities, 250, y, { width: itemWidth });
//     doc.text(order.grandTotal.toFixed(2), 350, y);
//     doc.text(order.orderDate.toISOString().substring(0, 10), 450, y);
//     doc.text(paymentMethods, 550, y);

//     y += (maxLines * rowHeight) + emptyLineHeight; 
//   });

//   doc.moveDown();
//   doc.fontSize(15).text(`Total Sales: ₹${totalSales.toFixed(2)}`, {
//     align: 'left'
//   });

//   doc.end();
// }


// const salesReporter = async (req, res) => {
//   const { startDate, endDate, range } = req.query;
//   let query = {};
//   let start, end;

 
//   if (range === 'daily') {
//     start = moment().startOf('day');
//     end = moment().endOf('day');
//   } else if (range === 'weekly') {
//     start = moment().startOf('week');
//     end = moment().endOf('week');
//   } else if (range === 'monthly') {
//     start = moment().startOf('month');
//     end = moment().endOf('month');
//   } else if (range === 'yearly') {
//     start = moment().startOf('year');
//     end = moment().endOf('year');
//   } else if (startDate && endDate && moment(startDate).isValid() && moment(endDate).isValid()) {
//     start = moment(startDate);
//     end = moment(endDate).endOf('day');
//   } else {
   
//     start = moment().subtract(1, 'month').startOf('day');
//     end = moment().endOf('day');
//   }

//   query.orderDate = { $gte: start.toDate(), $lte: end.toDate() };

//   try {
//     const orders = await Order.find(query).populate('tableId').populate('orderedItems.dishId');
//     let totalSales = 0;
//     let totalCancelled = 0;

//     orders.forEach(order => {
//       totalSales += order.grandTotal;
//       if (order.orderedItems.some(item => item.status === 'Cancelled')) {
//         totalCancelled += 1;
//       }
//     });

//     res.render('adminFront', { orders, startDate: start.format('YYYY-MM-DD'), endDate: end.format('YYYY-MM-DD'), range, totalSales, totalCancelled });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// }
// const salesPdf = async (req, res) => {
//   const { startDate, endDate, range } = req.query;
//   let query = {};
//   let start, end;

  
//   if (range === 'daily') {
//     start = moment().startOf('day');
//     end = moment().endOf('day');
//   } else if (range === 'weekly') {
//     start = moment().startOf('week');
//     end = moment().endOf('week');
//   } else if (range === 'monthly') {
//     start = moment().startOf('month');
//     end = moment().endOf('month');
//   } else if (range === 'yearly') {
//     start = moment().startOf('year');
//     end = moment().endOf('year');
//   } else if (startDate && endDate && moment(startDate).isValid() && moment(endDate).isValid()) {
//     start = moment(startDate);
//     end = moment(endDate).endOf('day');
//   } else {
    
//     start = moment().subtract(1, 'month').startOf('day');
//     end = moment().endOf('day');
//   }

//   query.orderDate = { $gte: start.toDate(), $lte: end.toDate() };

//   try {
//     const orders = await Order.find(query).populate('tableId').populate('orderedItems.dishId');
//     generateSalesReportPDF(orders, start, end, res);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// }

// module.exports = {
// salesReporter,salesPdf
// }













// const Order = require('../model/order');
// const PDFDocument = require('pdfkit');
// const moment = require('moment');

// const generateSalesReportPDF = (orders, start, end, res) => {
//   const doc = new PDFDocument({ size: 'A4' });
//   let filename = `Sales_Report_${start.format('YYYY-MM-DD')}_to_${end.format('YYYY-MM-DD')}.pdf`;

//   res.setHeader('Content-disposition', `attachment; filename=${filename}`);
//   res.setHeader('Content-type', 'application/pdf');
//   doc.pipe(res);

//   doc.fontSize(20).text(`Sales Report from ${start.format('YYYY-MM-DD')} to ${end.format('YYYY-MM-DD')}`, {
//     align: 'center'
//   });
//   doc.moveDown();

//   const tableTop = 150;
//   const itemWidth = 100;
//   const rowHeight = 15;
//   const emptyLineHeight = 40;

//   const columnPositions = {
//     slNo: 30,
//     dishNames: 80,
//     quantities: 200,
//     orderTotal: 300,
//     orderDate: 400,
//     paymentMethod: 600,
//   };

//   doc.fontSize(12).text(`SL.no`, columnPositions.slNo, tableTop);
//   doc.text(`Dish Name(s)`, columnPositions.dishNames, tableTop);
//   doc.text(`Quantity`, columnPositions.quantities, tableTop);
//   doc.text(`Order Total`, columnPositions.orderTotal, tableTop);
//   doc.text(`Order Date`, columnPositions.orderDate, tableTop);
//   doc.text(`Payment Method`, columnPositions.paymentMethod, tableTop);

//   let totalSales = 0;
//   let y = tableTop + 20;

//   orders.forEach((order, index) => {
//     totalSales += order.grandTotal;

//     const dishNames = order.orderedItems.map(item => item.dishName).join('\n');
//     const quantities = order.orderedItems.map(item => item.quantity).join('\n');
//     const paymentMethods = order.orderedItems.map(item => item.paymentMethod).join('\n');

//     const maxLines = Math.max(dishNames.split('\n').length, quantities.split('\n').length);

//     if (y + (maxLines * rowHeight) + emptyLineHeight > doc.page.height - 50) {
//       doc.addPage();
//       y = 50;
//     }

//     doc.text(index + 1, columnPositions.slNo, y);
//     doc.text(dishNames, columnPositions.dishNames, y, { width: itemWidth });
//     doc.text(quantities, columnPositions.quantities, y, { width: itemWidth });
//     doc.text(order.grandTotal.toFixed(2), columnPositions.orderTotal, y);
//     doc.text(order.orderDate.toISOString().substring(0, 10), columnPositions.orderDate, y);
//     doc.text(paymentMethods, columnPositions.paymentMethod, y);

//     y += (maxLines * rowHeight) + emptyLineHeight;
//   });

//   doc.moveDown();
//   doc.fontSize(15).text(`Total Sales: ₹${totalSales.toFixed(2)}`, {
//     align: 'left'
//   });

//   doc.end();
// }

// const salesReporter = async (req, res) => {
//   const { startDate, endDate, range } = req.query;
//   let query = {};
//   let start, end;

//   if (range === 'daily') {
//     start = moment().startOf('day');
//     end = moment().endOf('day');
//   } else if (range === 'weekly') {
//     start = moment().startOf('week');
//     end = moment().endOf('week');
//   } else if (range === 'monthly') {
//     start = moment().startOf('month');
//     end = moment().endOf('month');
//   } else if (range === 'yearly') {
//     start = moment().startOf('year');
//     end = moment().endOf('year');
//   } else if (startDate && endDate && moment(startDate).isValid() && moment(endDate).isValid()) {
//     start = moment(startDate);
//     end = moment(endDate).endOf('day');
//   } else {
//     start = moment().subtract(1, 'month').startOf('day');
//     end = moment().endOf('day');
//   }

//   query.orderDate = { $gte: start.toDate(), $lte: end.toDate() };

//   try {
//     const orders = await Order.find(query).populate('tableId').populate('orderedItems.dishId');
//     let totalSales = 0;
//     let totalCancelled = 0;

//     orders.forEach(order => {
//       totalSales += order.grandTotal;
//       if (order.orderedItems.some(item => item.status === 'Cancelled')) {
//         totalCancelled += 1;
//       }
//     });

//     res.render('adminFront', { orders, startDate: start.format('YYYY-MM-DD'), endDate: end.format('YYYY-MM-DD'), range, totalSales, totalCancelled });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// }

// const salesPdf = async (req, res) => {
//   const { startDate, endDate, range } = req.query;
//   let query = {};
//   let start, end;

//   if (range === 'daily') {
//     start = moment().startOf('day');
//     end = moment().endOf('day');
//   } else if (range === 'weekly') {
//     start = moment().startOf('week');
//     end = moment().endOf('week');
//   } else if (range === 'monthly') {
//     start = moment().startOf('month');
//     end = moment().endOf('month');
//   } else if (range === 'yearly') {
//     start = moment().startOf('year');
//     end = moment().endOf('year');
//   } else if (startDate && endDate && moment(startDate).isValid() && moment(endDate).isValid()) {
//     start = moment(startDate);
//     end = moment(endDate).endOf('day');
//   } else {
//     start = moment().subtract(1, 'month').startOf('day');
//     end = moment().endOf('day');
//   }

//   query.orderDate = { $gte: start.toDate(), $lte: end.toDate() };

//   try {
//     const orders = await Order.find(query).populate('tableId').populate('orderedItems.dishId');
//     generateSalesReportPDF(orders, start, end, res);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// }

// module.exports = {
//   salesReporter,
//   salesPdf
// }




const Order = require('../model/order');
const PDFDocument = require('pdfkit');
const moment = require('moment');

const generateSalesReportPDF = (orders, start, end, res) => {
  const doc = new PDFDocument({ size: 'A4', margin: 50 });
  let filename = `Sales_Report_${start.format('YYYY-MM-DD')}_to_${end.format('YYYY-MM-DD')}.pdf`;

  res.setHeader('Content-disposition', `attachment; filename=${filename}`);
  res.setHeader('Content-type', 'application/pdf');
  doc.pipe(res);

  doc.fontSize(16).text(`Sales Report from ${start.format('YYYY-MM-DD')} to ${end.format('YYYY-MM-DD')}`, {
    align: 'center'
  });
  doc.moveDown();

  const tableTop = 100;
  const itemWidth = 100;
  const rowHeight = 60;
  const tableBottomMargin = 90;

  const columnPositions = {
    slNo: 50,
    dishNames: 100,
    quantities: 250,
    orderTotal: 350,
    orderDate: 450,
    //paymentMethod: 500
  };

  // Draw table headers
  doc.fontSize(10).font('Helvetica-Bold');
  doc.text('SL.no', columnPositions.slNo, tableTop);
  doc.text('Dish Name(s)', columnPositions.dishNames, tableTop);
  doc.text('Quantity', columnPositions.quantities, tableTop);
  doc.text('Order Total', columnPositions.orderTotal, tableTop);
  doc.text('Order Date', columnPositions.orderDate, tableTop);
  // doc.text('Payment Method', columnPositions.paymentMethod, tableTop);

  let totalSales = 0;
  let y = tableTop + rowHeight;

  orders.forEach((order, index) => {
    totalSales += order.grandTotal;

    const dishNames = order.orderedItems.map(item => item.dishName).join(', ');
    const quantities = order.orderedItems.map(item => item.quantity).join(', ');
    // const paymentMethods = order.paymentMethod;

    const maxLines = Math.max(dishNames.split(', ').length, quantities.split(', ').length);

    if (y + (maxLines * rowHeight) + tableBottomMargin > doc.page.height - tableBottomMargin) {
      doc.addPage();
      y = tableBottomMargin;
    }

    // Draw table rows
    doc.fontSize(10).font('Helvetica');
    doc.text(index + 1, columnPositions.slNo, y);
    doc.text(dishNames, columnPositions.dishNames, y, { width: itemWidth, ellipsis: true });
    doc.text(quantities, columnPositions.quantities, y, { width: itemWidth, ellipsis: true });
    doc.text(order.grandTotal.toFixed(2), columnPositions.orderTotal, y, { width: itemWidth, ellipsis: true });
    doc.text(order.orderDate.toISOString().substring(0, 10), columnPositions.orderDate, y, { width: itemWidth, ellipsis: true });
    // doc.text(paymentMethods, columnPositions.paymentMethod, y, { width: itemWidth, ellipsis: true });

    y += rowHeight;
  });

  doc.moveDown();
  doc.fontSize(12).text(`Total Sales: ₹${totalSales.toFixed(2)}`, {
    align: 'left'
  });

  doc.end();
}
const salesReportAdmin=async (req, res) => {
  const { startDate, endDate, range } = req.query;
  let query = {};
  let start, end;

  if (range === 'daily') {
    start = moment().startOf('day');
    end = moment().endOf('day');
  } else if (range === 'weekly') {
    start = moment().startOf('week');
    end = moment().endOf('week');
  } else if (range === 'monthly') {
    start = moment().startOf('month');
    end = moment().endOf('month');
  } else if (range === 'yearly') {
    start = moment().startOf('year');
    end = moment().endOf('year');
  } else if (startDate && endDate && moment(startDate).isValid() && moment(endDate).isValid()) {
    start = moment(startDate);
    end = moment(endDate).endOf('day');
  } else {
    start = moment().subtract(1, 'month').startOf('day');
    end = moment().endOf('day');
  }

  query.orderDate = { $gte: start.toDate(), $lte: end.toDate() };

  try {
    const orders = await Order.find(query).populate('tableId').populate('orderedItems.dishId');
    let totalSales = 0;
    let totalCancelled = 0;

    orders.forEach(order => {
      totalSales += order.grandTotal;
      if (order.orderedItems.some(item => item.status === 'Cancelled')) {
        totalCancelled += 1;
      }
    });

    res.render('manager/managerFront', { orders, startDate: start.format('YYYY-MM-DD'), endDate: end.format('YYYY-MM-DD'), range, totalSales, totalCancelled });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}

const salesReporter = async (req, res) => {
  const { startDate, endDate, range } = req.query;
  let query = {};
  let start, end;

  if (range === 'daily') {
    start = moment().startOf('day');
    end = moment().endOf('day');
  } else if (range === 'weekly') {
    start = moment().startOf('week');
    end = moment().endOf('week');
  } else if (range === 'monthly') {
    start = moment().startOf('month');
    end = moment().endOf('month');
  } else if (range === 'yearly') {
    start = moment().startOf('year');
    end = moment().endOf('year');
  } else if (startDate && endDate && moment(startDate).isValid() && moment(endDate).isValid()) {
    start = moment(startDate);
    end = moment(endDate).endOf('day');
  } else {
    start = moment().subtract(1, 'month').startOf('day');
    end = moment().endOf('day');
  }

  query.orderDate = { $gte: start.toDate(), $lte: end.toDate() };

  try {
    const orders = await Order.find(query).populate('tableId').populate('orderedItems.dishId');
    let totalSales = 0;
    let totalCancelled = 0;

    orders.forEach(order => {
      totalSales += order.grandTotal;
      if (order.orderedItems.some(item => item.status === 'Cancelled')) {
        totalCancelled += 1;
      }
    });

    res.render('adminFront', { orders, startDate: start.format('YYYY-MM-DD'), endDate: end.format('YYYY-MM-DD'), range, totalSales, totalCancelled });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}

const salesPdf = async (req, res) => {
  const { startDate, endDate, range } = req.query;
  let query = {};
  let start, end;

  if (range === 'daily') {
    start = moment().startOf('day');
    end = moment().endOf('day');
  } else if (range === 'weekly') {
    start = moment().startOf('week');
    end = moment().endOf('week');
  } else if (range === 'monthly') {
    start = moment().startOf('month');
    end = moment().endOf('month');
  } else if (range === 'yearly') {
    start = moment().startOf('year');
    end = moment().endOf('year');
  } else if (startDate && endDate && moment(startDate).isValid() && moment(endDate).isValid()) {
    start = moment(startDate);
    end = moment(endDate).endOf('day');
  } else {
    start = moment().subtract(1, 'month').startOf('day');
    end = moment().endOf('day');
  }

  query.orderDate = { $gte: start.toDate(), $lte: end.toDate() };

  try {
    const orders = await Order.find(query).populate('tableId').populate('orderedItems.dishId');
    generateSalesReportPDF(orders, start, end, res);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  salesReporter,
  salesPdf,
  salesReportAdmin
}
