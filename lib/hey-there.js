var busy = false;

var notifySpark = function(status, next){
  var url = [
    'https://api.spark.io/v1/devices/',
    process.env.SPARK_CORE_ID,
    '/updateState'
  ].join('');

  var params = [
    'access_token=',
    process.env.SPARK_CORE_TOKEN,
    '&params=',
    status
  ].join('');

  needle.post(url, params, next);
};


module.exports = function(io){
  return {
    statusUpdate : function(data){
      if(!busy){
        busy = true;

        io.sockets.emit('disable-buttons');
        notifySpark(data.status, function(err, res){
          busy = false;
          io.sockets.emit('enable-buttons');
        });
      }
    }
  };
};
