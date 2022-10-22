// webpack require.context 方法提取模块内容

const requireApi=require.context('.',true,/.js$/)
// console.log(requireApi)
const module={}

requireApi.keys().forEach(element => {
    if(element==='./index.js'||element==='./http.js') return;
    Object.assign(module,requireApi(element))
});

export default module;