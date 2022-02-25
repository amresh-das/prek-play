var ftpClient = require('/Users/dasa/experiments/prek-play/node_modules/ftp-client/lib/client.js'),
  config = {
    host: 'altlearner.org',
    port: 21,
    user: 'admin@altlearner.org',
    password: 'A@ssw0rdltlearner'
  },
  options = {
    logging: 'basic'
  },
  client = new ftpClient(config, options);

client.connect(function () {
  console.log('Connected');
  client.upload(['dist/prek-play/index.html'], '/', {
    baseDir: 'dist/',
    overwrite: 'older'
  }, function (result) {
    console.log(result);
  });
});
