module.exports = {
  get: (req, res) => {
    if (checkToken(req.query.token)) {
      let connection = mysql.createConnection(mysqlConfig);
      //查询
      connection.connect();
      connection.query('SELECT * FROM `fresh`', function (err, rows, fields) {
        if (err) throw err;
        console.log('查询结果为: ', rows);
        let freshMessage = [];
        rows.forEach(function (element) {
          element.fresh_item = JSON.parse(element.fresh_item)

          element.fresh_item.num = element.fresh_id

          freshMessage.push(element.fresh_item)
        }, this);
        res.json({
          data: freshMessage,
          status: 200
        })
      }); //异步，要使用Promise
      connection.end();
    } else {
      res.json({
        status: 404,
        message: "token验证失败"
      })
    }
  },
  post: (req, res) => {
    let name = req.body.name
    let qq = req.body.qq
    let phone = req.body.phone
    let describle = req.body.describle
    let connection = mysql.createConnection(mysqlConfig);
    connection.connect();
    let data = '\'{"name":\"' + name + '\","qq":\"' + qq + '\","phone":\"' + phone + '\","describe":\"' + describe + '\"}\'';
    let syx = 'INSERT INTO `fresh` (`fresh_id`, `fresh_item`) VALUES (NULL,' + data + ')';
    connection.query(syx, function (err, rows, fields) {
      if (err) throw err;
      console.log('查询结果为: ', fields);
      res.json({
        status: 200
      })
    }); //异步，要使用Promise
    connection.end();

  },
  patch: (req, res) => {
    if (checkToken(req.body.token)) {
      let deleteID = req.body.data;
      let connection = mysql.createConnection(mysqlConfig);
      //查询

      connection.connect();
      connection.query('DELETE FROM `fresh` WHERE `fresh`.`fresh_id` = \'' + deleteID + '\'', function (err, rows, fields) {
        if (err) throw err;

        res.json({
          status: 200
        })
      });
      connection.end();
    } else {
      res.json({
        status: 404,
        message: "token验证失败"
      })
    }
  }
}
