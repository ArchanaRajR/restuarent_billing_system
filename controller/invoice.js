// const PDFDocument = require('pdfkit');
// const ExcelJS = require('exceljs');
// const path =require("path")
// const fs=require("fs")
// const Order=require("../model/order")

// const invoice= async (req, res) => {
//     try {
//       const orders = await Order.find().populate('tableId').populate('orderedItems.dishId').sort({ orderDate: -1 });
//       console.log(orders)
//       res.render('admin/invoicepage', { orders });
//     } catch (error) {

//     }
//   };

//   const invoicepdf = async (req, res) => {
//     try {
//         const order = await Order.findById(req.params.orderId).populate('tableId').populate('orderedItems.dishId');
//         if (!order) {
//             return res.status(404).send('Order not found');
//         }

//         const doc = new PDFDocument({ margin: 50 });
//         const filePath = path.join(__dirname, `invoice-${order._id}.pdf`);
//         const output = fs.createWriteStream(filePath);

//         doc.pipe(output);

//         doc.fontSize(20)
//             .text('FooDie', 210, 57)
//             .fontSize(10)
//             .text('opposite SciPy,PMG', 200, 65, { align: 'right' })
//             .text('Trivandrum, India, 695001', 200, 80, { align: 'right' })
//             .moveDown();

   
//         doc.fontSize(25).text('Invoice',230,73);

//         doc.fontSize(10)
//             .text(`Date: ${new Date().toLocaleDateString()}`, 50, 180)
//             .text(`Invoice Due Date: ${new Date().toLocaleDateString()}`, 50, 190)
//             .moveDown();

//         doc.text(`Order ID: ${order._id}`, 50, 160)
//             .text(`Table No: ${order.tableId.tableNumber}`, 50, 170)

       
//         const tableTop = 330;
//         const itemCodeX = 60;
//         const descriptionX = 160;
//         const quantityX = 290;
//         const priceX = 360;
//         const taxX = 410;
//         const amountX = 470;

//         doc.text('SL.No', itemCodeX, tableTop)
//             .text('ITEMS', descriptionX, tableTop)
//             .text('QUANTITY    ', quantityX, tableTop)
//             .text('PRICE    ', priceX, tableTop)
//             .text('TAX  ', taxX, tableTop)
//             .text('AMOUNT', amountX, tableTop);

//         let itemY = tableTop + 25;
//         let grandTotal = 0;
//         order.orderedItems.forEach((item, index) => {
//             const itemTotal = item.quantity * item.price;
//             const tax = itemTotal * 0.08;
//             const totalWithTax = itemTotal + tax;
//             grandTotal += totalWithTax;

//             doc.text(index + 1, itemCodeX, itemY)
//                 .text(item.dishId.dishName, descriptionX, itemY)
//                 .text(item.quantity, quantityX, itemY)
//                 .text(`Rs ${item.price}`, priceX, itemY)
//                 .text(`Rs ${tax.toFixed(2)}`, taxX, itemY)
//                 .text(`Rs ${totalWithTax.toFixed(2)}`, amountX, itemY);

//             itemY += 25;
//         });

      
//         doc.text('NOTES:', 50, itemY + 50)
//             .text('Thank you for Coming...', 50, itemY + 65);

       
//         doc.fontSize(20).text(`Grand Total: Rs ${grandTotal.toFixed(2)}`, { align: 'right' });

//         doc.end();

//         output.on('finish', () => {
//             res.download(filePath, `invoice-${order._id}.pdf`, err => {
//                 if (err) {
//                     console.log('Download error:', err);
//                     return res.status(500).send('Error downloading invoice');
//                 }
                
//                 fs.unlinkSync(filePath);
//             });
//         });

//     } catch (error) {

//     }
// }


// module.exports={
//     invoice,invoicepdf
// }


const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');
const Order = require('../model/order');

