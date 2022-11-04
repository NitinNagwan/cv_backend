function verify( req, res) {
  if (req.user) {
    res.status(200).send({ isverification: true });
  } else {
    res.status(200).send({ isverification: false });
  }
}
module.exports = verify;
