const axios = require('axios');
const base64 = require('base-64');
const { Verification } = require("../models/Verification");

// Handle the payment initiation route
const payment = async (req, res) => {
  //console.log('Headers:', req.headers);
  //console.log('Body:', req.body);

  const userId = req.body.userId;

  console.log('User ID:', userId);

  const consumerKey = process.env.CONSUMER_KEY;
  const consumerSecret = process.env.CONSUMER_SECRET;

  // Get OAuth access token
  const authRes = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    headers: {
      'Authorization': `Basic ${base64.encode(`${consumerKey}:${consumerSecret}`)}`
    }
  });

  const accessToken = authRes.data.access_token;

  // Make actual payment request
  const paymentRes = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
    "BusinessShortCode": req.body.BusinessShortCode,
    "Password": req.body.Password,
    "Timestamp": req.body.Timestamp,
    "TransactionType": req.body.TransactionType,
    "Amount": req.body.Amount,
    "PartyA": req.body.PartyA,
    "PartyB": req.body.PartyB,
    "PhoneNumber": req.body.PhoneNumber,
    "CallBackURL": req.body.CallBackURL,
    "AccountReference": req.body.AccountReference,
    "TransactionDesc": req.body.TransactionDesc
  }, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (paymentRes.data.ResponseCode == '0') {
    // The request was accepted successfully
    const verificationDetails = {
      checkoutRequestID: paymentRes.data.CheckoutRequestID,
      phoneNumber: req.body.PhoneNumber,
      amount: req.body.Amount,
      mpesaReceiptNumber: paymentRes.data.MerchantRequestID, // assuming this is the mpesaReceiptNumber
      transactionDate: new Date(), // you need to get the transactionDate from somewhere or use the current date
      resultCode: paymentRes.data.ResponseCode,
      resultDesc: paymentRes.data.ResponseDescription,
      userId: userId, // you need to get the userId from somewhere
    };

    try {
      // Save the verification details in the database
      await Verification.create(verificationDetails);
      console.log(`Verification details saved with CheckoutRequestID ${verificationDetails.checkoutRequestID}`);
    } catch (error) {
      console.error('Failed to save verification details:', error);
    }
  } else {
    console.log('Failed to initiate payment request:', paymentRes.data.CustomerMessage);
  }

  res.send(paymentRes.data);
}

module.exports = { payment }