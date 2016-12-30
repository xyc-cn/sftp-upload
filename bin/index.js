var Client = require('ssh2-sftp-client');
var glob = require('glob');
function start(config,sftp){
	var connect = config.connent;
		function log(){
			if(config.log){
				console.log.apply(console,Array.prototype.slice.call(arguments,0))
			}
		}

	sftp.connect(connect).then(() => {
		return sftp.mkdir(config.remoteDir, true);
	}).then(() => {
		return new Promise(function(resolve, reject) {
			var dir = glob.sync('./'+config.dir+'/**/', {
				cwd: config.cwd
			});
			if(dir.length == 0){
				console.error('dir:"'+config.dir + '" no found');
				process.exit(5)
			}
			dir.forEach(function(entryPath, i) {
				if(entryPath){
					sftp.mkdir(config.remoteDir + entryPath.substr(2, entryPath.length), true)
					.then(() =>{
						if (i == dir.length-1) {
							resolve(null,true)
						}
					}).
					catch ((err) => {
						log('err entryDir:',entryPath)
						reject(err, 'entryPath:',entryPath);
					});
				}
			})
		})
			
	}).then(() =>{
		return new Promise(function(resolve, reject) {
			var dir = glob.sync('./'+config.dir+'/**', {
				cwd: config.cwd,
				nodir:true
			});
			if(dir.length == 0){
				console.log('dir:"'+config.dir + '" is empty');
				process.exit(5)
			}
			dir.forEach(function(entryPath, i) {
				if(entryPath){
					log('uploading:',entryPath)
					sftp.put(entryPath,config.remoteDir + entryPath.substr(2, entryPath.length)).then(() =>{
						log('upload succee:',entryPath)
						if (i == dir.length-1) {
							resolve(null,true)
						}
					}).catch ((err) => {
					log('upload err:',entryPath)
						reject(err, 'entryPath:',entryPath );
					});
				}
			})
		})
	})
	.then((data) => {
		if(!data){
			console.log('upload done')
			process.exit(0);
		}else{
			console.log(data)
			process.exit(1);
		}
		
	}).
	catch ((err) => {
		console.log(err);
	});
}

module.exports = {
	getInstance : function(config){
		var instance = new Client();
		instance.start = function(){
			start(config,instance)
		};
		return instance;
	}
}