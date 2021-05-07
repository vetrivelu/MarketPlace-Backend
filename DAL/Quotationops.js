const Quote = require('../models/quotation');

async function addQuotation(params)
{
    const quotation = new Quote(
        {
            quotation_no    : params.quotation_no,
            contractor_po   :   params.contractor_po,
        }
    );
    const new_quotation = await quotation.save().catch((err) =>{
        console.log(err);
          return err;
      });
      return new_quotation;
}

async function deleteQuotation(id)
{
  const deletedQuote = await Quote.findById(id).remove().catch(
      (err) => {
            return err;
        }
    );
  
  if(deletedQuote)
  {
    return deletedQuote;
  }
}

async function updateQuotation(id, update)
{
  let updatedProduct  = await Quote.findByIdAndUpdate(id, update);
  if(updatedProduct)
  {
    return updatedProduct; 
  }
}

async function getQuotation(id)
{
    if(id!=null)
    {
        let quote = await Quote.findById(id);
        if(quote)
        {
            return quote;
        }
    }
    else
    {
        let quotes = await Quote.find();
        if(quotes)
        {
            return quotes;
        }
    }
}

async function getQuotationByNumber(quotation_no)
{
    let quote = await Quote.findOne({
        quotation_no    :       quotation_no
    })
    return quote;
}

async function getApprovedClientInvoices()
{
    let quotations = await getQuotation();
    let length = quotations.length;
    let invoices = [];

    for(i=0;i<length;i++)
    {
        if(quotations[i].quoteApproval == 'APPROVED')
        {
            quotations[i].client_invoice.forEach((invoice) => {
                    invoices.push(invoice);
            })
        }
    }

    return invoices;
}

async function getApprovedContractorInvoices()
{
    let quotations = await getQuotation();
    let length = quotations.length;
    let invoices = [];

    for(i=0;i<length;i++)
    {
            quotations[i].contractor_po.forEach(cpo => {
                invoices.push(cpo.contractorInvoice);
            });
    }
    return invoices;
}

module.exports.addQuotation = addQuotation;
module.exports.deleteQuotation = deleteQuotation;
module.exports.updateQuotation = updateQuotation;
module.exports.getQuotation = getQuotation;
module.exports.getApprovedClientInvoices = getApprovedClientInvoices;
module.exports.getApprovedContractorInvoices = getApprovedContractorInvoices;
module.exports.getQuotationByNumber = getQuotationByNumber;