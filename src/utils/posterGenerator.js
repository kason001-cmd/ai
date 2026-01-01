/**
 * 海报生成工具函数
 */

/**
 * 生成海报图片并下载
 * @param {HTMLElement} element - 要转换为图片的DOM元素
 * @param {string} filename - 文件名
 */
export async function generatePoster(element, filename = 'soulmate-poster.png') {
  try {
    // 动态导入html2canvas
    const html2canvasModule = await import('html2canvas');
    const html2canvas = html2canvasModule.default || html2canvasModule;
    
    // 配置选项 - 优化海报生成质量
    const options = {
      backgroundColor: '#0a0a1a', // 深色背景
      scale: 3, // 提高清晰度（3倍缩放，生成高清图片）
      useCORS: true, // 允许跨域图片
      logging: false, // 关闭日志
      allowTaint: false, // 不允许跨域图片污染canvas
      width: element.offsetWidth,
      height: element.offsetHeight,
      windowWidth: element.offsetWidth,
      windowHeight: element.offsetHeight,
      removeContainer: false, // 保留容器
    };

    // 生成canvas
    const canvas = await html2canvas(element, options);
    
      // 转换为blob - 使用高质量设置
      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error('生成图片失败');
        }
        
        // 创建下载链接
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // 清理URL
        setTimeout(() => URL.revokeObjectURL(url), 100);
      }, 'image/png', 1.0); // 最高质量
    
    return true;
  } catch (error) {
    console.error('生成海报失败:', error);
    
    // 如果html2canvas未安装，提供降级方案
    if (error.message && error.message.includes('html2canvas')) {
      alert('请先安装html2canvas库：npm install html2canvas');
      return false;
    }
    
    throw error;
  }
}

/**
 * 生成海报数据URL（用于预览）
 * @param {HTMLElement} element - 要转换为图片的DOM元素
 * @returns {Promise<string>} 图片的data URL
 */
export async function generatePosterDataURL(element) {
  try {
    const html2canvasModule = await import('html2canvas');
    const html2canvas = html2canvasModule.default || html2canvasModule;
    
    const options = {
      backgroundColor: '#0f0c29',
      scale: 2,
      useCORS: true,
      logging: false,
      width: element.offsetWidth,
      height: element.offsetHeight,
    };

    const canvas = await html2canvas(element, options);
    return canvas.toDataURL('image/png', 0.95);
  } catch (error) {
    console.error('生成海报预览失败:', error);
    throw error;
  }
}

