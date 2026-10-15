// Catches errors that are not handled inside controllers
// (multer file errors, invalid JSON bodies, unexpected crashes)
module.exports = (err, req, res, next) => {
  const status = err.status || (err.name === 'MulterError' ? 400 : 500);
  const isHidden = status === 500 && process.env.NODE_ENV === 'production';

  if (status === 500) console.error(err);

  res.status(status).json({
    success: false,
    error: isHidden ? 'Server Error' : err.message,
  });
};
