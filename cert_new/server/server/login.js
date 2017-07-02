module.exports = {
    get:()=>{},
    post:(req, res)=> {

  let userName = req.body.username;
  let getPwd = req.body.password;
  let realPwd;
  let connection = mysql.createConnection(mysqlConfig);
  //查询
  if (userName) {
    connection.connect();
    connection.query('SELECT user_pwd FROM `user` WHERE user_id = \'' + userName + '\'', function (err, rows, fields) {
      if (err) throw err;
      realPwd = rows[0].user_pwd;
      console.log('查询结果为: ', rows[0].user_pwd);
      if (realPwd == getPwd) {
        let tokens = token({
          username: userName,
          pass: getPwd,
          time: req.body.time
        })
        res.json({
          token: tokens,
          name: userName,
          status: 200
        });
      } else {
        res.json({
          status: 404
        });
      }
    }); //异步，要使用Promise
    connection.end();
  }
}
}