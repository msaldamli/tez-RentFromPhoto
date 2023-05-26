import jwt from 'jsonwebtoken';

const config = process.env;

const verifyToken = (req, res, next) => {
  // atılan istek içerisinde token var mı?
  // varsa tokeni, daha önceden belirlenen JWT_SECRET token stringini kullanarak doğrula
  // doğrulama hata döndürürse catch'e düşer ve hata basar, aksi halde isteğin içerisinde bulunan user alanına tokeni ekler.
  const token =
    req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    console.error(err);
    return res.status(401).send('Invalid token');
  }
  return next();
};

module.exports = verifyToken;
