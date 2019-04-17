var express = require('express');
var router = express.Router();
// NodeMail
const nodemailer = require('nodemailer');

// Get Homepage
router.get('/', function(req, res){
	res.render('index');
});

router.get('/programs', function(req, res){
	res.render('program');
});

router.get('/mentor', function(req, res){
	res.render('mentors');
});

router.get('/photos', function(req, res){
	res.render('photos');
});

router.get('/contact', function(req, res){
	res.render('contact');
});

router.post('/send', (req, res) => {
    const output = `
    <p>Hey Pat! You have a new CompetitiveMindset Applicant! Check it out:</p>
    <h3>Contact Details</h3>
    <ul>  
      <li><strong>Name:</strong> <br> ${req.body.name}</li>
      <li><strong>Age:</strong> <br> ${req.body.age}</li>
      <li><strong>Grade:</strong> <br> ${req.body.grade}</li>
      <li><strong>Sport and Position:</strong> <br> ${req.body.position}</li>
      <li><strong>Hometown:</strong> <br> ${req.body.hometown}</li>
      <li><strong>School:</strong> <br> ${req.body.school}</li>
      <li><strong>Club Teams:</strong> <br> ${req.body.club}</li>
      <li><strong>Height:</strong> <br> ${req.body.height}</li>
      <li><strong>Weight:</strong> <br> ${req.body.weight}</li>
      <li><strong>Email:</strong> <br> ${req.body.email}</li>
      <li><strong>Parent/Guardian Email:</strong> <br> ${req.body.parentemail}</li>
			<li><strong>Phone:</strong> <br> ${req.body.phone}</li>
    </ul>
    <h3>Questionnaire</h3>
    <ul>
    	<li><strong>At what age did you start playing sports? Why did you start?:</strong> <br> ${req.body.atwhatage}</li>
      <li><strong>What’s the highest level anyone in your family has played?:</strong> <br> ${req.body.family}</li>
      <li><strong>What are your desired short term goals in athletics?:</strong> <br> ${req.body.shortterm}</li>
      <li><strong>What are your desired long term goals in athletics?:</strong> <br> ${req.body.longterm}</li>
      <li><strong>What are your academic goals?:</strong> <br> ${req.body.academic}</li>
      <li><strong>Where do you see yourself five years from today?:</strong> <br> ${req.body.fiveyears}</li>
      <li><strong>What do you see as your biggest hurdle to achieving your athletic goals?:</strong> <br> ${req.body.hurdle}</li>
      <li><strong>What are your three strongest qualities as an athlete?:</strong> <br> ${req.body.athlete}</li>
      <li><strong>What are your three strongest qualities as an individual?:</strong> <br> ${req.body.individual}</li>
      <li><strong>What would you ideally like to achieve by enrolling in our 4-week Program?:</strong> <br> ${req.body.enroll}</li>
      <li><strong>How did you hear about us?:</strong> <br> ${req.body.hear}</li>
    </ul>
  `;

  	
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "Mailgun",
        auth: {
            user: process.env.GUN_USER, // generated ethereal user
            pass: process.env.GUN_PASS // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"CompetitiveMindset Website" <postmaster@sandbox219d4744045542aea2393eed39485472.mailgun.org>', // sender address
        to: process.env.DEST, // list of receivers
        subject: 'CompetitiveMindset - New Applicant', // Subject line
        text: 'New Contact Request', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        var msg = "Your message has been sent!"
        // res.render('confirmation');
        res.render('sent');
    });
});


module.exports = router;