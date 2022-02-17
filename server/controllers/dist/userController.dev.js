"use strict";

var mysql = require("mysql"); //Connection Pool


var pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}); //View User

exports.view = function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; //not connected

    console.log("Connected as ID " + connection.threadId); // User the connection

    connection.query('SELECT * FROM user WHERE status = "active"', function (err, rows) {
      // When done with the connection, release it
      connection.release();

      if (!err) {
        res.render("home", {
          rows: rows
        });
      } else {
        console.log(err);
      }

      console.log("The data from user table: \n", rows);
    });
  });
}; //Find user by search


exports.find = function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; //not connected

    console.log("Connected as ID " + connection.threadId);
    var searchTerm = req.body.search; // User the connection

    connection.query("SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?", ["%" + searchTerm + "%", "%" + searchTerm + "%"], function (err, rows) {
      if (!err) {
        res.render("home", {
          rows: rows
        });
      } else {
        console.log(err);
      }

      console.log("The data from user table: \n", rows);
    });
  });
};

exports.form = function (req, res) {
  res.render("add-user");
}; //Add new user


exports.create = function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; //not connected

    console.log("Connected as ID " + connection.threadId);
    var _req$body = req.body,
        first_name = _req$body.first_name,
        last_name = _req$body.last_name,
        email = _req$body.email,
        phone = _req$body.phone,
        comments = _req$body.comments; // User the connection

    connection.query("INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?", [first_name, last_name, email, phone, comments], function (err, rows) {
      connection.release();

      if (!err) {
        res.render("add-user", {
          alert: "User added succesfully"
        });
      } else {
        console.log(err);
      }

      console.log("The data from user table: \n", rows);
    });
  });
}; //Edit User


exports.edit = function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; //not connected

    console.log("Connected as ID " + connection.threadId); // User the connection

    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], function (err, rows) {
      if (!err) {
        res.render('edit-user', {
          rows: rows
        });
      } else {
        console.log(err);
      }

      console.log('The data from user table: \n', rows);
    });
  });
}; // Update User


exports.update = function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; //not connected

    console.log("Connected as ID " + connection.threadId);
    var _req$body2 = req.body,
        first_name = _req$body2.first_name,
        last_name = _req$body2.last_name,
        email = _req$body2.email,
        phone = _req$body2.phone,
        comments = _req$body2.comments; // User the connection

    connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], function (err, rows) {
      if (!err) {
        // User the connection
        connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], function (err, rows) {
          // When done with the connection, release it
          if (!err) {
            res.render('edit-user', {
              rows: rows,
              alert: "".concat(first_name, " has been updated.")
            });
          } else {
            console.log(err);
          }

          console.log('The data from user table: \n', rows);
        });
      } else {
        console.log(err);
      }

      console.log('The data from user table: \n', rows);
    });
  });
}; // View Users


exports.viewall = function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; //not connected

    console.log("Connected as ID " + connection.threadId); // User the connection

    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], function (err, rows) {
      if (!err) {
        res.render('view-user', {
          rows: rows
        });
      } else {
        console.log(err);
      }

      console.log('The data from user table: \n', rows);
    });
  });
}; // Delete User


exports["delete"] = function (req, res) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; //not connected

    console.log("Connected as ID " + connection.threadId);
    connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], function (err, rows) {
      if (!err) {
        var removedUser = encodeURIComponent('User successeflly removed.');
        res.redirect('/?removed=' + removedUser);
      } else {
        console.log(err);
      }

      console.log('The data from beer table are: \n', rows);
    });
  });
};