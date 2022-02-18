# Mock backend server

This is a simple backend server to support the demo of this frontend notification signup sheet.

## Usage

### Powershell
```
$env:FLASK_APP = "server"
$env:FLASK_ENV = "development"
flask run
```

By default, this flask app is accessible via `localhost:5000`.

Please refer to the [Flask documentation](https://flask.palletsprojects.com/en/2.0.x/quickstart/#a-minimal-application) for instructions on using other CLI/OSes.
