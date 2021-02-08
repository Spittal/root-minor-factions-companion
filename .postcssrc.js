const breakpoints = {
  sm: '768px',
  md: '1024px',
  lg: '1440px',
}

module.exports = {
  plugins: [
    require('postcss-import')({
      path: ['src']
    }),
    require('postcss-preset-env')({
      importFrom: [{
        customMedia: {
          '--breakpoint-not-small': `screen and (min-width: ${breakpoints.sm})`,
          '--breakpoint-medium': `screen and (min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.md})`,
          '--breakpoint-large': `screen and (min-width: ${breakpoints.md})`,
        }
      }],
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
      }
    }),
  ]
};
