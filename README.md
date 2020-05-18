# project-logger
This software, when deployed online, can be used as a simple API logging service.
The user just needs to make a simple post call to the specified deployedd IP and then 
watch it appear on the website.

The user can create an account and then make calls like this.

```
import json
import requests
data = {
        "username": username,
        "password": password,
        "message": "this is a test message",
        "color": "yellow"
    }
data = json.dumps(data)
requests.post("http://52.7.127.128/logs", data=data)
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
