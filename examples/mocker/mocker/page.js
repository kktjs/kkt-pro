module.exports.list = function (req, res) {
  return res.status(200).json({
    code: 1,
    data: {
      rows: [{ id: 1, name: '测试' }],
      total: 0,
    },
  });
};

module.exports.page = function (req, res) {
  return res.status(200).json({
    code: -1,
    message: '请求失败',
  });
};
