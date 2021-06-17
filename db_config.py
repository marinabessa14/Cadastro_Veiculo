# -*- coding: utf-8 -*-
"""
Created on Tue Jun 15 22:52:55 2021

@author: marin
"""

from server import app
from flaskext.mysql import MySQL
mysql = MySQL()

# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = '2EyRmeqEIM'
app.config['MYSQL_DATABASE_PASSWORD'] = 'BX0FuGP29S'
app.config['MYSQL_DATABASE_DB'] = '2EyRmeqEIM'
app.config['MYSQL_DATABASE_HOST'] = 'remotemysql.com'
mysql.init_app(app)
