import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // 代理文本生成API
      '/api/text-generation': {
        target: 'https://dashscope.aliyuncs.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/text-generation/, '/api/v1/services/aigc/text-generation/generation'),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // 从请求头中获取API密钥
            const apiKey = req.headers['x-api-key'];
            if (apiKey) {
              proxyReq.setHeader('Authorization', `Bearer ${apiKey}`);
              proxyReq.removeHeader('x-api-key');
            }
          });
        },
      },
      // 代理图片生成API
      '/api/image-generation': {
        target: 'https://dashscope.aliyuncs.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/image-generation/, '/api/v1/services/aigc/multimodal-generation/generation'),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // 从请求头中获取API密钥
            const apiKey = req.headers['x-api-key'];
            if (apiKey) {
              proxyReq.setHeader('Authorization', `Bearer ${apiKey}`);
              proxyReq.removeHeader('x-api-key');
            }
          });
        },
      },
    },
  },
})

