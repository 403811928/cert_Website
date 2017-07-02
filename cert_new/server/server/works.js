module.exports = {
  get: (req, res) => {
    if (checkToken(req.query.token)) {
      let connection = mysql.createConnection(mysqlConfig);
      //查询
      connection.connect();
      connection.query('SELECT * FROM `works`', function (err, rows, fields) {
        if (err) throw err;
        console.log('查询结果为: ', rows);
        let worksMessage = [];
        rows.forEach(function (element) {
          element.works_item = JSON.parse(element.works_item)

          element.works_item.num = element.works_id

          worksMessage.push(element.works_item)
        }, this);
        res.json({
          data: worksMessage,
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
          let worksName = fields.worksName[0];
          let worksInfo = fields.worksInfo[0];
          let worksAuthor = fields.worksAuthor[0];
          let worksDescribe = fields.worksDescribe[0];
          let worksSrc = "http://localhost:3000/img/" + inputFile.originalFilename;

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
          let data = '\'{"name":\"' + worksName + '\","info":\"' + worksInfo + '\","src":\"' + worksSrc + '\","describle":\"' + worksDescribe + '\","author":\"' + worksAuthor + '\"}\'';
          let syx = 'INSERT INTO `works` (`works_id`, `works_item`) VALUES (NULL,' + data + ')';
          connection.query(syx, function (err, rows, fields) {
            if (err) throw err;


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
  patch: (req, res) => {
    if (checkToken(req.body.token)) {
      let deleteID = req.body.data;
      let connection = mysql.createConnection(mysqlConfig);
      //查询

      connection.connect();
      connection.query('DELETE FROM `works` WHERE `works`.`works_id` = \'' + deleteID + '\'', function (err, rows, fields) {
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
