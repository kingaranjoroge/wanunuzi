require('dotenv').config(); // don't forget to install this: npm install dotenv
const express = require('express');
const app = express();
const cors = require('cors'); // don't forget to install this: npm install cors


app.use(cors());
app.use(express.json());

app.use('/signup', require('./routes/usersRoute'))
app.use('/login', require('./routes/loginRoute'))
app.use('/addGuarantor', require('./routes/addGuarantorRoute'))
app.use('/addGuarantorsToLoan', require('./routes/addGuarantorsToLoanRoute'))
app.use('/verify-email', require('./routes/verifyEmailRoute'))
app.use('/createLoan', require('./routes/createLoanRoute'))
app.use('/balance', require('./routes/balanceRoute'))
app.use('/payment', require('./routes/paymentRoute'))
app.use('/payment/callback', require('./routes/paymentCallbackRoute'))
app.use('/savingsBalance', require('./routes/savingsBalanceRoute'))
app.use('/deposit', require('./routes/depositRoute'))
app.use('/user', require('./routes/getUserRoute'))
app.use('/profile', require('./routes/profileRoute'))
app.use('/loan', require('./routes/getLoanRoute'))
app.use('/savings-dashboard', require('./routes/savingsDashBoardRoute'));
app.use('/complete-registration', require('./routes/addMoreUserDetailsRoute'));
app.use('/getGuarantors', require('./routes/getLoanGuarantorsRoute'));
app.use('/all', require('./routes/getAllGuarantorsForLoanRoute'));
app.use('/guarantor-decision', require('./routes/guarantorDecisionRoute'));
app.use('/guarantor-data', require('./routes/guarantorDataRoute'));


const port = process.env.SERVERPORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
