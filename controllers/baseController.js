//const soapRequest = require('easy-soap-request');

exports.homePage = (req, res) => {
    res.render('index');
};

exports.thankyou = (req, res) => {
    res.render('thankyou');
};

exports.signup = (req, res) => {
    res.render('signup')
};

exports.survey = (req, res) => {
    res.render('survey')
};
/*
exports.signUpEmail = (req, res, next) => {
    const xmls = '<?xml version="1.0" encoding="utf-8"?><soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:nms:interaction">'+
                    '<soapenv:Body>'+
                    '<PushEvent xmlns="urn:nms:rtEvent">'+
                    '<sessiontoken>mc/mc</sessiontoken>'+
                      '<domEvent>'+
                        '<rtEvent type="signup" email="'+ req.body.email +'">'+
                            '<ctx>'+
                                '<firstName>'+ req.body.name +'</firstName>'+
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
      console.log(body);
      //console.log(statusCode);
    })();
    //res.redirect('/thankyou');
    next();
};

exports.createProfile = (req, res) => {
    const xmls = '<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns="urn:xtk:session">\
                    <soap:Body>\
                        <Write xmlns="urn:xtk:session">\
                        <sessiontoken>___dc98c792-d9ff-4298-80b2-3776dcb88e18</sessiontoken>\
                        <domDoc>\
                            <recipient _operation="insertOrUpdate" _key="@email" xtkschema="nms:recipient" firstName="'+req.body.name+'" email="'+req.body.email+'"/>\
                        </domDoc>\
                        </Write>\
                    </soap:Body>\
                   </soap:Envelope>';

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
      console.log(body);
      //console.log(statusCode);
    })();
    res.redirect('/thankyou');
    //next();
};


exports.surveyEvent = (req, res) => {
    const xmls = '<?xml version="1.0" encoding="utf-8"?>'+
    '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'+
      '<soap:Body>'+
        '<insert xmlns="urn:dhl:surveyEvents">'+
          '<sessiontoken>___dc98c792-d9ff-4298-80b2-3776dcb88e18</sessiontoken>'+
          '<eventEmailAddress>'+ req.body +'</eventEmailAddress>'+
          '<eventType>'+ req.body +'</eventType>'+
          '<eventPayload>'+ req.body +'</eventPayload>'+
          '<account>'+ req.body +'</account>'+
          '<brand>'+ req.body +'</brand>'+
       '</insert>'+
      '</soap:Body>'+
    '</soap:Envelope>';

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
      console.log(body);
      //console.log(statusCode);
    })();
    res.redirect('/thankyou');
    //next();
};
*/
