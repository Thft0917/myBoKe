
// 创建 axios 实例
const service = axios.create({
  baseURL: 'https://pxmniubi09.top', // 接口的基础地址，可以配置为环境变量
  timeout: 5000, // 请求超时的时间
});

// 生成签名的函数
function generateSignature({ method, path, timestamp, body, secret }) {
  const data = `${method}:${path}:${timestamp}:${body || ''}`;
  return CryptoJS.HmacSHA256(data, secret).toString(CryptoJS.enc.Hex);
}


// 设置拦截器，在请求发送前生成签名
service.interceptors.request.use((config) => {
  console.log('config.url',config.url)
  const method = config.method.toUpperCase(); // 请求方法
  const path = config.url.match(/(?<path>.+)\?/)?.groups.path ? config.url.match(/(?<path>.+)\?/).groups.path : config.url // 请求路径
  const timestamp = Math.floor(Date.now() / 1000); // 当前时间戳（秒级）
  const secret = 'pxm'; // 与服务器共享的密钥
 
  console.log('path',path)
  // GET 请求通常没有请求体，POST 请求则可能有请求体
  const body = method === 'GET' ? '' : JSON.stringify(config.data);

  // 生成签名
  const signature = generateSignature({ secret,timestamp,method,path,body });

  // 将签名和时间戳添加到请求头（也可以添加到查询参数中）
  config.headers['signature'] = signature;
  config.headers['timestamp'] = timestamp;

  console.log('请求头',config.headers)

  return config; // 返回修改后的配置
}, (error) => {
  // 请求错误处理
  return Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应数据做处理
    const res = response.data;
    return res
  },
  (error) => {
    return Promise.reject(error);
  }
);

