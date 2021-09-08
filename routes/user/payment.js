const mongoose = require('mongoose')
const axios=require('axios')

try {
    let params = {
        MerchantID: "6cded376-3063-11e9-a98e-005056a205be",
        Amount: pay,//toman
        CallbackURL: "http://localhost:3000/user/payment",
        Description: "خرید تست"
    }
    const response = await axios.post("https://www.zarinpal.com/pg/rest/WebGate/PaymentRequest.json", params)
    if (response.data.Status == 100) {
        const Payment = await mongoose.model('Payment')
        let newPayment = new Payment({
            userId: _userId,
            amount: pay,
            resnumber: response.data.Authority
        })
        await newPayment.save()
        res.redirect(`https://www.zarinpal.com/pg/StartPay/${response.data.Authority}`)
    }
} catch (err) {
    console.log(err);
}

const payCallBack = async (req, res, next) => {
    try {
        if (req.query.Status && req.query.Status !== "OK") {
            return res.status(400).send('unsuccessful transaction')
        }
        let payment = await mongoose.model('Payment').findOne({ resnumber: req.query.Authority })
        if (!payment) return res.status(400).send('no transaction found')
        let params={
            MerchantID: "6cded376-3063-11e9-a98e-005056a205be",
            Amount: payment.amount,//toman
            Authority:req.query.Authority
        }
        const response=await axios.post("https://www.zarinpal.com/pg/rest/WebGate/PaymentVerification.json")
        if(response.data.Status ==100){
            let balance=payment.amount
            let user=await mongoose.model("User").findById(payment.user)
            user.price=balance
            payment.payment=true
            await user.save()
            await payment.save()
            res.status(400).send('ok')
        }else{
            return res.status(400).send('unsuccessful transaction')
        }
    } catch (err) {
        console.log(err);
    }
}