from flask import Flask, render_template, request, abort
import json
import re
import requests
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)


@app.route("/")
def main():
    return "Wonderful, it works."


@app.route("/logs", methods=["POST"])
@cross_origin()
def logit():
    # try:
    username = request.get_json()["username"]
    password = request.get_json()["password"]
    message = request.get_json()["message"]
    color = request.get_json()["color"]

    data = {
        "username": username,
        "password": password,
        "message": message[:200],
        "color": color
    }
    data = json.dumps(data)
    # requests.post("http://35.168.69.196:3000/logs", data=data,
    #              headers={"content-type": "application/json"})
    requests.post("http://127.0.0.1:3000/logs", data=data,
                  headers={"content-type": "application/json"})

    return "", 200


@app.route("/checkUser", methods=["POST"])
@cross_origin()
def checkUser():
    # try:

    username = request.get_json()["username"]
    password = request.get_json()["password"]

    data = requests.get(
        "http://127.0.0.1:3000/users?username={}".format(username))
    data.encoding = 'utf-8'  # Optional: requests infers this internally

    data = (json.loads(data.text))
    return(json.dumps(data))


@app.route("/createUser", methods=["POST"])
@cross_origin()
def createUser():
    # try:
    username = request.get_json()["username"]
    password = request.get_json()["password"]
    restrictLogs = request.get_json()["restrictLogs"]

    data = {
        "username": username,
        "password": password,
        "restrictLogs": restrictLogs
    }

    checkData = requests.post("http://127.0.0.1/checkUser", json=data)

    checkData = json.loads(checkData.content)

    if(len(checkData) == 0):
        requests.post("http://127.0.0.1:3000/users", data=json.dumps(data),
                      headers={"content-type": "application/json"})
        return "", 200
    else:
        return "", 400


@app.route("/getLogs", methods=["POST"])
@cross_origin()
def getLogs():
    # try:
    username = request.get_json()["username"]
    data = requests.get(
        "http://127.0.0.1:3000/logs?username={}".format(username))
    data.encoding = 'utf-8'  # Optional: requests infers this internally
    data = (json.loads(data.text))
    return(json.dumps(data))


@app.route("/clearLogs", methods=["POST"])
@cross_origin()
def clearLogs():
    # try:
    ID = request.get_json()["id"]
    username = request.get_json()["username"]
    password = request.get_json()["password"]
    restrictLogs = request.get_json()["restrictLogs"]

    data = {
        "id": ID,
        "username": username,
        "password": password,
        "restrictLogs": restrictLogs
    }
    data = json.dumps(data)
    requests.put("http://127.0.0.1:3000/users/{}".format(ID), data=data,
                 headers={"content-type": "application/json"})
    return "", 200


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=80)
    # app.run(debug=True)
