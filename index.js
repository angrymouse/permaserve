const bns = require('bns-plus');
const {wire, Server} = bns;
// console.log(bns)
const JSON5 = require("json5")
const fs=require("fs")
global.config=JSON5.parse(fs.readFileSync("./config.json5","utf8"))

const server = new bns.AuthServer({
        tcp: true,
      edns: true,
      dnssec: true
});

server.on('query', (req, res, rinfo) => {
  const [question] = req.question;

  // Log all requests (dig format).
  console.log('Incoming request:');
  console.log(req.toString());

  // Respond with an A record (see lib/wire.js).
  if (question.name.endsWith(config.zone)) {
    const rr = new wire.Record();
    console.log("Name matches")
    rr.name = question.name;
    rr.type = wire.types.A;
    rr.ttl = 3600;
    rr.data = new wire.ARecord();
    rr.data.address = config.ip;
      res.answer.push(rr);
      console.log(res)

    return res;
  }

  // Not found!
    console.log("Got request to "+question.name)
  res.code = wire.codes.NXDOMAIN;
  return res
});

server.open(53, '127.0.0.1');