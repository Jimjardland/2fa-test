# Multi-factor authentication test

## to set up
```
docker-compose up

export DATABASE_URL=postgres://admin:U2DkSdPFrgVpkvvL3j4kePNc4@localhost/twofactortest
npm run migrate
npm start

```

## to test:

CreateUser:
```
curl -X POST \
  http://localhost:1339/create-user \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: c7af9d9e-5260-03fd-9a3e-11df0185ad24' \
  -d '{
	"username": "kendrick.lamar@yo.com",
	"password": "bestRapper"
}'
```


auth:
```
curl -X POST \
  http://localhost:1339/auth \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: 899c00a4-2b2a-3c66-bd75-3c06bc0950af' \
  -d '{
	"username": "kendrick.lamar@yo.com",
	"password": "bestRapper"
}'
```

validatePassword:
```
curl -X POST \
  http://localhost:1339/validate-password \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: c56bd03b-937b-f374-9201-92dce2aa3f24' \
  -d '{
	"username": "kendrick.lamar@yo.com",
	"password": "randomGeneratedFromConsole"
}'
```


