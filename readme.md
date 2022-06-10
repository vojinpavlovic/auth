#### Enviornment configuration
You need to setup your own enviornment configuration. You would need to create .env file in root, copy code block below and paste.
You need to define ```PORT``` where your auth server is going to listen, default is 3000. Then you would need to setup your redis store, for more information you can check out [Redis Github](https://github.com/redis/redis). There is three parameters ```REDIS_HOST``` default is 127.0.0.1 and ```REDIS_PORT``` that your redis cli listens to, default is 6379 and then you would need to pass your ```REDIS_PASS``` for authenticating with Redis. For storing user data I have used [MySQL](www.mysql.com). You have few params to assign in order to connect with your database. ```DB_HOST``` is a url/ip to your MySQL database, ```DB_PORT``` is port to your MySQL database, ```DB_USER``` is user that handles your database, ```DB_PASSWORD``` is your user auth credentials, then ```DB_DATABASE``` is your database table and ```DB_CONN_LIMIT``` is how maximum concurrent connections in pool can be accepted. For more information you can check [Nodejs MySQL Github](https://github.com/mysqljs/mysql). Since microservices communicate with message broker on AMQP protocol with [RabbitMQ](https://www.rabbitmq.com/) technology, you need to assign your ```AMQP_URL```. If you want quick start with RabbitMQ, there is cloud that hosts your RabbitMQ service for free. Check it out [CloudAMQP](https://www.cloudamqp.com/)

```
PORT=3000

REDIS_HOST="your_redis_host"
REDIS_PORT="your_redis_port"
REDIS_PASS="your_redis_password"

DB_CONN_LIMIT="your_db_limit"
DB_HOST="your_db_host"
DB_PORT="your_db_port"
DB_USER="your_db_user"
DB_PASSWORD="your_db_password"
DB_DATABASE="your_db_table"

AMQP_URL="your_amqp_url"
```

#### Dependencies
- [express](https://www.npmjs.com/package/express)
- [express-session](https://www.npmjs.com/package/express-session)
- [amqplib](https://www.npmjs.com/package/amqplib)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [redis](https://www.npmjs.com/package/redis)
- [connect-redis](https://www.npmjs.com/package/connect-redis)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [mysql](https://www.npmjs.com/package/mysql)
- [validator](https://www.npmjs.com/package/validator)
