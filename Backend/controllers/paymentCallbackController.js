const paymentCallback = async (req, res) => {
    const { Body: { stkCallback: { ResultCode, ResultDesc, CallbackMetadata } } } = req.body;

  if (ResultCode === 0) {
    const amount = CallbackMetadata.Item.find(item => item.Name === 'Amount').Value;
    const phoneNumber = CallbackMetadata.Item.find(item => item.Name === 'PhoneNumber').Value;

    console.log(`Payment of ${amount} was successful for user with phone number: ${phoneNumber}`);
  } else {
    console.error(`Payment failed with error: ${ResultDesc}`);
  }

  res.status(200).end();
}

module.exports = { paymentCallback }