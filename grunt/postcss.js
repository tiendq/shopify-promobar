module.exports = {
  dist: {
    options: {
      map: true,
      processors: [
        require('postcss-cachebuster')({
          cssPath: '/public/static/css'
        }),
        require('autoprefixer')({
          browsers: [
            'last 2 versions',
            'ie >= 11'
          ]
        }),
        require('cssnano')({
          discardUnused: {
            fontFace: false
          },
          zindex: false
        })
      ]
    },
    files: [{
      expand: true,
      cwd: 'build/css',
      src: ['*.css', '!*.min.css'],
      dest: 'public/static/css',
      ext: '.css'
    }]
  }
};
