const PDFDocument = require("pdfkit");
const fs = require("fs");
var path = require("path");
const cv = require("../Models/cvModel");
var html_to_pdf = require('html-pdf-node');


const createPdf = {
  create(req, res) {
    const { id } = req.params;

    try {
      cv.findOne({ of_user: id }, (err, docs) => {
        if (err) {
          res.json({
            success: false,
            message: err.message,
            error: err,
          });
        } else {
          console.log(docs)
          if (!docs) {
            res.json({
              success: false,
              message: "No cv detail exsists for this user",
              data: docs,
              format: 'A4'
            });
          } else {
            res.render(
              path.join(__dirname, "../views/createCvPdf")
              ,{
                record: docs,
                printBackground: true
              },
              // ,
              (err, doc) => {
                if (err) {
                  res.json({
                    success: false,
                    messgae: err.message,
                    error: err,
                  });
                } else {
                  let options = { format: 'A4', path : path.dirname(__dirname)+ `/pdfs/${docs.of_user}.pdf`};
                  let file = { content: doc, };

                  html_to_pdf.generatePdf(file,options).then(pdfBuffer => {
                    // console.log("PDF Buffer:-", pdfBuffer);
                    // fs.createWriteStream(`${docs.cv_details.header.firstName}_${docs.cv_details.header.lastName}.pdf`, pdfBuffer);
                    res.json({
                      success: true,
                      message: "Pdf created succesfully",
                      file: pdfBuffer
                    })
                  })
                  .catch(err => {
                    console.log(err)
                  });
                  // let pdfDoc = new PDFDocument();
                  // pdfDoc.pipe(fs.createWriteStream(`${docs.cv_details.header.firstName}_${docs.cv_details.header.lastName}.pdf`));

                  // pdfDoc.create(docs).toFile(`${docs.firstName}_${docs.lastName}.pdf`,(err,file=>{
                  //   console.log(err)
                  //   res.send(file)
                  // }))
                  // pdfDoc.(file);
                  // pdfDoc.end();
                }
              }
            );
          }
        }
        // console.log(docs)
      });
    } catch (err) {}
  },
};

// let pdfDoc = new PDFDocument;
// pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));
// pdfDoc.text("My Sample PDF Document");
// pdfDoc.end();

module.exports = createPdf;
