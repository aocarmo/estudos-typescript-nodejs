"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EtherealMailProvider = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let EtherealMailProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class EtherealMailProvider {
  constructor() {
    this.client = void 0;
    this.createClient();
  }

  async sendMail(to, subject, variables, path) {
    if (!this.client) {
      await this.createClient();
    }

    const templateFileContent = _fs.default.readFileSync(path).toString("utf-8");

    const templateParse = _handlebars.default.compile(templateFileContent);

    const templateHtml = templateParse(variables);
    const message = await this.client.sendMail({
      to,
      from: "Rentx <noreplay@rentx.com.br",
      subject,
      html: templateHtml
    });
    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", _nodemailer.default.getTestMessageUrl(message));
  }

  async createClient() {
    try {
      const account = await _nodemailer.default.createTestAccount();
      this.client = _nodemailer.default.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });
    } catch (err) {
      console.error(`EtherealMailProvider - Error:\n${err}`);
    }
  }

}) || _class) || _class) || _class);
exports.EtherealMailProvider = EtherealMailProvider;