module.exports = function (req, res, next) {
  try {

    next();
  } catch (e) {
    console.log(e);
    return res.status(403)json({ message: "Нет прав доступа" });
  }
};
