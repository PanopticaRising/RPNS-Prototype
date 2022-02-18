from flask import Flask, request

# This allows us to use `flask run` when the FLASK_APP envar is set.
app = Flask(__name__)


@app.route("/")
def hello_world():
    return "<p>This is a development mock server and should not be used in production!</p>"


@app.route("/signup", methods=['POST'])
def sign_up():
    try:
        pet_id = request.form["pet_id"]
        pet_name = request.form["pet_name"]
        phone = request.form["phone"]
        name = request.form["full_name"]

        return {
            "success": True,
            "text": f"Congratulations {name}, you have subscribed {phone} for notifications about {pet_name}."
        }
    except Exception as e:
        print(f"Failed to parse request: {e}")
        return {
            "success": False,
            "text": "An error occurred. Please try again in a few moments."
        }
