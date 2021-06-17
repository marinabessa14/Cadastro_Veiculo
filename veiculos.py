# -*- coding: utf-8 -*-
"""
Created on Tue Jun 15 22:53:46 2021

@author: marin
"""

import pymysql
from server import app
from db_config import mysql
from flask import jsonify
from flask import flash, request

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/js/<path:path>')
def send_js(path):
    return app.send_static_file('js/' + path)


@app.route("/veiculos/<idveiculo>", methods = ['DELETE'])
def excluirVeiculo(idveiculo):
    try:
            conn=mysql.connect()
            cur = conn.cursor(pymysql.cursors.DictCursor)
            
            if request.method == 'DELETE':
                sql = '''DELETE FROM `Veiculos` WHERE idveiculo = %s'''''
                val = (idveiculo)
                
                cur.execute(sql, val)
                conn.commit()

                resp = jsonify(idveiculo)
                resp.status_code=200
                return resp
            else:
                return "método desconhecido: " + request.method
                
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()
        
@app.route("/veiculos", methods = ['GET', 'POST', 'PUT'])
def user():
    try:
            conn=mysql.connect()
            cur = conn.cursor(pymysql.cursors.DictCursor)
            
            if request.method == 'GET':
                cur.execute("SELECT * FROM `Veiculos`")
                rows = cur.fetchall()
                resp = jsonify(rows)
                resp.status_code=200
                return resp
            elif request.method == 'POST':
                
                obj = request.json
                modelo = obj["modelo"]
                placa = obj["placa"]
                cor = obj["cor"]
                direcao = obj["direcao"]
                ano = obj["ano"]
                
                sql = '''INSERT INTO `Veiculos` (modelo, placa, cor, direcao, ano) VALUES (%s, %s, %s, %s, %s)'''''
                val = (modelo, placa, cor, direcao, ano)
                
                cur.execute(sql, val)
                conn.commit()
  
                resp = jsonify(obj)
                resp.status_code=200
                return resp
            elif request.method == 'PUT':
                obj = request.json
                idveiculo = obj["idveiculo"]
                modelo = obj["modelo"]
                placa = obj["placa"]
                cor = obj["cor"]
                direcao = obj["direcao"]
                ano = obj["ano"]
                
                sql = '''UPDATE `Veiculos` SET modelo=%s, placa=%s, cor=%s, direcao=%s, ano=%s   WHERE idveiculo = %s'''''
                val = (modelo, placa, cor, direcao, ano)
                
                cur.execute(sql, val)
                conn.commit()

                resp = jsonify(obj)
                resp.status_code=200
                return resp
            else:
                return "método desconhecido: " + request.method
                
    except Exception as e:
        print(e)
    finally:
        cur.close()
        conn.close()
        
        
@app.errorhandler(404)
def not_found(error=None):
    message = {
            'status':404,
            'message':'Not Found ' + request.url,
            }
            
    resp = jsonify(message)
    resp.status_code = 404
    return resp


if __name__ == "__main__":
    app.run()    
