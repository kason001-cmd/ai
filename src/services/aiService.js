/**
 * AI服务 - 调用AI API生成灵魂伴侣预测结果
 */

/**
 * 调用AI API生成分析结果
 * @param {Object} formData - 用户填写的表单数据
 * @returns {Promise<Object>} 分析结果
 */
export async function generateAIResult(formData) {
  console.log('=== AI 分析开始 ===');
  console.log('📝 输入的表单数据:', JSON.stringify(formData, null, 2));
  
  try {
    // 构建提示词
    const prompt = buildPrompt(formData);
    console.log('📋 构建的提示词:');
    console.log('─'.repeat(50));
    console.log(prompt);
    console.log('─'.repeat(50));
    
    // 调用阿里百炼API（通过代理避免CORS问题）
    const apiKey = import.meta.env.VITE_DASHSCOPE_API_KEY || import.meta.env.VITE_OPENAI_API_KEY;
    // 使用代理路径，避免CORS问题
    const apiUrl = import.meta.env.VITE_AI_API_URL || '/api/text-generation';
    const model = import.meta.env.VITE_AI_MODEL || 'qwen-turbo';
    
    if (!apiKey) {
      console.warn('⚠️  未配置AI API密钥，使用模拟数据');
      const mockResult = generateMockResult(formData);
      console.log('📊 生成的模拟结果:', JSON.stringify(mockResult, null, 2));
      console.log('=== AI 分析结束（使用模拟数据）===');
      return mockResult;
    }
    
    console.log('🔑 API密钥已配置');
    console.log('🌐 API地址:', apiUrl);
    console.log('🤖 使用模型:', model);

    // 构建完整的提示词（包含系统提示）
    const fullPrompt = `你是一个专业的灵魂伴侣预测AI，擅长根据用户的个人信息和偏好，生成有趣、温暖、富有想象力的预测结果。请用中文回答，语气要温暖友好。

${prompt}`;

    const requestBody = {
      model: model,
      input: {
        messages: [
          {
            role: 'user',
            content: fullPrompt
          }
        ]
      },
      parameters: {
        temperature: 0.8,
        max_tokens: 2000,
        result_format: 'message'
      }
    };
    
    console.log('📤 发送API请求...');
    console.log('📦 请求参数:', JSON.stringify({
      ...requestBody,
      input: {
        ...requestBody.input,
        messages: requestBody.input.messages.map(msg => ({
          ...msg,
          content: msg.content.substring(0, 100) + '...' // 只显示前100个字符
        }))
      }
    }, null, 2));
    console.log('🔑 API密钥:', apiKey ? `${apiKey.substring(0, 10)}...` : '未配置');
    
    // 如果使用代理路径，将API密钥放在请求头中，由代理服务器转发
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // 判断是否使用代理（以 /api/ 开头的路径使用代理）
    if (apiUrl.startsWith('/api/')) {
      headers['X-API-Key'] = apiKey;
    } else {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });

    console.log('📥 API响应状态:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API调用失败:', errorText);
      throw new Error(`AI API调用失败: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ API调用成功');
    console.log('📊 API返回数据:', JSON.stringify(data, null, 2));
    
    // 阿里百炼的响应格式：data.output.choices[0].message.content
    let aiResponse = '';
    if (data.output?.choices?.[0]?.message?.content) {
      aiResponse = data.output.choices[0].message.content;
    } else if (data.output?.text) {
      aiResponse = data.output.text;
    } else if (data.choices?.[0]?.message?.content) {
      // 兼容OpenAI格式
      aiResponse = data.choices[0].message.content;
    } else {
      console.error('❌ 无法解析API响应:', data);
      throw new Error('API响应格式不正确');
    }
    
    console.log('🤖 AI原始响应:');
    console.log('─'.repeat(50));
    console.log(aiResponse);
    console.log('─'.repeat(50));
    
    // 解析AI返回的JSON结果
    const parsedResult = parseAIResponse(aiResponse, formData);
    console.log('📋 解析后的结果:', JSON.stringify(parsedResult, null, 2));
    
    // 根据画像描述生成图片
    if (parsedResult.imageDescription) {
      console.log('🎨 开始生成画像...');
      try {
        const imageUrl = await generateImage(parsedResult.imageDescription);
        parsedResult.imageUrl = imageUrl;
        console.log('✅ 画像生成成功:', imageUrl);
      } catch (imageError) {
        console.error('❌ 画像生成失败:', imageError);
        console.warn('⚠️  继续使用文本描述，不显示图片');
      }
    }
    
    console.log('=== AI 分析结束 ===');
    return parsedResult;
    
  } catch (error) {
    console.error('❌ AI API调用错误:', error);
    console.error('错误详情:', error.message);
    console.log('🔄 使用降级方案（模拟数据）...');
    // 如果API调用失败，返回模拟数据作为降级方案
    const fallbackResult = generateMockResult(formData);
    console.log('📊 降级方案结果:', JSON.stringify(fallbackResult, null, 2));
    console.log('=== AI 分析结束（使用降级方案）===');
    return fallbackResult;
  }
}

/**
 * 构建发送给AI的提示词
 */
function buildPrompt(formData) {
  const { gender, birthDate, zodiac, personality, keywords } = formData;
  
  const personalityDesc = `
    - 内向/外向倾向: ${personality.introvert < 50 ? '偏内向' : '偏外向'} (${personality.introvert}%)
    - 感性/理性倾向: ${personality.emotional < 50 ? '偏感性' : '偏理性'} (${personality.emotional}%)
  `;
  
  return `请根据以下用户信息，生成一个有趣的灵魂伴侣预测结果。要求：

用户信息：
- 性别: ${gender}
- 出生日期: ${birthDate}
- 星座: ${zodiac}
- 性格倾向:
${personalityDesc}
- 理想型关键词: ${keywords.join('、')}

请生成一个JSON格式的结果，包含以下字段：
{
  "title": "你的命定恋人是：[一个富有诗意的称号，如'温润如玉的守护者']",
  "description": "[一段200字左右的性格描述，要温暖、细腻、有画面感]",
  "tip": "[一条相遇小贴士，告诉用户在哪里可能遇到Ta]",
  "imageDescription": "[一段详细的人物画像描述，100-150字，包括：外貌特征（脸型、眼睛、发型、身材等）、气质风格、穿着打扮、整体印象。要生动具体，能够让人在脑海中形成清晰的画面，符合前面描述的性格特点。描述要适合用于AI图片生成，使用具体、视觉化的语言]",
  "radar": {
    "颜值": [70-100之间的随机整数],
    "财富": [60-100之间的随机整数],
    "情绪价值": [75-100之间的随机整数],
    "契合度": [80-100之间的随机整数],
    "性格互补": [70-100之间的随机整数]
  }
}

重要提示：
1. imageDescription 字段必须详细描述人物的外貌特征，要具体生动，能够用于生成人物画像
2. 画像描述应该与性格描述和称号保持一致
3. 请确保返回的是有效的JSON格式，不要包含任何额外的文字说明。`;
}

/**
 * 解析AI返回的响应
 */
function parseAIResponse(aiResponse, formData) {
  console.log('🔍 开始解析AI响应...');
  try {
    // 尝试提取JSON部分（AI可能会在JSON前后添加说明文字）
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      console.log('✅ 找到JSON匹配:', jsonMatch[0].substring(0, 200) + '...');
      const result = JSON.parse(jsonMatch[0]);
      console.log('✅ JSON解析成功');
      
      // 验证并补充必要字段
      const parsedResult = {
        title: result.title || `你的命定恋人是：${generateTitle()}`,
        description: result.description || generateDescription(),
        tip: result.tip || generateTip(),
        imageDescription: result.imageDescription || generateImageDescription(),
        imageUrl: null, // 将在后续步骤中生成
        radar: result.radar || generateRadarData()
      };
      
      // 检查是否有字段缺失
      if (!result.title) console.warn('⚠️  标题字段缺失，使用默认值');
      if (!result.description) console.warn('⚠️  描述字段缺失，使用默认值');
      if (!result.tip) console.warn('⚠️  小贴士字段缺失，使用默认值');
      if (!result.imageDescription) console.warn('⚠️  画像描述字段缺失，使用默认值');
      if (!result.radar) console.warn('⚠️  雷达图数据缺失，使用默认值');
      
      return parsedResult;
    } else {
      console.warn('⚠️  未找到JSON格式的响应');
    }
  } catch (error) {
    console.error('❌ 解析AI响应失败:', error);
    console.error('错误详情:', error.message);
  }
  
  // 如果解析失败，使用模拟数据
  console.log('🔄 解析失败，使用模拟数据');
  return generateMockResult(formData);
}

/**
 * 生成模拟结果（作为降级方案）
 */
function generateMockResult(formData) {
  const titles = [
    '温润如玉的守护者',
    '阳光活力的冒险家',
    '知性优雅的学者',
    '神秘高冷的艺术家',
    '幽默风趣的开心果',
    '温柔体贴的治愈系',
  ];
  
  const tips = [
    'Ta 可能会在雨天的图书馆出现',
    'Ta 喜欢在咖啡厅的窗边位置看书',
    'Ta 经常出现在周末的公园里',
    'Ta 会在艺术展览的角落静静欣赏',
    'Ta 喜欢在书店的文学区徘徊',
    'Ta 可能在音乐节的舞台前等待',
  ];

  const descriptions = [
    'Ta 是一个内心温暖而细腻的人，像春天的阳光一样和煦。在人群中可能不太起眼，但一旦深入交流，你会发现 Ta 有着丰富的内心世界和独特的见解。Ta 喜欢安静的环境，但也享受偶尔的热闹。',
    'Ta 充满活力和好奇心，总是对世界保持着探索的热情。性格开朗外向，能够轻松地与人建立联系。Ta 喜欢尝试新事物，但也懂得在适当的时候放慢脚步，享受生活的美好。',
    'Ta 是一个理性而优雅的人，喜欢深度思考和哲学讨论。虽然外表可能显得高冷，但内心其实很温暖。Ta 重视精神层面的交流，追求灵魂的契合。',
  ];

  const randomTitle = titles[Math.floor(Math.random() * titles.length)];
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];

  return {
    title: `你的命定恋人是：${randomTitle}`,
    description: randomDesc,
    tip: randomTip,
    imageDescription: generateImageDescription(),
    imageUrl: null, // 模拟数据不生成图片
    radar: {
      颜值: Math.floor(Math.random() * 30) + 70,
      财富: Math.floor(Math.random() * 30) + 60,
      情绪价值: Math.floor(Math.random() * 30) + 75,
      契合度: Math.floor(Math.random() * 30) + 80,
      性格互补: Math.floor(Math.random() * 30) + 70,
    }
  };
}

/**
 * 辅助函数：生成标题
 */
function generateTitle() {
  const titles = [
    '温润如玉的守护者',
    '阳光活力的冒险家',
    '知性优雅的学者',
    '神秘高冷的艺术家',
    '幽默风趣的开心果',
    '温柔体贴的治愈系',
  ];
  return titles[Math.floor(Math.random() * titles.length)];
}

/**
 * 辅助函数：生成描述
 */
function generateDescription() {
  const descriptions = [
    'Ta 是一个内心温暖而细腻的人，像春天的阳光一样和煦。在人群中可能不太起眼，但一旦深入交流，你会发现 Ta 有着丰富的内心世界和独特的见解。Ta 喜欢安静的环境，但也享受偶尔的热闹。',
    'Ta 充满活力和好奇心，总是对世界保持着探索的热情。性格开朗外向，能够轻松地与人建立联系。Ta 喜欢尝试新事物，但也懂得在适当的时候放慢脚步，享受生活的美好。',
    'Ta 是一个理性而优雅的人，喜欢深度思考和哲学讨论。虽然外表可能显得高冷，但内心其实很温暖。Ta 重视精神层面的交流，追求灵魂的契合。',
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

/**
 * 辅助函数：生成小贴士
 */
function generateTip() {
  const tips = [
    'Ta 可能会在雨天的图书馆出现',
    'Ta 喜欢在咖啡厅的窗边位置看书',
    'Ta 经常出现在周末的公园里',
    'Ta 会在艺术展览的角落静静欣赏',
    'Ta 喜欢在书店的文学区徘徊',
    'Ta 可能在音乐节的舞台前等待',
  ];
  return tips[Math.floor(Math.random() * tips.length)];
}

/**
 * 辅助函数：生成画像描述
 */
function generateImageDescription() {
  const descriptions = [
    'Ta 有着温和的鹅蛋脸，眼睛清澈明亮，像星星一样闪烁。柔顺的棕色中长发，自然垂落在肩头。身材匀称，气质温文尔雅。常穿着简约舒适的浅色系服装，整体给人一种温暖亲切的感觉。',
    'Ta 拥有阳光般的笑容，五官立体分明，眼神充满活力。短发利落，身材高挑健硕。喜欢穿着休闲运动风格的衣服，色彩明亮，整体散发着青春活力的气息。',
    'Ta 面容清秀，眼神深邃而智慧，戴着一副细框眼镜。发型整齐，身材修长。穿着简约优雅，偏爱深色系或中性色调，整体气质知性而内敛，散发着书卷气息。',
    'Ta 有着精致的五官，眼神神秘而迷人，长发飘逸。身材纤细，气质独特。穿着风格偏向艺术感，喜欢有设计感的服装，整体给人一种高冷而优雅的印象。',
    'Ta 面容亲切，眼睛弯弯的总是带着笑意，发型随意自然。身材适中，举止轻松。穿着风格活泼有趣，喜欢有图案或亮色的衣服，整体散发着幽默风趣的魅力。',
    'Ta 有着柔和的面部轮廓，眼神温柔如水，长发如丝。身材娇小，气质甜美。穿着风格偏向可爱温柔，喜欢粉色、白色等柔和的颜色，整体给人一种治愈系的感觉。',
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

/**
 * 辅助函数：生成雷达图数据
 */
function generateRadarData() {
  return {
    颜值: Math.floor(Math.random() * 30) + 70,
    财富: Math.floor(Math.random() * 30) + 60,
    情绪价值: Math.floor(Math.random() * 30) + 75,
    契合度: Math.floor(Math.random() * 30) + 80,
    性格互补: Math.floor(Math.random() * 30) + 70,
  };
}

/**
 * 根据画像描述生成图片（使用DALL-E API）
 * @param {string} imageDescription - 画像描述文本（中文）
 * @returns {Promise<string>} 图片URL
 */
async function generateImage(imageDescription) {
  const apiKey = import.meta.env.VITE_DASHSCOPE_API_KEY || import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('未配置API密钥，无法生成图片');
  }
  
  // 直接使用中文描述生成图片，不需要转换为英文
  console.log('🎨 使用中文描述生成图片...');
  console.log('📝 画像描述:', imageDescription);
  
  try {
    console.log('📤 调用阿里百炼图片生成API...');
    // 使用代理路径避免CORS问题
    const imageApiUrl = '/api/image-generation';
    
    const headers = {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey, // 通过代理转发
    };
    
    // 阿里百炼图片生成API的正确格式（根据官方文档示例）
    // 使用 input.messages 格式，content 是数组包含 text 字段
    const requestBody = {
      model: 'z-image-turbo',
      input: {
        messages: [
          {
            role: 'user',
            content: [
              {
                text: `帮我生成一张人物画像：${imageDescription}。要求：真实、高质量、专业摄影风格，柔和光线，温暖氛围，人物看起来友好亲切，背景柔和模糊，中性色调。`
              }
            ]
          }
        ]
      },
      parameters: {
        prompt_extend: false,
        negative_prompt: '',
        size: '1024*1024'
      }
    };
    
    console.log('📦 图片生成请求体:', JSON.stringify(requestBody, null, 2));
    console.log('🔍 使用格式: { model, input: { messages: [{ role, content: [{ text }] }] }, parameters }');
    
    const response = await fetch(imageApiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ 图片生成API调用失败:', errorText);
      
      // 尝试解析错误信息，提供更详细的错误提示
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.message && errorData.message.includes('messages')) {
          console.error('💡 错误提示：API可能期望不同的请求格式');
          console.error('💡 当前使用格式：model + input.prompt + parameters');
          console.error('💡 请检查阿里百炼文档确认正确的请求格式');
        }
      } catch (e) {
        // 忽略解析错误
      }
      
      throw new Error(`图片生成失败: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('📊 图片生成API返回数据:', JSON.stringify(data, null, 2));
    
    // 阿里百炼的响应格式：根据文档，可能是多种格式
    let imageUrl = null;
    
    // 尝试多种可能的响应格式
    if (data.output?.results?.[0]?.url) {
      imageUrl = data.output.results[0].url;
    } else if (data.output?.choices?.[0]?.message?.content?.[0]?.image) {
      imageUrl = data.output.choices[0].message.content[0].image;
    } else if (data.output?.url) {
      imageUrl = data.output.url;
    } else if (data.data?.[0]?.url) {
      imageUrl = data.data[0].url;
    }
    
    if (!imageUrl) {
      console.error('❌ 无法从响应中提取图片URL，响应结构:', JSON.stringify(data, null, 2));
      throw new Error('图片生成成功但未获取到图片URL');
    }
    
    console.log('✅ 图片生成成功，URL:', imageUrl);
    return imageUrl;
    
  } catch (error) {
    console.error('❌ 图片生成错误:', error);
    throw error;
  }
}

