module.exports = function (req, res, next) {
  try {
    const roles = req.session?.roles;
    if (!roles ?? roles[0] === 'STUDENT') {
      return res.json({ message: "Нет прав доступа" });
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: "Ошибка" });
  }
};
