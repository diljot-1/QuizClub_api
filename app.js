const express=require('express');
const app=express();
const db = require('./db/connect')
const morgan=require('morgan');
const logStream = require('./utils/serverLogs')
const dotenv=require('dotenv');
dotenv.config();
app.use(require('cors')())
app.use(express.json());
app.use(morgan('combined',{stream:logStream}));
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use('/questions', require('./routes/questionRoute'));
app.use('/', require('./routes/userroute'));
app.use('/tests', require('./routes/testroute'))
app.use('/admin', require('./routes/adminroute'))
app.use(require('./middleware/tokenverify'));
const exhbs= require('express-handlebars');
const nodemailer=require('nodemailer')
app.engine('handlebars',exhbs());
app.set('view engine', 'handlebars')
var smtpTransport = require('nodemailer-smtp-transport');
const { nanoid } = require('nanoid')

const logger = require('./utils/logger')(__filename);
const route=express.Router();
const adminOtpOperatons=require('./db/Schemas/admin');
  
const port=process.env.PORT || 1234;

app.get('/', (req, res) => {res.send("hello this is diljot")});

app.post('/sendotp',(req, res) => {
    console.log(req.body.mail);
   
    let verficationcode=nanoid(6);
    
    //put otp in db
    const promise=adminOtpOperatons.getEmailAndUpdateOTP( req.body.mail, verficationcode)
    promise.then(docs => {
      res.send('otp added in db');
     }).
    catch(err => {
      res.send('otp not added in db');
      logger.error('otp not added in db'+JSON.stringify(err));
      })

   let transport =nodemailer.createTransport(smtpTransport({
        host: "testengine.com@gmail.com",
        service: 'gmail',
        port: 2525,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: 'testengine.com@gmail.com',
          pass: ''
        },
        tls:{
            rejectUnauthorized: false
        }
      }));
      
      let mailOptions =  {
        from: '"testengine.com@gmail.com" <testengine.com@gmail.com>', // sender address
        to: req.body.mail, // list of receivers
        subject: "verification code is   "+verficationcode, // Subject line
        text: "verification code is"+verficationcode, // plain text body
        html: "<b>{hello}</b>", // html body
      }; 

      transport.sendMail(mailOptions,(error, info) => {
          if(error) {return console.log(error);}

          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

      })
})

app.post('/verifyotp',(req, res)=>{
    
    console.log(req.body);
    const promise =adminOtpOperatons.getDetailsAndVerify(req.body.mail);

    promise.then(docs => {
      if(docs.otp==req.body.otp)
      res.send('otp matched');
      else
      res.send('otp not matched');
     }).
    catch(err => {
      res.send('err is ');
     // logger.error('otp not added in db'+JSON.stringify(err));
      })
})

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('C:\Users\Asus\Desktop\testengine_project\testengine_view\build'))
}
const server=app.listen(port,()=>{
    console.log("server started");
    logger.debug('Server started at'+server.address().port);
});