// 注意：已移除 translateDescriptionToImagePrompt 函数
// 现在直接使用中文描述生成图片，不需要转换为英文

/**
 * 分析用户的性格和心理状态
 * @param {string} userText - 用户输入的关于自己的描述
 * @returns {Promise<Object>} 分析结果
 */
export async function analyzePersonality(userText) {
  console.log('=== 性格心理分析开始 ===');
  console.log('📝 用户输入:', userText);
  
  try {
    // 构建提示词
    const prompt = `请根据用户提供的自我描述，进行深度的性格和心理状态分析。要求：

用户描述：
${userText}

请生成一个JSON格式的分析结果，包含以下字段：
{
  "personalityTraits": "[详细分析用户的性格特点，包括性格类型、行为模式、思维特点等，200-300字]",
  "mentalState": "[分析用户当前的心理状态，包括情绪状态、压力水平、心理需求等，200-300字]",
  "suggestions": "[基于分析结果，给出针对性的建议和指导，帮助用户更好地了解自己、调整心态、改善状态，200-300字]",
  "summary": "[一段简洁的总结，概括用户的核心性格特征和当前状态，100-150字]"
}

重要提示：
1. 分析要深入、专业、有洞察力
2. 语气要温暖、理解、支持性
3. 建议要实用、具体、可操作
4. 请确保返回的是有效的JSON格式，不要包含任何额外的文字说明。`;

    // 调用阿里百炼API（通过代理避免CORS问题）
    const apiKey = import.meta.env.VITE_DASHSCOPE_API_KEY || import.meta.env.VITE_OPENAI_API_KEY;
    const apiUrl = import.meta.env.VITE_AI_API_URL || '/api/text-generation';
    const model = import.meta.env.VITE_AI_MODEL || 'qwen-turbo';
    
    if (!apiKey) {
      console.warn('⚠️  未配置AI API密钥，使用模拟数据');
      const mockResult = generateMockPersonalityResult(userText);
      console.log('📊 生成的模拟结果:', JSON.stringify(mockResult, null, 2));
      console.log('=== 性格心理分析结束（使用模拟数据）===');
      return mockResult;
    }
    
    console.log('🔑 API密钥已配置');
    console.log('🌐 API地址:', apiUrl);
    console.log('🤖 使用模型:', model);

    // 构建完整的提示词（包含系统提示）
    const fullPrompt = `你是一个专业的心理分析师，擅长通过用户的自我描述，深入分析其性格特点、心理状态，并提供专业的建议和指导。请用中文回答，语气要温暖、理解、支持性。

${prompt}`;

    const requestBody = {
      model: model,
      input: {
        messages: [
          {
            role: 'user',
            content: fullPrompt
          }
        ]
      },
      parameters: {
        temperature: 0.8,
        max_tokens: 3000,
        result_format: 'message'
      }
    };
    
    console.log('📤 发送API请求...');
    console.log('📦 请求参数:', JSON.stringify({
      ...requestBody,
      input: {
        ...requestBody.input,
        messages: requestBody.input.messages.map(msg => ({
          ...msg,
          content: msg.content.substring(0, 100) + '...' // 只显示前100个字符
        }))
      }
    }, null, 2));
    
    // 如果使用代理路径，将API密钥放在请求头中，由代理服务器转发
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // 判断是否使用代理（以 /api/ 开头的路径使用代理）
    if (apiUrl.startsWith('/api/')) {
      headers['X-API-Key'] = apiKey;
    } else {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody)
    });

    console.log('📥 API响应状态:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ API调用失败:', errorText);
      throw new Error(`AI API调用失败: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ API调用成功');
    console.log('📊 API返回数据:', JSON.stringify(data, null, 2));
    
    // 阿里百炼的响应格式：data.output.choices[0].message.content
    let aiResponse = '';
    if (data.output?.choices?.[0]?.message?.content) {
      aiResponse = data.output.choices[0].message.content;
    } else if (data.output?.text) {
      aiResponse = data.output.text;
    } else if (data.choices?.[0]?.message?.content) {
      // 兼容OpenAI格式
      aiResponse = data.choices[0].message.content;
    } else {
      console.error('❌ 无法解析API响应:', data);
      throw new Error('API响应格式不正确');
    }
    
    console.log('🤖 AI原始响应:');
    console.log('─'.repeat(50));
    console.log(aiResponse);
    console.log('─'.repeat(50));
    
    // 解析AI返回的JSON结果
    const parsedResult = parsePersonalityResponse(aiResponse, userText);
    console.log('📋 解析后的结果:', JSON.stringify(parsedResult, null, 2));
    
    console.log('=== 性格心理分析结束 ===');
    return parsedResult;
    
  } catch (error) {
    console.error('❌ AI API调用错误:', error);
    console.error('错误详情:', error.message);
    console.log('🔄 使用降级方案（模拟数据）...');
    // 如果API调用失败，返回模拟数据作为降级方案
    const fallbackResult = generateMockPersonalityResult(userText);
    console.log('📊 降级方案结果:', JSON.stringify(fallbackResult, null, 2));
    console.log('=== 性格心理分析结束（使用降级方案）===');
    return fallbackResult;
  }
}

/**
 * 解析性格心理分析的AI响应
 */
function parsePersonalityResponse(aiResponse, userText) {
  console.log('🔍 开始解析AI响应...');
  try {
    // 尝试提取JSON部分（AI可能会在JSON前后添加说明文字）
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      console.log('✅ 找到JSON匹配:', jsonMatch[0].substring(0, 200) + '...');
      const result = JSON.parse(jsonMatch[0]);
      console.log('✅ JSON解析成功');
      
      // 验证并补充必要字段
      const parsedResult = {
        personalityTraits: result.personalityTraits || generateMockPersonalityTraits(),
        mentalState: result.mentalState || generateMockMentalState(),
        suggestions: result.suggestions || generateMockSuggestions(),
        summary: result.summary || generateMockSummary()
      };
      
      // 检查是否有字段缺失
      if (!result.personalityTraits) console.warn('⚠️  性格特点字段缺失，使用默认值');
      if (!result.mentalState) console.warn('⚠️  心理状态字段缺失，使用默认值');
      if (!result.suggestions) console.warn('⚠️  建议字段缺失，使用默认值');
      if (!result.summary) console.warn('⚠️  总结字段缺失，使用默认值');
      
      return parsedResult;
    } else {
      console.warn('⚠️  未找到JSON格式的响应');
    }
  } catch (error) {
    console.error('❌ 解析AI响应失败:', error);
    console.error('错误详情:', error.message);
  }
  
  // 如果解析失败，使用模拟数据
  console.log('🔄 解析失败，使用模拟数据');
  return generateMockPersonalityResult(userText);
}

/**
 * 生成模拟的性格心理分析结果（作为降级方案）
 */
function generateMockPersonalityResult(userText) {
  return {
    personalityTraits: generateMockPersonalityTraits(),
    mentalState: generateMockMentalState(),
    suggestions: generateMockSuggestions(),
    summary: generateMockSummary()
  };
}

/**
 * 辅助函数：生成模拟的性格特点
 */
function generateMockPersonalityTraits() {
  return `根据你的描述，你展现出了较为内敛的性格特点。你倾向于在安静的环境中思考和工作，这让你能够更深入地理解自己和周围的世界。你重视内心的平静，但也渴望与他人建立有意义的联系。

你的思维模式偏向理性和深度，喜欢在行动前仔细思考。这种特质让你在决策时更加谨慎，但也可能让你在某些情况下显得犹豫不决。你对自己的要求较高，追求完美，这既是你的优点，也可能成为压力的来源。`;
}

/**
 * 辅助函数：生成模拟的心理状态
 */
function generateMockMentalState() {
  return `从你的描述中可以看出，你目前处于一种较为复杂的情感状态。一方面，你对自己的生活有清晰的认知和目标；另一方面，你也感受到了一定的压力和焦虑。

这种状态是正常的，特别是在面对工作、学习或人际关系中的挑战时。你正在努力调整自己的心态，这说明你具备良好的自我觉察能力和成长意愿。你需要在保持努力的同时，也要学会给自己一些放松和休息的空间。`;
}

/**
 * 辅助函数：生成模拟的建议
 */
function generateMockSuggestions() {
  return `1. **保持平衡**：在追求目标的同时，记得给自己留出休息和放松的时间。适当的休息有助于提高效率和保持心理健康。

2. **建立支持系统**：虽然你比较内向，但不要完全孤立自己。尝试与信任的朋友或家人分享你的感受，他们的支持会让你感到更有力量。

3. **练习自我关怀**：每天花一些时间做自己喜欢的事情，无论是阅读、听音乐还是简单的散步，都能帮助你缓解压力。

4. **设定合理期望**：不要对自己过于苛刻，接受自己的不完美，给自己一些成长的空间和时间。`;
}

/**
 * 辅助函数：生成模拟的总结
 */
function generateMockSummary() {
  return `你是一个内敛而深思的人，具备良好的自我觉察能力。虽然目前面临一些压力和挑战，但你正在积极地调整和成长。记住，保持内心的平衡，给自己一些空间和时间，你会找到属于自己的节奏和方式。`;
}

