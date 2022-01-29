module.exports = {
    css: {
        loaderOptions: {
          sass: {
            prependData: `@import "@/assets/styles/global.scss";`
          }
        }
    },
    publicPath: process.env.NODE_ENV === 'production'
    ? '/MYM/' // Thay tên repository của các bạn vào đây nhé
    : '/'
};

