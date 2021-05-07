const Quote = require('../models/quotation');

async function addQuotation(params)
{
    const quotation = new Quote(
        {
            parent_quote    :   params.parent_quote,
            quotation_no    : params.quotation_no,
            currency    : params.currency,
            client_id   : params.client_id,
            client_name :   params.client_name,
            quote_amt   : params.quote_amt,
            client_PO   : params.client_PO,
            Description : params.Description,
            quoteApproval   :params.quoteApproval,
            issuedDate  : params.issuedDate,
            client_invoice  :   params.client_invoice,
            contractor_po   :   params.contractor_po,
            ccmTicketNUmber :   params.ccmTicketNUmber,
            jobCompleteDate :   params.jobCompleteDate,
            margin_percent  :   params.margin_percent,
            margin_amt  :   params.margin_amt
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

module.exports.addQuotation = addQuotation;
module.exports.deleteQuotation = deleteQuotation;
module.exports.updateQuotation = updateQuotation;
module.exports.getQuotation = getQuotation;