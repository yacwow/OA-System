import { defineConfig } from 'umi';
const path = require('path')

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dva: { immer: true },
  alias: {
    utils: path.resolve(__dirname, './src/utils'),
    components: path.resolve(__dirname, './src/components')
  },
  dynamicImport: {
    loading: '@/components/loading',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  // ],
  fastRefresh: {},
  proxy: {
    '/api': {
      target: "http://127.0.0.1:7001",
      changeOrigin: true,
    }
  }
});
