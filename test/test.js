var config = {
	connent:{
		host: '192.168.1.2',
		port: '22',
		username: 'root',
		password: 'root',
		//privateKey: require('fs').readFileSync('/here/is/my/key')
	},
	log:true,
	cwd:'./',
	dir:'src',
	remoteDir:'/data/home/easonxie/test/'
};

var upload = require('../bin/index')

var instance = upload.getInstance(config);

instance.start();
