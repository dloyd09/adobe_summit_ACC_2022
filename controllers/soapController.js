const soapRequest = require('easy-soap-request');
const userEmail = 'myadobetesting@adobe.com'; //this would normally retrieve the user from the system DB but for now keeping it simple as I'm not connected to a DB
const userAccountNo = '007'
const sessionToken = '___3daea17e-5a71-49e0-9acf-73b7e90ea063';
const mcOperator = 'mc/';
//URL example WSDL: https://Campaign002.wwfo.adobevlab.com/nl/jsp/schemawsdl.jsp?schema=nms:rtEvent
//BF0B00

exports.triggerEmail = (req, res, next) => {
  const xmls = '<?xml version="1.0" encoding="utf-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:nms:interaction">'+
                  '<soapenv:Body>'+
                  '<PushEvent xmlns="urn:nms:rtEvent">'+
                  '<sessiontoken>'+mcOperator+'</sessiontoken>'+
                    '<domEvent>'+
                      '<rtEvent type="'+req.body.eventType+'" email="'+req.body.email+'">'+
                          '<ctx>'+
                              '<firstName>'+req.body.name+'</firstName>'+
                          '</ctx>'+
                      '</rtEvent>'+
                    '</domEvent>'+
                  '</PushEvent>'+
                  '</soapenv:Body>'+
              '</soapenv:Envelope>';
  const url = 'https://campaign002.wwfo.adobevlab.com/nl/jsp/soaprouter.jsp';
  const soapHeaders = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Content-Type': 'text/xml;charset=UTF-8',
    'soapAction': 'nms:rtEvent#PushEvent',
  };
  //then run function
  
  (async () => {
    const { response } = await soapRequest({ url: url, headers: soapHeaders, xml: xmls, timeout: 1000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;
    //console.log(headers);
    //console.log(body);
    console.log(statusCode + " -- email sent --");
  })();
  //res.redirect('/thankyou');
  next();

};

exports.createProfile = (req, res) => {
  const xmls = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns="urn:xtk:session">'+
                  '<soap:Body>'+
                      '<Write xmlns="urn:xtk:session">'+
                      '<sessiontoken>'+ sessionToken + '</sessiontoken>'+
                      '<domDoc>'+
                          '<recipient _operation="insertOrUpdate" _key="@email" xtkschema="nms:recipient" firstName="'+req.body.name+'" email="'+req.body.email+'" folder-id="312130"/>'+
                      '</domDoc>'+
                      '</Write>'+
                  '</soap:Body>'+
                 '</soap:Envelope>';

  const url = 'https://campaign002.wwfo.adobevlab.com/nl/jsp/soaprouter.jsp';
  const soapHeaders = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Content-Type': 'text/xml;charset=UTF-8',
    'soapAction': 'xtk:persist#Write',
  };
  //then run function
  (async () => {
    const { response } = await soapRequest({ url: url, headers: soapHeaders, xml: xmls, timeout: 1000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;
    //console.log(headers);
    //console.log(body);
    console.log(statusCode + " -- profile created --");
  })();
  res.redirect('/thankyou');
  //next();
};


exports.surveyEvent = (req, res) => {

  const formObject = {
    "consumer": {
        "accountNo": userAccountNo,
        "email": req.body.email,
    },
    "event": {
        "type": req.body.eventType,
        "title": req.body.eventTitle,
        "brand": req.body.brand,
        "resourcePath": req.body.resourcePath,
        "responseDetails": {
            "selection": { 
              question_1: req.body.question_1,
              answer_1: req.body.answer_1,
              question_2: req.body.question_2,              
              answer_2: req.body.answer_2,
            }
        }
    }
  };
  //res.json(formObject);
  const xmls = '<?xml version="1.0" encoding="utf-8"?>'+
  '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
    '<soap:Body>'+
      '<insert xmlns="urn:dhl:surveyEvents">'+
        '<sessiontoken>'+ sessionToken + '</sessiontoken>'+
        '<eventEmailAddress>'+ req.body.email +'</eventEmailAddress>'+
        '<eventType>'+ req.body.eventType +'</eventType>'+
        '<eventTitle>'+ req.body.eventTitle +'</eventTitle>'+
        '<eventPayload>'+ JSON.stringify(formObject) +'</eventPayload>'+
        '<account>'+ userAccountNo +'</account>'+
        '<brand>'+ req.body.brand +'</brand>'+
     '</insert>'+
    '</soap:Body>'+
  '</soap:Envelope>';

  const url = 'https://campaign002.wwfo.adobevlab.com/nl/jsp/soaprouter.jsp';
  const soapHeaders = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36',
    'Content-Type': 'text/xml;charset=UTF-8',
    'soapAction': 'dhl:surveyEvents#insert',
  };

  
  //then run function
  (async () => {
    const { response } = await soapRequest({ url: url, headers: soapHeaders, xml: xmls, timeout: 1000 }); // Optional timeout parameter(milliseconds)
    const { headers, body, statusCode } = response;
    //console.log(headers);
    //console.log(body);
    console.log(statusCode + " -- survey data sent --");
  })();
  res.redirect('/thankyou');
  //res.json(res.body)
  //next();
};
