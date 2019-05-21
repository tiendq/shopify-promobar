module.exports = {
  options: {
    sourceMap: true,
    sourceComments: true,
    outputStyle: 'expanded'
  },
  dev: {
    files: {
      'public/static/css/promo.css': 'styles/client/promo.scss',
      'public/static/css/admin.css': 'styles/admin.scss'
    }
  },
  dist: {
    files: {
      'build/css/promo.css': 'styles/client/promo.scss',
      'build/css/admin.css': 'styles/admin.scss'
    }
  }
};
