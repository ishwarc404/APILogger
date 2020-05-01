from flask import Flask, render_template, request, abort
import json
import re
import requests

app = Flask(__name__)


@app.route("/")
def main():
    return "Wonderful, it works."


@app.route("/logs", methods=["POST"])
def logit():
    # try:
    username = request.get_json()["username"]
    password = request.get_json()["password"]
    message = request.get_json()["message"]
    color = request.get_json()["color"]

    data = {
        "username": username,
        "password": password,
        "message": message,
        "color": color
    }
    data = json.dumps(data)
    requests.post("http://35.168.69.196:3000/logs", data=data,
                 headers={"content-type": "application/json"})
    
    return "200"

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True, port=80)

