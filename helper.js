const jwt = require("jsonwebtoken");
const TrezSmsClient = require("trez-sms-client");
const client = new TrezSmsClient("farbod302", "eefabass");


const send_sms = (phone, msg) => {
    client.manualSendCode(phone, msg)
}


const jwt_verify = (token) => {
    try {
        let _v = jwt.verify(token,process.env.JWT)
        return _v
    }
    catch{
        return null
    }
}
module.exports = { send_sms,jwt_verify }