const invoice = async (req, res) => {
    try {
        const orders = await Order.find().populate('tableId').populate('orderedItems.dishId').sort({ orderDate: -1 });
        res.render('admin/invoicepage', { orders });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const invoicepdf = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId).populate('tableId').populate('orderedItems.dishId');
        if (!order) {
            return res.status(404).send('Order not found');
        }

        const doc = new PDFDocument({ margin: 50 });
        const filePath = path.join(__dirname, `invoice-${order._id}.pdf`);
        const output = fs.createWriteStream(filePath);

        doc.pipe(output);

        // Header
        doc.fontSize(20).text('FooDie', 50, 45)
            .fontSize(10)
            .text('Opposite SciPy, PMG', 50, 65)
            .text('Trivandrum, India, 695001', 50, 80)
            .moveDown();

        // Invoice title
        doc.fontSize(25).text('INVOICE', 450, 45, { align: 'right' });

        // Order details
        doc.fontSize(10)
            .text(`Date: ${new Date().toLocaleDateString()}`, 50, 120)
            .text(`Invoice Due Date: ${new Date().toLocaleDateString()}`, 50, 135)
            .moveDown()
            .text(`Order ID: ${order._id}`, 50, 150)
            .text(`Table No: ${order.tableId.tableNumber}`, 50, 165)
            .moveDown();

        // Bill to
        doc.fontSize(12).text('BILL TO', 50, 200)
            .fontSize(10)
            .text(`Table No: ${order.tableId.tableNumber}`, 50, 215)
            .moveDown();

        // Table headers
        const tableTop = 240;
        const itemCodeX = 50;
        const descriptionX = 90;
        const quantityX = 270;
        const priceX = 320;
        const taxX = 400;
        const amountX = 480;

        doc.fontSize(10)
            .text('SL.No', itemCodeX, tableTop)
            .text('DESCRIPTION', descriptionX, tableTop)
            .text('QTY', quantityX, tableTop)
            .text('UNIT PRICE', priceX, tableTop)
            .text('TAX', taxX, tableTop)
            .text('TOTAL', amountX, tableTop);

        doc.moveTo(itemCodeX, tableTop + 15)
            .lineTo(amountX + 50, tableTop + 15)
            .stroke();

        // Table rows
        let itemY = tableTop + 25;
        let grandTotal = 0;
        order.orderedItems.forEach((item, index) => {
            const itemTotal = item.quantity * item.price;
            const tax = itemTotal * 0.08; // 8% tax
            const totalWithTax = itemTotal + tax;
            grandTotal += totalWithTax;

            doc.fontSize(10)
                .text(index + 1, itemCodeX, itemY)
                .text(item.dishId.dishName, descriptionX, itemY)
                .text(item.quantity, quantityX, itemY)
                .text(`Rs ${item.price.toFixed(2)}`, priceX, itemY)
                .text(`Rs ${tax.toFixed(2)}`, taxX, itemY)
                .text(`Rs ${totalWithTax.toFixed(2)}`, amountX, itemY);

            itemY += 25;
        });

        doc.moveTo(itemCodeX, itemY)
            .lineTo(amountX + 50, itemY)
            .stroke();

        // Footer notes
        doc.text('NOTES:', 50, itemY + 10)
            .text('Thank you for Coming...', 50, itemY + 25);

        // Calculate totals
        const subtotal = grandTotal.toFixed(2);
        const tax = (grandTotal * 0.08).toFixed(2);
        const total = (parseFloat(subtotal) + parseFloat(tax)).toFixed(2);

        // Grand total
        const footerY = itemY + 60;
        const lineHeight = 15; // Space between lines
        doc.fontSize(12)
            .text(`Subtotal: Rs ${subtotal}`, amountX - 30, footerY, { align: 'right' })
            .text(`Discount: Rs 0.00`, amountX - 30, footerY + lineHeight, { align: 'right' })
            .text(`Total Tax: Rs ${tax}`, amountX - 30, footerY + lineHeight * 2, { align: 'right' })
            .fontSize(16)
            .text(`Grand Total: Rs ${total}`, amountX - 30, footerY + lineHeight * 3 + 15, { align: 'right' });

        doc.end();

        output.on('finish', () => {
            res.download(filePath, `invoice-${order._id}.pdf`, err => {
                if (err) {
                    console.log('Download error:', err);
                    return res.status(500).send('Error downloading invoice');
                }

                fs.unlinkSync(filePath);
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    invoice,
    invoicepdf
};
