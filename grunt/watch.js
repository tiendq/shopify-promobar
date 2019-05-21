module.exports = {
  eslint: {
    files: [
      '*.js',
      'grunt/**/*.js',
      'server/**/*.js'
    ],
    tasks: ['eslint']
  },
  scss: {
    files: [
      'styles/**/*.scss'
    ],
    tasks: ['stylelint:all', 'sass:dev']
  },
};
