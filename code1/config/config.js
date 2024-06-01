module.exports = {
    // configure the code below with your username, password and mlab database information
    database: 'mongodb://meanauthapp:auth123@ds117431.mlab.com:17431/meanauthapp',   //prod
    //database: 'mongodb://localhost:27017/meanauth',    //dev
    secret: 'yoursecret',
    port: 3500,
    redis_url : "redis://127.0.0.1:6379/"
}
  