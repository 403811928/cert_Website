module.exports = {
  post: (req, res) => {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {

      var filesTmp = JSON.stringify(files, null, 2);
      if (err) {
        console.log('parse error: ' + err);
      } else {
        console.log('parse files: ' + filesTmp);
        if (checkToken(fields.token[0])) {
          var inputFile = files.file[0];
          var uploadedPath = inputFile.path;
          var dstPath = './files/' + inputFile.originalFilename;
          let photoDate = fields.photoDate[0];
          let photoDescribe = fields.photoDescribe[0];
          let photoSrc = "http://localhost:3000/img/" + inputFile.originalFilename;

          // 重命名为真实文件名
          mv(uploadedPath, dstPath, function (err) {
            if (err) {
              throw err;
            }
            console.log('file moved successfully');
          });
          let connection = mysql.createConnection(mysqlConfig);
          //查询
          connection.connect();
          let data = '\'{"src":\"' + photoSrc + '\","describle":\"' + photoDescribe + '\","date":\"' + photoDate + '\"}\'';
          let syx = 'INSERT INTO `photo` (`photo_id`, `photo_item`) VALUES (NULL,' + data + ')';
          connection.query(syx, function (err, rows, fields) {
            if (err) throw err;
            console.log('查询结果为: ', fields);

          }); //异步，要使用Promise
          connection.end();
          res.writeHead(200, {
            'content-type': 'text/plain;charset=utf-8'
          });
          res.write('received upload:\n\n');
          res.end(util.inspect({
            fields: fields,
            files: filesTmp
          }));
        } else {
          res.json({
            status: 404,
            message: "token验证失败"
          })
        }

      }
    });
  },
  get: (req, res) => {
  if (checkToken(req.query.token)) {
    let connection = mysql.createConnection(mysqlConfig);
    //查询
    connection.connect();
    connection.query('SELECT * FROM `photo`', function (err, rows, fields) {
      if (err) throw err;
      console.log('查询结果为: ', rows);
      let photoMessage = [];
      rows.forEach(function (element) {
        element.photo_item = JSON.parse(element.photo_item)

        element.photo_item.num = element.photo_id

        photoMessage.push(element.photo_item)
      }, this);
      res.json({
        data: photoMessage,
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
  patch: (req, res) => {
  if (checkToken(req.body.token)) {
    let deleteID = req.body.data;
    let connection = mysql.createConnection(mysqlConfig);
    //查询
    connection.connect();
    connection.query('DELETE FROM `photo` WHERE `photo`.`photo_id` = \'' + deleteID + '\'', function (err, rows, fields) {
      if (err) throw err;
      console.log("删除成功")
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
