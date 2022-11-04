let b64url = process.argv[2]
console.log(BigInt("0x"+Buffer.from(b64url, "base64url").toString("hex")).toString(36))