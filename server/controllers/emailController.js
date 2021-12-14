const nodemailer = require("nodemailer");

const emailController = {
  send: async (req, res) => {
    const { sender, absenceType, details, startDate, endDate } = req.body;

    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    const receivers = process.env.MAIL_TO.split(", ");

    let detailsParagraph = null;

    if (details) {
      detailsParagraph = `<p>The details are the following: <strong>${details}</strong>.</p>`;
    } else {
      detailsParagraph = `<p style="display: none"></p>`;
    }

    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: receivers,
      subject: `${sender} added a new absence`,
      html: `<div className="email" style="
        border: 1px solid black;
        padding: 20px;
        font-family: sans-serif;
        font-size: 20px; 
        ">
        <p>Hi, </p>
        <p>${sender} added a new absence of type <strong>${absenceType}</strong> from <strong>${startDate}</strong> to <strong>${endDate}</strong>.</p>
        ${detailsParagraph}
        <p>All the best,</p>
        <p>PD team</p>
         </div>
    `,
    };

    await transport.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("Error " + err);
      } else {
        console.log("Email sent: " + info.response);
        res.send("Email sent: " + info.response);
      }
    });
  },
};

module.exports = emailController;
