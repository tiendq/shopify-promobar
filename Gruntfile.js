module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  let options = {
    config : {
      src: 'grunt/*.js'
    }
  };

  let config = require('load-grunt-configs')(grunt, options);
  grunt.initConfig(config);

  grunt.registerTask('dev', ['eslint', 'stylelint', 'sass:dev']);
  grunt.registerTask('dist', ['eslint', 'stylelint', 'sass:dist', 'postcss:dist']);
  grunt.registerTask('default', ['watch']);
};
