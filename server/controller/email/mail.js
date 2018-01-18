/**
 *
 * @Description 邮件发送
 * 调用方法:sendMail('amor_zhang@qq.com','这是测试邮件', 'Hi Amor,这是一封测试邮件');
 * @Author Amor
 * @Create
 *
 */
const fs=require('fs')
const  config=require('../../config/zConfig').zconfig
var nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');

smtpTransport = nodemailer.createTransport(smtpTransport({
  host: config.email.host,
  secure:true,
  secureConnection: true,
  port:config.email.port,
  auth: {
    user: config.email.user,
    pass: config.email.pass
  }
}));

/**
 * @param {String} recipient 收件人
 * @param {String} subject 发送的主题
 * @param {String} html 发送的html内容
 */
var sendMail = function (recipient, subject, html,filename,filePath) {
    if(filename!=null&&filePath!=null){
      smtpTransport.sendMail({
        from: config.email.user,
        to: recipient,
        subject: subject,
        html: html,
        attachments:[
          {
            path: filePath
          },
        ]
      }, function (error, response) {
        if (error) {
          console.log(error);
        }
        console.log(response)
        console.log('发送成功')
      });
    }else {
      smtpTransport.sendMail({
        from: config.email.user,
        to: recipient,
        subject: subject,
        html: html,
      }, function (error, response) {
        if (error) {
          console.log(error);
        }
        console.log(response)
        console.log('发送成功')
      });
    }

  smtpTransport.close()
}

module.exports = sendMail;

sendMail('1044055912@qq.com','这是测试邮件', 'test2','asdsadds.txt','./test.txt');
