// Generated by CoffeeScript 1.12.4

/*
  Generate Release
  Kevin Gravier
  MIT License
 */

(function() {
  var SpawnSync, isCommandAvailable, runner;

  SpawnSync = require('child_process').spawnSync;

  isCommandAvailable = function(cmd, opts) {
    var ret;
    ret = SpawnSync(cmd, opts, {
      stdio: 'ignore'
    });
    return ret.error == null;
  };

  runner = ((function() {
    if (isCommandAvailable('sh', ['--version'])) {
      return ['sh', ['-c']];
    } else if (isCommandAvailable('cmd.exe', ['/v'])) {
      return ['cmd', ['/s', '/v']];
    } else {
      throw new Error('Neither "sh" nor "cmd.exe" is available on your system.');
    }
  })());

  module.exports = function(command_string) {
    var ret;
    ret = SpawnSync(runner[0], runner[1].concat([command_string]), {
      stdio: 'pipe'
    });
    if (ret.error) {
      throw ret.error;
    }
    if (ret.status !== 0) {
      throw new Error("`" + command_string + "` returned " + ret.status + ". \n\n " + (ret.output.toString()));
    }
  };

}).call(this);
