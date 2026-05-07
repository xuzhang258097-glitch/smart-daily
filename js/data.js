const newsData = {
  ai: [
    { id: 'ai-1', title: 'OpenAI 发布 GPT-5 预览版：多模态推理能力大幅提升', summary: 'OpenAI 今日发布了 GPT-5 的预览版本，新模型在数学推理、代码生成和视觉理解方面均有显著提升，支持更长的上下文窗口（最高 200 万 token）。', content: 'OpenAI 于今日正式发布了 GPT-5 的预览版本，这是继 GPT-4 之后的又一次重大飞跃。新模型在多个关键领域实现了突破：\n\n1. **多模态推理能力**：GPT-5 能够同时处理文本、图像、音频和视频输入，并在不同模态之间进行深度推理。例如，用户可以上传一张电路图，模型不仅能识别元件，还能分析电路工作原理并指出潜在问题。\n\n2. **数学与代码能力**：在 GSM8K 数学推理基准测试中，GPT-5 的准确率达到 98.7%，较 GPT-4 的 92% 有大幅提升。在 HumanEval 代码生成测试中，通过率从 67% 提升至 89%。\n\n3. **上下文窗口**：支持最高 200 万 token 的上下文窗口，这意味着用户可以将整本书、完整的代码库或长篇研究报告一次性输入，模型能够保持连贯的理解和记忆。\n\n4. **安全性提升**：引入了"宪法 AI"机制，模型在生成回答前会进行自我审查，确保输出符合安全准则，有害内容生成率降低 85%。\n\nOpenAI 表示，GPT-5 的完整版本将于 2026 年第三季度向公众开放，API 价格将与 GPT-4 持平。', category: 'AI 技术', source: 'OpenAI Blog', date: '2026-04-29', icon: '🧠', url: 'https://openai.com/blog', readTime: '5 分钟', isHot: true },
    { id: 'ai-2', title: 'Google DeepMind 推出 AlphaFold 4：蛋白质结构预测再突破', summary: 'DeepMind 团队发布了 AlphaFold 最新版本，能够预测蛋白质-蛋白质相互作用复合物结构，为药物研发开辟新路径。', content: 'Google DeepMind 团队今日发布了 AlphaFold 4，这是蛋白质结构预测领域的又一次重大突破。与前几代相比，AlphaFold 4 在以下方面实现了质的飞跃：\n\n**核心突破**：\n- **复合物预测**：不仅能预测单个蛋白质的三维结构，还能精确预测蛋白质-蛋白质、蛋白质-DNA、蛋白质-小分子之间的相互作用复合物结构，准确率达到 92%。\n- **动态构象**：首次能够预测蛋白质在不同生理条件下的动态构象变化，这对于理解蛋白质功能和药物设计至关重要。\n- **膜蛋白预测**：针对药物靶点中最重要的膜蛋白类别，预测准确率从 60% 提升至 85%。\n\n**应用前景**：\nDeepMind 已与辉瑞、罗氏等 20 家制药公司建立合作，利用 AlphaFold 4 加速新药研发。据估计，该技术可将药物发现阶段的时间从 3-5 年缩短至 1-2 年，研发成本降低 40%。\n\n**开放获取**：\nDeepMind 承诺将 AlphaFold 4 的预测结果免费向全球科研机构开放，目前已有超过 200 万研究人员使用该数据库。', category: 'AI 技术', source: 'Nature', date: '2026-04-28', icon: '🧬', url: 'https://www.nature.com', readTime: '8 分钟', isHot: true },
    { id: 'ai-3', title: 'Meta 开源 Llama 4：支持 128K 上下文的多语言大模型', summary: 'Meta 发布 Llama 4 系列模型，包括 8B、70B 和 405B 三个版本，支持中文、英文等 200 多种语言，性能对标 GPT-4o。', content: 'Meta AI 今日正式开源了 Llama 4 系列大语言模型，这是 Llama 家族迄今为止最强大的版本。\n\n**模型规格**：\n- **Llama 4-8B**：轻量级模型，适合端侧部署，在手机上即可流畅运行\n- **Llama 4-70B**：性能与 GPT-4 持平，适合大多数企业应用\n- **Llama 4-405B**：旗舰模型，在多项基准测试中超越 GPT-4o，接近 GPT-5 预览版\n\n**技术亮点**：\n1. **128K 上下文窗口**：所有版本均支持 128K token 上下文，可处理长篇文档\n2. **多语言支持**：支持中文、英文、阿拉伯语、印地语等 200 多种语言，中文能力特别优化\n3. **工具使用**：原生支持函数调用、代码解释器和网页浏览\n4. **安全训练**：采用 RLHF 和宪法 AI 双重安全训练，有害内容生成率降低 70%\n\n**开源策略**：\nMeta 继续秉承开源理念，Llama 4 采用宽松的商用许可，允许企业免费用于商业用途。发布 24 小时内，Hugging Face 下载量突破 100 万次。', category: 'AI 技术', source: 'Meta AI', date: '2026-04-28', icon: '🦙', url: 'https://ai.meta.com', readTime: '6 分钟', isHot: false },
    { id: 'ai-4', title: 'Anthropic Claude 4 发布：企业级 AI 助手新标杆', summary: 'Claude 4 引入了全新的"扩展思维"模式，能够在回答复杂问题前进行多步骤推理，企业版支持私有数据部署。', content: 'Anthropic 今日发布了 Claude 4，定位为企业级 AI 助手的新标杆。新版本在推理能力、安全性和企业功能方面均有重大升级。\n\n**扩展思维模式（Extended Thinking）**：\n这是 Claude 4 最核心的创新。当开启此模式时，模型会在回答前进行多步骤推理，类似人类的"深思熟虑"过程。测试显示，在复杂法律文档分析和财务建模任务中，准确率提升 35%。\n\n**企业功能**：\n- **私有部署**：支持在企业自有服务器上完全离线部署，数据不出境\n- **SSO 集成**：与 Okta、Azure AD 等身份管理系统无缝集成\n- **审计日志**：完整记录所有交互，满足合规要求\n- **SLA 保障**：提供 99.99% 可用性保障和 1 小时响应支持\n\n**定价**：\nClaude 4 Pro 版定价为每月 30 美元/用户，企业版根据用量定制报价。Anthropic 表示已有超过 5000 家企业签约使用。', category: 'AI 技术', source: 'Anthropic', date: '2026-04-27', icon: '🔮', url: 'https://www.anthropic.com', readTime: '4 分钟', isHot: false },
    { id: 'ai-5', title: '中国发布《人工智能治理白皮书》：构建可信 AI 生态', summary: '国务院发布最新 AI 治理白皮书，提出建立 AI 安全评估体系，推动大模型备案制度，促进 AI 产业健康发展。', content: '国务院今日发布《中国人工智能治理白皮书（2026）》，这是我国首个国家级 AI 治理纲领性文件，标志着中国 AI 治理进入系统化、规范化阶段。\n\n**核心内容**：\n1. **安全评估体系**：建立分级分类的 AI 安全评估制度，对基础模型、行业应用模型实施差异化监管\n2. **备案制度**：所有面向公众提供服务的生成式 AI 模型须在网信办备案，备案信息包括模型架构、训练数据来源、安全机制等\n3. **数据治理**：明确训练数据的合法来源要求，禁止未经授权使用个人隐私数据\n4. **算法透明**：要求关键领域 AI 系统提供可解释性说明，确保决策过程透明\n\n**产业影响**：\n白皮书同时提出一系列扶持政策，包括：\n- 设立 1000 亿元 AI 产业发展基金\n- 对 AI 芯片研发企业给予税收优惠\n- 支持高校设立 AI 伦理专业\n\n业内专家普遍认为，该白皮书在保障安全的同时为产业发展留出了充足空间，将推动中国 AI 产业进入高质量发展新阶段。', category: 'AI 技术', source: '新华社', date: '2026-04-27', icon: '📜', url: 'http://www.xinhuanet.com', readTime: '10 分钟', isHot: true },
    { id: 'ai-6', title: 'NVIDIA 发布 H200 芯片：AI 训练速度提升 40%', summary: 'NVIDIA 在 GTC 大会上发布新一代 AI 芯片 H200，采用全新 Blackwell 架构，能效比提升 25%，已获多家云厂商预订。', content: 'NVIDIA 在 2026 年 GTC 大会上发布了备受期待的 H200 GPU，这是 Hopper 架构的继任者，采用全新的 Blackwell 架构设计。\n\n**技术规格**：\n- **制程工艺**：3nm 工艺，晶体管数量达到 2080 亿\n- **显存**：配备 192GB HBM3e 显存，带宽达 5TB/s\n- **AI 性能**：FP8 精度下算力达到 8 PFLOPS，较 H100 提升 40%\n- **能效**：每瓦性能提升 25%，数据中心运营成本显著降低\n\n**软件生态**：\nNVIDIA 同步发布了 CUDA 13 和 TensorRT 10，新增对稀疏注意力、混合专家模型（MoE）的原生支持。开发者无需修改代码即可在 H200 上获得性能提升。\n\n**市场反响**：\n亚马逊 AWS、微软 Azure、谷歌云和阿里云均已宣布将在 2026 年 Q3 推出基于 H200 的实例。据供应链消息，H200 的订单已排期至 2027 年中期。', category: 'AI 技术', source: 'NVIDIA News', date: '2026-04-26', icon: '💾', url: 'https://nvidianews.nvidia.com', readTime: '5 分钟', isHot: false },
    { id: 'ai-7', title: 'Midjourney V7 发布：视频生成能力震撼登场', summary: 'Midjourney 推出 V7 版本，新增视频生成功能，支持 1080p 高清视频生成，时长可达 60 秒，画面连贯性大幅提升。', content: 'AI 图像生成领域的领导者 Midjourney 今日发布了 V7 重大更新，最引人注目的是新增了视频生成功能，正式进军视频 AI 领域。\n\n**视频生成功能**：\n- **分辨率**：支持 1080p 高清视频生成\n- **时长**：单次生成最长 60 秒视频\n- **连贯性**：采用时序一致性算法，人物和场景在视频中保持稳定\n- **风格控制**：支持从参考视频提取风格并应用到新视频\n\n**图像升级**：\n- **V7 图像模型**：在美学质量和提示词遵循度上均有提升\n- **角色一致性**：新增"角色锁定"功能，可在多张图片中保持同一角色外观\n- **编辑功能**：支持局部重绘、风格迁移和分辨率提升\n\n**商业模式**：\nMidjourney V7 采用订阅制，Pro 版每月 60 美元，包含无限图像生成和每月 100 分钟视频生成额度。发布首日，新增订阅用户超过 50 万。', category: 'AI 技术', source: 'Midjourney', date: '2026-04-25', icon: '🎨', url: 'https://www.midjourney.com', readTime: '3 分钟', isHot: true },
    { id: 'ai-8', title: 'AI 编程助手 Cursor 融资 5 亿美元，估值超 40 亿', summary: 'AI 编程工具 Cursor 完成新一轮融资，月活开发者突破 500 万，支持 50 多种编程语言，代码补全准确率达 92%。', content: 'AI 编程工具 Cursor 今日宣布完成 5 亿美元 C 轮融资，由 a16z 领投，估值超过 40 亿美元。这使其成为估值最高的 AI 编程工具初创公司。\n\n**产品数据**：\n- **月活用户**：突破 500 万开发者\n- **代码补全**：准确率达到 92%，较年初提升 8 个百分点\n- **支持语言**：50 多种编程语言，包括 Python、JavaScript、Rust、Go 等\n- **企业客户**：超过 2 万家企业使用，包括 Stripe、Vercel 等知名公司\n\n**核心功能**：\n1. **智能补全**：基于上下文理解预测下一行代码，不仅补全单词，还能补全整个函数\n2. **自然语言编程**：用自然语言描述需求，自动生成代码实现\n3. **代码审查**：自动检测潜在 bug、安全漏洞和性能问题\n4. **文档生成**：自动为代码生成注释和文档\n\n**资金用途**：\nCursor 表示将利用本轮融资扩充研发团队，目标是在 2026 年底前将代码补全准确率提升至 95%，并推出企业级协作功能。', category: 'AI 技术', source: 'TechCrunch', date: '2026-04-25', icon: '💻', url: 'https://techcrunch.com', readTime: '4 分钟', isHot: false },
    { id: 'ai-9', title: '欧盟通过《AI 法案》最终版本：全球最严 AI 监管落地', summary: '欧盟正式通过《人工智能法案》最终文本，对高风险 AI 系统实施严格监管，违规企业最高面临全球营收 7% 的罚款。', content: '欧盟理事会今日正式通过了《人工智能法案》（AI Act）的最终版本，这是全球首部全面规范人工智能的综合性法律，预计将于 2026 年 8 月正式生效。\n\n**监管分级**：\n1. **不可接受风险**：社会评分系统、实时远程生物识别（执法例外）等被完全禁止\n2. **高风险**：招聘、信贷审批、司法辅助等领域 AI 需满足严格合规要求\n3. **有限风险**：聊天机器人等需明确告知用户正在与 AI 交互\n4. **最小风险**：垃圾邮件过滤等低风险应用可自由使用\n\n**合规要求**：\n- **数据治理**：训练数据须符合 GDPR 要求，确保数据质量和多样性\n- **透明度**：高风险 AI 需提供技术文档和使用说明\n- **人工监督**：关键决策须保留人工复核环节\n- **记录保存**：系统日志须保存 6 年，供监管机构审查\n\n**处罚措施**：\n违规企业最高面临全球年营收 7% 或 3500 万欧元（取较高者）的罚款。这一处罚力度与 GDPR 持平，体现了欧盟对 AI 监管的决心。', category: 'AI 技术', source: 'Reuters', date: '2026-04-24', icon: '⚖️', url: 'https://www.reuters.com', readTime: '7 分钟', isHot: false },
    { id: 'ai-10', title: 'Sora 正式开放：OpenAI 视频生成模型面向公众', summary: 'OpenAI 宣布 Sora 视频生成模型正式向公众开放，支持文本生成视频、图像生成视频，最高支持 1080p 分辨率。', content: 'OpenAI 今日宣布 Sora 视频生成模型正式面向公众开放，结束了长达 15 个月的内测期。任何用户都可以通过 ChatGPT Plus 订阅或 Sora 独立应用使用。\n\n**功能特性**：\n- **文本生成视频**：输入文字描述，生成最长 60 秒的视频\n- **图像生成视频**：上传静态图片，生成动态视频\n- **视频编辑**：对现有视频进行风格转换、扩展时长或修改内容\n- **分辨率**：最高支持 1080p，帧率 30fps\n\n**安全机制**：\nOpenAI 为 Sora 建立了多层安全防护：\n1. **内容过滤**：自动拒绝涉及暴力、色情和深度伪造的请求\n2. **C2PA 水印**：所有生成视频嵌入不可见水印，可追溯 AI 生成来源\n3. **名人保护**：禁止生成真实政治人物和名人的视频\n4. **人工审核**：敏感内容须经人工审核后方可发布\n\n**行业影响**：\nSora 的开放被视为生成式 AI 进入视频领域的标志性事件。Adobe、Runway 等竞争对手已紧急调整产品策略，视频制作行业面临深刻变革。', category: 'AI 技术', source: 'OpenAI', date: '2026-04-24', icon: '🎬', url: 'https://openai.com/sora', readTime: '4 分钟', isHot: true },
    { id: 'ai-11', title: 'AI 医疗诊断系统获 FDA 批准：肺癌早期筛查准确率达 95%', summary: '美国 FDA 批准首个基于深度学习的肺癌筛查 AI 系统，能够在 CT 扫描中识别早期肺癌病灶，准确率超过资深放射科医生。', content: '美国食品药品监督管理局（FDA）今日批准了首个基于深度学习的肺癌早期筛查 AI 系统——LungGuard AI。该系统由斯坦福大学医学院和 Google Health 联合开发。\n\n**临床数据**：\n- **准确率**：在 5 万例 CT 扫描测试中，早期肺癌检出率达到 95.2%，假阳性率仅为 3.1%\n- **对比表现**：在相同数据集上，资深放射科医生的检出率为 87.5%，LungGuard AI 的表现超越人类专家\n- **敏感性**：对直径小于 5mm 的微小结节的识别准确率达到 91%\n\n**工作原理**：\nLungGuard AI 采用 3D 卷积神经网络，能够分析 CT 扫描的每一层图像，识别肉眼难以察觉的细微病变。系统还会自动生成风险评估报告，标注可疑区域并提供随访建议。\n\n**部署计划**：\nFDA 批准该系统用于 50 岁以上吸烟人群的年度筛查。预计 2026 年底前将在美国 500 家医院部署，每年可帮助筛查超过 200 万高危人群。', category: 'AI 技术', source: 'FDA', date: '2026-04-23', icon: '🏥', url: 'https://www.fda.gov', readTime: '6 分钟', isHot: false },
    { id: 'ai-12', title: '华为发布盘古大模型 5.0：行业应用落地加速', summary: '华为云发布盘古大模型 5.0，在矿山、气象、药物研发等 100 多个行业实现商用，推理成本降低 50%。', content: '华为云今日在华为开发者大会 2026 上发布了盘古大模型 5.0，这是华为面向行业智能化推出的最新一代大模型。\n\n**技术升级**：\n- **参数规模**：基础模型参数达到 1.5 万亿，采用 MoE 架构，推理时仅激活 300 亿参数\n- **多模态融合**：支持文本、图像、语音、传感器数据的统一处理\n- **行业知识**：预训练数据包含 100 多个行业的专业知识库\n\n**行业应用**：\n1. **矿山安全**：实时监测井下环境，预测瓦斯泄漏风险，事故预警准确率达 98%\n2. **气象预报**：将台风路径预测准确率提升 15%，预报时效延长至 10 天\n3. **药物研发**：辅助分子设计，将候选药物筛选时间从 2 年缩短至 3 个月\n4. **智能制造**：质量缺陷检测准确率 99.5%，误检率低于 0.1%\n\n**商业化进展**：\n盘古 5.0 已在 100 多个行业实现商用，服务企业超过 1 万家。华为云表示，通过模型压缩和推理优化，客户使用成本较上一代降低 50%。', category: 'AI 技术', source: '华为云', date: '2026-04-23', icon: '☁️', url: 'https://www.huaweicloud.com', readTime: '5 分钟', isHot: false }
  ],
  finance: financeData,
  english: [
    { id: 'eng-1', title: '2026 年雅思考试改革：新增 AI 口语评估系统', summary: '雅思官方宣布引入 AI 辅助口语评分系统，与人工评分相结合，提高评分一致性和效率，预计 2027 年全球推行。', category: '英语学习', source: 'IELTS Official', date: '2026-04-29', icon: '📝', url: 'https://www.ielts.org', readTime: '5 分钟', isHot: true },
    { id: 'eng-2', title: 'AI 翻译工具 DeepL 推出英语学习功能，支持实时纠错', summary: 'DeepL 发布全新英语学习模块，利用大模型技术提供实时语法纠错、同义词推荐和语境化学习建议。', category: '英语学习', source: 'DeepL Blog', date: '2026-04-28', icon: '🌐', url: 'https://www.deepl.com', readTime: '4 分钟', isHot: false },
    { id: 'eng-3', title: '牛津词典 2026 年度词汇候选名单公布："Brainrot" 入围', summary: '牛津词典公布 2026 年度词汇候选名单，"Brainrot"（脑腐，形容过度消费低质量网络内容）等网络新词入围。', category: '英语学习', source: 'Oxford Dictionary', date: '2026-04-27', icon: '📖', url: 'https://www.oed.com', readTime: '3 分钟', isHot: true },
    { id: 'eng-4', title: '多邻国推出 AI 对话教练：模拟真实场景练习口语', summary: 'Duolingo 发布 AI 对话教练功能，利用 GPT-4 技术模拟餐厅点餐、面试等真实场景，提供个性化反馈。', category: '英语学习', source: 'Duolingo Blog', date: '2026-04-26', icon: '🦉', url: 'https://blog.duolingo.com', readTime: '4 分钟', isHot: false },
    { id: 'eng-5', title: '剑桥大学研究：双语者阿尔茨海默病发病延迟 4-5 年', summary: '剑桥大学最新研究表明，熟练掌握双语的人群阿尔茨海默病发病时间平均延迟 4-5 年，学习语言有益大脑健康。', category: '英语学习', source: 'Cambridge University', date: '2026-04-25', icon: '🧠', url: 'https://www.cam.ac.uk', readTime: '6 分钟', isHot: false }
  ],
  tech: [
    { id: 'tech-1', title: 'Rust 语言入选 Linux 内核 6.14，正式成为一等公民', summary: 'Linus Torvalds 宣布 Rust 代码正式合并入 Linux 内核主线，标志着 Rust 在系统编程领域获得最高认可。', category: '计算机', source: 'Linux Kernel', date: '2026-04-29', icon: '🦀', url: 'https://www.kernel.org', readTime: '7 分钟', isHot: true },
    { id: 'tech-2', title: '量子计算机实现 1000 量子比特里程碑，IBM 领跑', summary: 'IBM 发布 Condor 量子处理器，实现 1000 个量子比特，量子体积达到 512，在药物分子模拟中展现优势。', category: '计算机', source: 'IBM Research', date: '2026-04-28', icon: '⚛️', url: 'https://research.ibm.com', readTime: '6 分钟', isHot: true },
    { id: 'tech-3', title: 'TypeScript 6.0 发布：引入类型推断重大改进', summary: '微软发布 TypeScript 6.0，新增基于 AI 的类型推断引擎，能够自动推断复杂类型，减少 30% 的类型注解代码。', category: '计算机', source: 'Microsoft Dev', date: '2026-04-27', icon: '📘', url: 'https://devblogs.microsoft.com', readTime: '5 分钟', isHot: false },
    { id: 'tech-4', title: 'WebAssembly 2.0 标准定稿：浏览器性能再飞跃', summary: 'W3C 正式发布 WebAssembly 2.0 标准，支持垃圾回收、异常处理和尾调用优化，让 Web 应用性能接近原生。', category: '计算机', source: 'W3C', date: '2026-04-26', icon: '⚡', url: 'https://www.w3.org', readTime: '5 分钟', isHot: false },
    { id: 'tech-5', title: 'Kubernetes 十周年：云原生生态回顾与展望', summary: 'Kubernetes 发布十周年，已成为容器编排的事实标准，全球 78% 的企业在生产环境使用 K8s，生态项目超过 1000 个。', category: '计算机', source: 'CNCF', date: '2026-04-25', icon: '☸️', url: 'https://www.cncf.io', readTime: '8 分钟', isHot: false },
    { id: 'tech-6', title: 'GitHub Copilot X 发布：AI 成为编程搭档', summary: 'GitHub 发布 Copilot X 重大更新，新增代码审查、自动测试生成、文档编写等功能，覆盖完整开发流程。', category: '计算机', source: 'GitHub Blog', date: '2026-04-24', icon: '🔧', url: 'https://github.blog', readTime: '5 分钟', isHot: true }
  ],
  science: [
    { id: 'sci-1', title: '2026 年太平洋厄尔尼诺现象监测：强度或达强等级', summary: 'NOAA 最新监测显示，太平洋赤道海域温度异常升高，2026 年厄尔尼诺现象可能达到强等级，影响全球气候模式。', category: '气象地质', source: 'NOAA', date: '2026-04-29', icon: '🌊', url: 'https://www.noaa.gov', readTime: '6 分钟', isHot: true },
    { id: 'sci-2', title: '中国嫦娥七号成功着陆月球南极，发现水冰证据', summary: '嫦娥七号探测器成功着陆月球南极艾特肯盆地，首次在月表以下 2 米处发现水冰存在的确凿证据。', category: '气象地质', source: 'CNSA', date: '2026-04-28', icon: '🌙', url: 'http://www.cnsa.gov.cn', readTime: '5 分钟', isHot: true },
    { id: 'sci-3', title: '全球气温连续 12 个月破纪录，2026 年或成最热年份', summary: '世界气象组织数据显示，全球平均气温连续 12 个月打破历史纪录，2026 年有望成为有记录以来最热年份。', category: '气象地质', source: 'WMO', date: '2026-04-27', icon: '🌡️', url: 'https://wmo.int', readTime: '5 分钟', isHot: false },
    { id: 'sci-4', title: '冰岛火山持续喷发，欧洲航空面临新挑战', summary: '冰岛雷克雅内斯半岛火山持续喷发，火山灰扩散至欧洲大陆，多家航空公司调整航线，科学家密切监测。', category: '气象地质', source: 'BBC Science', date: '2026-04-26', icon: '🌋', url: 'https://www.bbc.com', readTime: '4 分钟', isHot: false }
  ],
  history: [
    { id: 'his-1', title: '经典论文回顾：Attention Is All You Need（2017）', summary: 'Transformer 架构的开创性论文，彻底改变了 NLP 领域，奠定了现代大语言模型的基础，被引用超过 15 万次。', category: '经典回顾', source: 'arXiv', date: '2017-06-12', icon: '📄', url: 'https://arxiv.org/abs/1706.03762', readTime: '15 分钟', isHot: false },
    { id: 'his-2', title: '经典论文回顾：ImageNet Classification with Deep CNN（2012）', summary: 'AlexNet 论文，深度学习在计算机视觉领域的里程碑，首次证明深度 CNN 在图像识别中的巨大优势。', category: '经典回顾', source: 'NeurIPS', date: '2012-12-03', icon: '📷', url: 'https://papers.nips.cc', readTime: '12 分钟', isHot: false },
    { id: 'his-3', title: '经典著作：本杰明·格雷厄姆《聪明的投资者》（1949）', summary: '价值投资圣经，巴菲特称之为"有史以来最好的投资书籍"，阐述了安全边际、市场先生等核心理念。', category: '经典回顾', source: 'Harper & Brothers', date: '1949-01-01', icon: '📚', url: 'https://www.amazon.com', readTime: '30 分钟', isHot: false },
    { id: 'his-4', title: '里程碑：AlphaGo 击败李世石（2016）', summary: 'DeepMind 的 AlphaGo 以 4:1 击败世界围棋冠军李世石，标志着 AI 在复杂策略游戏中超越人类。', category: '经典回顾', source: 'Nature', date: '2016-03-15', icon: '⚫', url: 'https://www.nature.com', readTime: '10 分钟', isHot: false },
    { id: 'his-5', title: '经典论文回顾：Bitcoin: A Peer-to-Peer Electronic Cash System（2008）', summary: '中本聪发布的比特币白皮书，开创了加密货币和区块链技术的新纪元，彻底改变了金融科技领域。', category: '经典回顾', source: 'Bitcoin.org', date: '2008-10-31', icon: '₿', url: 'https://bitcoin.org/bitcoin.pdf', readTime: '20 分钟', isHot: false },
    { id: 'his-6', title: '经典著作：瑞·达利欧《原则》（2017）', summary: '桥水基金创始人瑞·达利欧分享其生活与工作原则，包括极度求真、极度透明等核心理念，影响深远。', category: '经典回顾', source: 'Simon & Schuster', date: '2017-09-19', icon: '📖', url: 'https://www.principles.com', readTime: '25 分钟', isHot: false }
  ]
};

const wordData = [
  { word: 'serendipity', phonetic: '/ˌser.ənˈdɪp.ə.ti/', meaning: '意外发现珍宝的运气；机缘凑巧', example: 'The discovery of penicillin was a moment of pure serendipity.', exampleTrans: '青霉素的发现纯粹是机缘巧合。' },
  { word: 'ephemeral', phonetic: '/ɪˈfem.ər.əl/', meaning: '短暂的；转瞬即逝的', example: 'Fashion is ephemeral, changing with every season.', exampleTrans: '时尚是短暂的，每季都在变化。' },
  { word: 'resilience', phonetic: '/rɪˈzɪl.jəns/', meaning: '韧性；恢复力；弹力', example: 'The resilience of the economy surprised many analysts.', exampleTrans: '经济的韧性让许多分析师感到惊讶。' },
  { word: 'paradigm', phonetic: '/ˈpær.ə.daɪm/', meaning: '典范；范例；模式', example: 'The new research represents a paradigm shift in our understanding.', exampleTrans: '这项新研究代表了我们在理解上的范式转变。' },
  { word: 'ubiquitous', phonetic: '/juːˈbɪk.wɪ.təs/', meaning: '无处不在的；十分普遍的', example: 'Smartphones have become ubiquitous in modern society.', exampleTrans: '智能手机在现代社会已经无处不在。' },
  { word: 'pragmatic', phonetic: '/præɡˈmæt.ɪk/', meaning: '务实的；实用的', example: 'We need a pragmatic approach to solve this problem.', exampleTrans: '我们需要一种务实的方法来解决这个问题。' },
  { word: 'innovation', phonetic: '/ˌɪn.əˈveɪ.ʃən/', meaning: '创新；革新；新方法', example: 'Technological innovation drives economic growth.', exampleTrans: '技术创新推动经济增长。' },
  { word: 'sustainable', phonetic: '/səˈsteɪ.nə.bəl/', meaning: '可持续的；能长期维持的', example: 'We must develop sustainable energy solutions.', exampleTrans: '我们必须开发可持续的能源解决方案。' },
  { word: 'algorithm', phonetic: '/ˈæl.ɡə.rɪ.ðəm/', meaning: '算法；计算程序', example: 'The recommendation algorithm personalizes content for each user.', exampleTrans: '推荐算法为每个用户个性化内容。' },
  { word: 'collaboration', phonetic: '/kəˌlæb.əˈreɪ.ʃən/', meaning: '合作；协作；通敌', example: 'International collaboration is essential for climate action.', exampleTrans: '国际合作对于气候行动至关重要。' }
];

const sentenceData = [
  { en: 'The only way to do great work is to love what you do.', cn: '成就伟大工作的唯一途径是热爱你所做的事。', source: 'Steve Jobs', tag: '励志' },
  { en: 'Innovation distinguishes between a leader and a follower.', cn: '创新决定一个人是领袖还是跟随者。', source: 'Steve Jobs', tag: '创新' },
  { en: 'The future belongs to those who believe in the beauty of their dreams.', cn: '未来属于那些相信梦想之美的人。', source: 'Eleanor Roosevelt', tag: '梦想' },
  { en: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', cn: '成功不是终点，失败也不是末日：继续前进的勇气才是最重要的。', source: 'Winston Churchill', tag: '坚持' },
  { en: 'The best time to plant a tree was 20 years ago. The second best time is now.', cn: '种一棵树最好的时间是二十年前，其次是现在。', source: 'Chinese Proverb', tag: '行动' },
  { en: 'In the middle of difficulty lies opportunity.', cn: '困境之中蕴藏着机遇。', source: 'Albert Einstein', tag: '机遇' },
  { en: 'The greatest glory in living lies not in never falling, but in rising every time we fall.', cn: '生命中最伟大的荣耀不在于从不跌倒，而在于每次跌倒后都能站起来。', source: 'Nelson Mandela', tag: '坚韧' },
  { en: 'It does not matter how slowly you go as long as you do not stop.', cn: '只要你不停止，走得多慢都没关系。', source: 'Confucius', tag: '毅力' }
];

const newsVocabData = [
  { word: 'surge', meaning: '激增；暴涨', context: 'Stock prices surged after the earnings report.' },
  { word: 'volatile', meaning: '波动的；不稳定的', context: 'The market remains volatile amid geopolitical tensions.' },
  { word: 'merger', meaning: '合并；兼并', context: 'The merger between the two tech giants was approved.' },
  { word: 'dividend', meaning: '股息；红利', context: 'The company announced a quarterly dividend of $0.50.' },
  { word: 'recession', meaning: '经济衰退', context: 'Economists debate whether a recession is imminent.' },
  { word: 'inflation', meaning: '通货膨胀', context: 'Inflation cooled to 2.5% in the latest report.' },
  { word: 'bullish', meaning: '看涨的；乐观的', context: 'Analysts are bullish on AI stocks this quarter.' },
  { word: 'bearish', meaning: '看跌的；悲观的', context: 'Some investors remain bearish on the housing market.' },
  { word: 'liquidity', meaning: '流动性', context: 'The central bank injected liquidity into the market.' },
  { word: 'portfolio', meaning: '投资组合', context: 'Diversification is key to a healthy portfolio.' },
  { word: 'benchmark', meaning: '基准；标杆', context: 'The fund outperformed its benchmark by 3%.' },
  { word: 'valuation', meaning: '估值', context: 'The startup\'s valuation reached $10 billion.' }
];

const knowledgeData = [
  { id: 'know-1', title: '科学家发现新型超导材料：室温超导再进一步', summary: '美国阿贡国家实验室团队发现一种铜基复合材料，在 15°C 和常压下表现出超导特性。虽然仍需进一步验证，但这一发现为室温超导的商业化应用带来新希望。超导技术可彻底改变电力传输、磁悬浮交通和医疗成像领域。', category: '知识科普', source: 'Science', date: '2026-04-29', icon: '🔬', url: 'https://www.science.org', readTime: '7 分钟', isHot: true, tags: ['物理', '材料科学'] },
  { id: 'know-2', title: '詹姆斯·韦伯望远镜发现最古老星系：诞生于宇宙大爆炸后 3 亿年', summary: 'JWST 观测到一个红移值高达 14 的星系，意味着它形成于宇宙大爆炸后仅 3.2 亿年。这个发现挑战了现有星系形成理论，表明早期宇宙中的星系形成速度远超预期。', category: '知识科普', source: 'NASA', date: '2026-04-29', icon: '🌌', url: 'https://www.nasa.gov', readTime: '6 分钟', isHot: true, tags: ['天文学', '宇宙'] },
  { id: 'know-3', title: 'CRISPR 基因编辑治愈首例遗传性贫血患者', summary: '波士顿儿童医院团队使用 CRISPR-Cas9 技术成功治愈一名 β-地中海贫血患者。通过编辑患者自身造血干细胞，使其能够正常产生血红蛋白。这是基因编辑疗法从实验室走向临床的里程碑。', category: '知识科普', source: 'NEJM', date: '2026-04-28', icon: '🧬', url: 'https://www.nejm.org', readTime: '8 分钟', isHot: true, tags: ['医学', '生物'] },
  { id: 'know-4', title: '大脑植入芯片帮助瘫痪患者用意念控制机械臂', summary: 'Neuralink 最新临床试验中，一名颈椎损伤患者通过脑机接口成功控制机械臂完成日常动作。植入芯片能够读取 10000 多个神经元的信号，准确率达到 94%。', category: '知识科普', source: 'Nature Medicine', date: '2026-04-28', icon: '🧠', url: 'https://www.nature.com/nm', readTime: '6 分钟', isHot: false, tags: ['神经科学', '医学'] },
  { id: 'know-5', title: '科学家在马里亚纳海沟发现全新物种：适应极端压力的生物', summary: '中国"奋斗者"号深潜器在 10929 米深处发现一种全新水母物种。该生物具有特殊的细胞膜结构，能够承受相当于 1100 个大气压的极端压力，为生命起源研究提供新线索。', category: '知识科普', source: 'National Geographic', date: '2026-04-27', icon: '🐙', url: 'https://www.nationalgeographic.com', readTime: '5 分钟', isHot: false, tags: ['海洋', '生物'] },
  { id: 'know-6', title: '量子纠缠实现 1000 公里传输：量子互联网迈出关键一步', summary: '中国科学技术大学团队成功实现千公里级量子纠缠分发，传输保真度超过 99%。这一突破为构建全球量子通信网络奠定基础，未来可实现绝对安全的通信。', category: '知识科普', source: 'Physical Review Letters', date: '2026-04-27', icon: '⚛️', url: 'https://journals.aps.org/prl', readTime: '7 分钟', isHot: true, tags: ['量子物理', '通信'] },
  { id: 'know-7', title: '考古学家在埃及发现 4000 年前完整城市遗址', summary: '埃及考古队在卢克索附近发现一座保存完好的青铜时代城市，包含住宅、神庙和作坊。出土文物包括金饰、陶器和刻有象形文字的石碑，为研究古埃及日常生活提供珍贵资料。', category: '知识科普', source: 'Archaeology Magazine', date: '2026-04-26', icon: '🏛️', url: 'https://www.archaeology.org', readTime: '6 分钟', isHot: false, tags: ['考古', '历史'] },
  { id: 'know-8', title: '新型钙钛矿太阳能电池效率突破 30%，成本降低 50%', summary: '韩国 KAIST 研究团队开发出叠层钙钛矿-硅太阳能电池，实验室效率达到 30.2%。该技术有望在未来 5 年内实现商业化，大幅降低太阳能发电成本。', category: '知识科普', source: 'Science', date: '2026-04-26', icon: '☀️', url: 'https://www.science.org', readTime: '5 分钟', isHot: true, tags: ['能源', '材料'] },
  { id: 'know-9', title: '心理学家发现"数字排毒"可显著提升幸福感', summary: '牛津大学为期一年的追踪研究显示，每天减少 1 小时社交媒体使用时间的参与者，焦虑水平下降 25%，生活满意度提升 18%。研究建议设定"无手机时段"来改善心理健康。', category: '知识科普', source: 'Oxford University', date: '2026-04-25', icon: '🧘', url: 'https://www.ox.ac.uk', readTime: '5 分钟', isHot: false, tags: ['心理学', '健康'] },
  { id: 'know-10', title: '人工智能预测地震：提前 72 小时预警系统测试成功', summary: 'Google Research 与日本气象厅合作开发的 AI 地震预测模型，在模拟测试中成功提前 72 小时预测了 7 级以上地震。该系统通过分析地壳应力积累和微小震动模式进行预测。', category: '知识科普', source: 'Google Research', date: '2026-04-25', icon: '🌏', url: 'https://research.google', readTime: '6 分钟', isHot: true, tags: ['地质', 'AI'] },
  { id: 'know-11', title: '科学家复活 4.6 万年前远古病毒：研究气候变化影响', summary: '法国研究团队从西伯利亚永久冻土中复活了一种距今 4.6 万年的巨型病毒。研究旨在了解气候变化导致冻土融化后，远古病原体释放对生态系统的潜在风险。', category: '知识科普', source: 'Nature Microbiology', date: '2026-04-24', icon: '🦠', url: 'https://www.nature.com/nmicrobiol', readTime: '6 分钟', isHot: false, tags: ['病毒', '气候'] },
  { id: 'know-12', title: '人类基因组计划 2.0 启动：目标完成 100 万人全基因组测序', summary: '国际联盟宣布启动人类基因组计划 2.0，计划在未来 10 年内完成 100 万人的全基因组测序。该项目将揭示更多疾病与基因的关联，推动个性化医疗发展。', category: '知识科普', source: 'Nature', date: '2026-04-24', icon: '🧪', url: 'https://www.nature.com', readTime: '7 分钟', isHot: true, tags: ['基因', '医学'] },
  { id: 'know-13', title: '南极冰架融化速度超预期：海平面上升威胁加剧', summary: '最新卫星数据显示，南极洲西部冰架融化速度比 IPCC 预测快 40%。如果全部融化，全球海平面将上升 3.3 米，威胁数亿沿海居民。科学家呼吁加速碳减排行动。', category: '知识科普', source: 'Nature Climate Change', date: '2026-04-23', icon: '🧊', url: 'https://www.nature.com/nclimate', readTime: '6 分钟', isHot: true, tags: ['气候', '环境'] },
  { id: 'know-14', title: '新型可降解塑料：海洋生物可在 30 天内完全分解', summary: '加州大学团队开发出一种基于海藻提取物的生物塑料，在海洋环境中可被微生物在 30 天内完全分解。该技术有望解决海洋塑料污染问题，已进入商业化试点阶段。', category: '知识科普', source: 'UC Berkeley', date: '2026-04-23', icon: '🌊', url: 'https://www.berkeley.edu', readTime: '5 分钟', isHot: false, tags: ['环保', '材料'] },
  { id: 'know-15', title: '恐龙灭绝新理论：小行星撞击叠加火山喷发双重打击', summary: '耶鲁大学研究团队通过分析德干高原火山岩层，发现小行星撞击前后发生了大规模火山喷发。双重灾难导致地球生态系统崩溃，加速了恐龙灭绝进程。', category: '知识科普', source: 'Yale University', date: '2026-04-22', icon: '🦕', url: 'https://www.yale.edu', readTime: '6 分钟', isHot: false, tags: ['古生物', '地质'] }
];

const wordBooks = [
  {
    id: 'cet4',
    name: '大学英语四级',
    icon: '📗',
    desc: 'CET-4 核心高频词汇',
    total: 20,
    color: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
    words: [
      { word: 'abandon', phonetic: '/əˈbæn.dən/', meaning: '放弃；遗弃；离弃', example: 'He abandoned his car and ran for help.', exampleTrans: '他弃车跑去求救。', image: '🏃💨🚗', scene: '紧急情况下弃车逃跑的场景' },
      { word: 'ability', phonetic: '/əˈbɪl.ə.ti/', meaning: '能力；才能；本领', example: 'She has the ability to speak four languages.', exampleTrans: '她有能力说四种语言。', image: '🧠✨🗣️', scene: '大脑发光，说出多种语言' },
      { word: 'absence', phonetic: '/ˈæb.səns/', meaning: '缺席；不在；缺乏', example: 'His absence from school worried his parents.', exampleTrans: '他缺课让父母担心。', image: '🪑❌👨‍🎓', scene: '空座位上画着叉，学生不在' },
      { word: 'absolute', phonetic: '/ˈæb.sə.luːt/', meaning: '绝对的；完全的；十足的', example: 'I have absolute confidence in you.', exampleTrans: '我对你有绝对的信心。', image: '💯✅', scene: '满分100，全部正确' },
      { word: 'absorb', phonetic: '/əbˈzɔːb/', meaning: '吸收；吸引；理解', example: 'Plants absorb carbon dioxide from the air.', exampleTrans: '植物从空气中吸收二氧化碳。', image: '🌱💨➡️', scene: '植物吸收空气中的气体' },
      { word: 'abstract', phonetic: '/ˈæb.strækt/', meaning: '抽象的；抽象派的', example: 'The painting is very abstract and hard to understand.', exampleTrans: '这幅画很抽象，难以理解。', image: '🎨🌀', scene: '抽象派的漩涡画作' },
      { word: 'abundant', phonetic: '/əˈbʌn.dənt/', meaning: '丰富的；充裕的；大量的', example: 'The region is abundant in wildlife.', exampleTrans: '该地区野生动物丰富。', image: '🌳🦌🐦🦋', scene: '森林里满是各种动物' },
      { word: 'academic', phonetic: '/ˌæk.əˈdem.ɪk/', meaning: '学术的；教学的；学院的', example: 'She has a strong academic background.', exampleTrans: '她有扎实的学术背景。', image: '🎓📚🏫', scene: ' graduation cap 和书本' },
      { word: 'academy', phonetic: '/əˈkæd.ə.mi/', meaning: '学院；研究院；学会', example: 'He was accepted into the Royal Academy of Arts.', exampleTrans: '他被皇家艺术学院录取了。', image: '🏛️🎨', scene: '古典建筑中的艺术学院' },
      { word: 'accelerate', phonetic: '/əkˈsel.ə.reɪt/', meaning: '加速；加快；促进', example: 'The car accelerated to overtake the truck.', exampleTrans: '汽车加速超车。', image: '🚗💨⏩', scene: '汽车踩油门加速' },
      { word: 'accent', phonetic: '/ˈæk.sənt/', meaning: '口音；重音；强调', example: 'She speaks English with a French accent.', exampleTrans: '她说英语带有法国口音。', image: '🗣️🇫🇷', scene: '说话带有法国国旗标识' },
      { word: 'accept', phonetic: '/əkˈsept/', meaning: '接受；同意；认可', example: 'I accept your apology.', exampleTrans: '我接受你的道歉。', image: '🤝😊', scene: '握手表示接受' },
      { word: 'access', phonetic: '/ˈæk.ses/', meaning: '进入；使用权；通道', example: 'Students have access to the library 24/7.', exampleTrans: '学生可以全天候使用图书馆。', image: '🚪🔓📖', scene: '敞开大门的图书馆' },
      { word: 'accident', phonetic: '/ˈæk.sɪ.dənt/', meaning: '事故；意外；偶然', example: 'The accident happened at the intersection.', exampleTrans: '事故发生在十字路口。', image: '💥🚗🚙', scene: '两车相撞的事故现场' },
      { word: 'accompany', phonetic: '/əˈkʌm.pə.ni/', meaning: '陪伴；伴随；伴奏', example: 'She asked me to accompany her to the airport.', exampleTrans: '她让我陪她去机场。', image: '👫✈️', scene: '两人一起走向飞机' },
      { word: 'accomplish', phonetic: '/əˈkʌm.plɪʃ/', meaning: '完成；实现；达到', example: 'We accomplished our mission on time.', exampleTrans: '我们按时完成了任务。', image: '✅🎯🏆', scene: '击中靶心，任务完成' },
      { word: 'accord', phonetic: '/əˈkɔːd/', meaning: '一致；协议；给予', example: 'The two countries signed a peace accord.', exampleTrans: '两国签署了和平协议。', image: '🤝🕊️📜', scene: '握手签署和平条约' },
      { word: 'account', phonetic: '/əˈkaʊnt/', meaning: '账户；描述；解释', example: 'I need to open a bank account.', exampleTrans: '我需要开一个银行账户。', image: '🏦💳', scene: '银行和银行卡' },
      { word: 'accumulate', phonetic: '/əˈkjuː.mjə.leɪt/', meaning: '积累；积聚；堆积', example: 'Dust began to accumulate on the shelves.', exampleTrans: '灰尘开始在架子上堆积。', image: '📚📚📚➕', scene: '书本不断堆积变高' },
      { word: 'accurate', phonetic: '/ˈæk.jə.rət/', meaning: '精确的；准确的', example: 'The weather forecast was surprisingly accurate.', exampleTrans: '天气预报出奇地准确。', image: '🎯🎯🎯', scene: '三支箭都正中靶心' }
    ]
  },
  {
    id: 'cet6',
    name: '大学英语六级',
    icon: '📘',
    desc: 'CET-6 进阶核心词汇',
    total: 20,
    color: 'linear-gradient(135deg, #5B86E5 0%, #36D1DC 100%)',
    words: [
      { word: 'ambiguous', phonetic: '/æmˈbɪɡ.ju.əs/', meaning: '模棱两可的；含糊不清的', example: 'His reply was ambiguous and confusing.', exampleTrans: '他的回答模棱两可，令人困惑。', image: '🤷❓❓', scene: '困惑地耸肩，两个问号' },
      { word: 'analogy', phonetic: '/əˈnæl.ə.dʒi/', meaning: '类比；比喻；类推', example: 'He drew an analogy between the brain and a computer.', exampleTrans: '他把大脑比作电脑。', image: '🧠↔️💻', scene: '大脑和电脑之间画等号' },
      { word: 'anticipate', phonetic: '/ænˈtɪs.ɪ.peɪt/', meaning: '预期；预料；期望', example: 'We anticipate a large crowd at the concert.', exampleTrans: '我们预计音乐会上会有大批观众。', image: '👀🎵👥👥👥', scene: '期待地看着音乐会人潮' },
      { word: 'apparent', phonetic: '/əˈpær.ənt/', meaning: '明显的；显而易见的；表面上的', example: 'It was apparent that she was lying.', exampleTrans: '很明显她在撒谎。', image: '👃📏', scene: '匹诺曹鼻子变长，谎言明显' },
      { word: 'arbitrary', phonetic: '/ˈɑː.bɪ.trər.i/', meaning: '任意的；武断的；专制的', example: 'The choice was completely arbitrary.', exampleTrans: '这个选择完全是任意的。', image: '🎲🤷', scene: '掷骰子随机决定' },
      { word: 'articulate', phonetic: '/ɑːˈtɪk.jə.lət/', meaning: '善于表达的；发音清晰的', example: 'She is an articulate speaker.', exampleTrans: '她是一位表达能力强的演讲者。', image: '🎤🗣️✨', scene: '演讲者口若悬河' },
      { word: 'assert', phonetic: '/əˈsɜːt/', meaning: '断言；声称；维护', example: 'He asserted his innocence.', exampleTrans: '他坚称自己无罪。', image: '💪🗣️⚖️', scene: '坚定地在法庭上声明' },
      { word: 'assess', phonetic: '/əˈses/', meaning: '评估；评定；估算', example: 'We need to assess the damage after the storm.', exampleTrans: '暴风雨后我们需要评估损失。', image: '📋🔍🏠', scene: '检查清单评估房屋损坏' },
      { word: 'assign', phonetic: '/əˈsaɪn/', meaning: '分配；指派；指定', example: 'The teacher assigned homework to the students.', exampleTrans: '老师给学生布置了作业。', image: '👨‍🏫📄➡️👨‍🎓', scene: '老师分发作业给学生' },
      { word: 'assume', phonetic: '/əˈsjuːm/', meaning: '假设；假定；承担', example: 'I assume you have already read the report.', exampleTrans: '我假定你已经读过报告了。', image: '🤔💭❓', scene: '思考的气泡中有问号' },
      { word: 'authentic', phonetic: '/ɔːˈθen.tɪk/', meaning: '真实的；正宗的；可靠的', example: 'This is an authentic Italian restaurant.', exampleTrans: '这是一家正宗的意大利餐厅。', image: '🇮🇹🍝✅', scene: '意大利披萨上有认证标志' },
      { word: 'bias', phonetic: '/ˈbaɪ.əs/', meaning: '偏见；偏心；倾向', example: 'The news report showed a clear bias.', exampleTrans: '这篇新闻报道表现出明显的偏见。', image: '⚖️↘️', scene: '天平倾斜，偏向一边' },
      { word: 'breed', phonetic: '/briːd/', meaning: '繁殖；培育；品种', example: 'They breed dogs for competitions.', exampleTrans: '他们培育比赛用犬。', image: '🐕🐕🐕👶', scene: '大狗生小狗' },
      { word: 'chaos', phonetic: '/ˈkeɪ.ɒs/', meaning: '混乱；混沌；无序', example: 'The room was in complete chaos after the party.', exampleTrans: '聚会后房间一片混乱。', image: '🎉😵🌀', scene: '聚会后房间乱成漩涡' },
      { word: 'clarify', phonetic: '/ˈklær.ɪ.faɪ/', meaning: '澄清；阐明；净化', example: 'Could you clarify your statement?', exampleTrans: '你能澄清一下你的陈述吗？', image: '💧🔍✨', scene: '浑浊的水变得清澈透明' },
      { word: 'coherent', phonetic: '/kəʊˈhɪə.rənt/', meaning: '连贯的；一致的；条理清楚的', example: 'She presented a coherent argument.', exampleTrans: '她提出了一个条理清楚的论点。', image: '🧩🔗🔗', scene: '拼图块完美连接在一起' },
      { word: 'commodity', phonetic: '/kəˈmɒd.ɪ.ti/', meaning: '商品；日用品；有用之物', example: 'Oil is a valuable commodity.', exampleTrans: '石油是一种宝贵的商品。', image: '🛢️💰', scene: '油桶和金币' },
      { word: 'compensate', phonetic: '/ˈkɒm.pən.seɪt/', meaning: '补偿；赔偿；弥补', example: 'The company will compensate you for the loss.', exampleTrans: '公司会赔偿你的损失。', image: '💸➡️😊', scene: '赔偿金递到满意的人手中' },
      { word: 'complement', phonetic: '/ˈkɒm.plɪ.mənt/', meaning: '补充；补足物；补语', example: 'The wine is a perfect complement to the meal.', exampleTrans: '这酒是这顿饭的完美搭配。', image: '🍷🍽️✨', scene: '红酒和牛排完美搭配' },
      { word: 'conform', phonetic: '/kənˈfɔːm/', meaning: '遵守；符合；顺应', example: 'All products must conform to safety standards.', exampleTrans: '所有产品必须符合安全标准。', image: '✅📋🏭', scene: '工厂产品通过标准检查' }
    ]
  },
  {
    id: 'ielts',
    name: '雅思核心词汇',
    icon: '📕',
    desc: 'IELTS 7分必备高频词',
    total: 20,
    color: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
    words: [
      { word: 'advocate', phonetic: '/ˈæd.və.keɪt/', meaning: '提倡；主张；拥护者', example: 'She advocates for children\'s rights.', exampleTrans: '她倡导儿童权利。', image: '📢👶🛡️', scene: '为婴儿举牌呼吁' },
      { word: 'alleviate', phonetic: '/əˈliː.vi.eɪt/', meaning: '减轻；缓解；缓和', example: 'The medicine alleviated the pain.', exampleTrans: '药物缓解了疼痛。', image: '💊😌', scene: '吃药后痛苦表情变轻松' },
      { word: 'ambiguous', phonetic: '/æmˈbɪɡ.ju.əs/', meaning: '模棱两可的；含糊的', example: 'The contract terms are ambiguous.', exampleTrans: '合同条款含糊不清。', image: '📄❓❓', scene: '合同上画满问号' },
      { word: 'analyse', phonetic: '/ˈæn.əl.aɪz/', meaning: '分析；分解；细察', example: 'We need to analyse the data carefully.', exampleTrans: '我们需要仔细分析数据。', image: '📊🔍📈', scene: '放大镜分析图表数据' },
      { word: 'annual', phonetic: '/ˈæn.ju.əl/', meaning: '每年的；年度的；一年生的', example: 'The company publishes an annual report.', exampleTrans: '公司发布年度报告。', image: '📅📈', scene: '日历和年度增长图表' },
      { word: 'apparent', phonetic: '/əˈpær.ənt/', meaning: '明显的；表面上的', example: 'It was apparent that he was tired.', exampleTrans: '很明显他累了。', image: '😴💤', scene: '打瞌睡的人，疲劳显而易见' },
      { word: 'appropriate', phonetic: '/əˈprəʊ.pri.ət/', meaning: '适当的；合适的；挪用', example: 'Wear appropriate clothing for the interview.', exampleTrans: '面试时穿合适的服装。', image: '👔✅', scene: '正装通过，休闲装打叉' },
      { word: 'approximately', phonetic: '/əˈprɒk.sɪ.mət.li/', meaning: '大约；大概；近似地', example: 'The journey takes approximately two hours.', exampleTrans: '这段路程大约需要两小时。', image: '⏰≈2️⃣', scene: '时钟旁约等于2小时' },
      { word: 'arbitrary', phonetic: '/ˈɑː.bɪ.trər.i/', meaning: '任意的；武断的', example: 'The decision seemed completely arbitrary.', exampleTrans: '这个决定看起来完全是武断的。', image: '🎲🤷‍♂️', scene: '掷骰子做决定' },
      { word: 'aspect', phonetic: '/ˈæs.pekt/', meaning: '方面；层面；外观', example: 'We need to consider every aspect of the problem.', exampleTrans: '我们需要考虑问题的方方面面。', image: '🎲🔲🔲🔲', scene: '立方体的每个面代表一个方面' }
    ]
  },
  {
    id: 'toefl',
    name: '托福核心词汇',
    icon: '📙',
    desc: 'TOEFL 100分突破词汇',
    total: 20,
    color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    words: [
      { word: 'abundant', phonetic: '/əˈbʌn.dənt/', meaning: '丰富的；充裕的', example: 'The region has abundant natural resources.', exampleTrans: '该地区自然资源丰富。', image: '🌲💎🌊', scene: '森林钻石和海洋，资源丰富' },
      { word: 'accumulate', phonetic: '/əˈkjuː.mjə.leɪt/', meaning: '积累；积聚', example: 'Dust accumulated on the bookshelf.', exampleTrans: '灰尘在书架上堆积。', image: '📚📚📚📚', scene: '书本越堆越高' },
      { word: 'accurate', phonetic: '/ˈæk.jə.rət/', meaning: '精确的；准确的', example: 'The weather forecast was accurate.', exampleTrans: '天气预报很准确。', image: '🎯🎯🎯', scene: '三箭正中靶心' },
      { word: 'acquire', phonetic: '/əˈkwaɪər/', meaning: '获得；取得；习得', example: 'She acquired a new skill during the course.', exampleTrans: '她在课程中学到了新技能。', image: '🧠➕💡', scene: '大脑获得新知识的灯泡' },
      { word: 'adjacent', phonetic: '/əˈdʒeɪ.sənt/', meaning: '邻近的；毗邻的', example: 'The parking lot is adjacent to the building.', exampleTrans: '停车场毗邻大楼。', image: '🏢🅿️', scene: '大楼旁边就是停车场' },
      { word: 'administer', phonetic: '/ədˈmɪn.ɪ.stər/', meaning: '管理；执行；给予', example: 'The nurse administered the medicine.', exampleTrans: '护士给药。', image: '💉👩‍⚕️', scene: '护士注射药物' },
      { word: 'adolescent', phonetic: '/ˌæd.əˈles.ənt/', meaning: '青少年；青春期的', example: 'Adolescent behavior can be unpredictable.', exampleTrans: '青少年的行为可能难以预测。', image: '🧑‍🎤🎸', scene: '叛逆期少年弹吉他' },
      { word: 'advocate', phonetic: '/ˈæd.və.keɪt/', meaning: '提倡；拥护；倡导者', example: 'He advocates for environmental protection.', exampleTrans: '他倡导环境保护。', image: '🌍📢', scene: '地球旁有人呼吁保护' },
      { word: 'aesthetic', phonetic: '/iːsˈθet.ɪk/', meaning: '美学的；审美的；美感', example: 'The building has great aesthetic appeal.', exampleTrans: '这座建筑具有很高的审美吸引力。', image: '🏛️✨', scene: '美丽的古典建筑发光' },
      { word: 'afford', phonetic: '/əˈfɔːd/', meaning: '负担得起；提供；给予', example: 'I can\'t afford a new car.', exampleTrans: '我买不起新车。', image: '💸❌🚗', scene: '钱包空空看着汽车' }
    ]
  },
  {
    id: 'kaoyan',
    name: '考研核心词汇',
    icon: '📓',
    desc: '考研英语必背高频词',
    total: 20,
    color: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    words: [
      { word: 'abide', phonetic: '/əˈbaɪd/', meaning: '遵守；忍受；居住', example: 'You must abide by the rules.', exampleTrans: '你必须遵守规则。', image: '📜✅', scene: '规则手册打勾遵守' },
      { word: 'abolish', phonetic: '/əˈbɒl.ɪʃ/', meaning: '废除；废止；取消', example: 'Slavery was abolished in the 19th century.', exampleTrans: '奴隶制在19世纪被废除。', image: '⛓️❌', scene: '铁链断裂，象征废除' },
      { word: 'abound', phonetic: '/əˈbaʊnd/', meaning: '大量存在；充满；富于', example: 'Rumors abound about his resignation.', exampleTrans: '关于他辞职的谣言四起。', image: '📢📢📢', scene: '很多喇叭在传播消息' },
      { word: 'abrupt', phonetic: '/əˈbrʌpt/', meaning: '突然的；唐突的；陡峭的', example: 'The bus came to an abrupt stop.', exampleTrans: '公交车突然停了下来。', image: '🚌🛑', scene: '急刹车的公交车' },
      { word: 'absolute', phonetic: '/ˈæb.sə.luːt/', meaning: '绝对的；完全的', example: 'I have absolute trust in her.', exampleTrans: '我对她绝对信任。', image: '💯🤝', scene: '满分信任握手' },
      { word: 'absurd', phonetic: '/əbˈsɜːd/', meaning: '荒谬的；荒唐的；可笑的', example: 'That idea is completely absurd.', exampleTrans: '那个想法太荒谬了。', image: '🤪🙃', scene: '荒谬的鬼脸表情' },
      { word: 'abundant', phonetic: '/əˈbʌn.dənt/', meaning: '丰富的；大量的', example: 'The region is abundant in minerals.', exampleTrans: '该地区矿产丰富。', image: '⛏️💎💎💎', scene: '挖矿挖出大量宝石' },
      { word: 'accessory', phonetic: '/əkˈses.ər.i/', meaning: '配件；附件；同谋', example: 'She bought some accessories for her phone.', exampleTrans: '她买了一些手机配件。', image: '📱🎧⌚', scene: '手机和耳机手表配件' },
      { word: 'acclaim', phonetic: '/əˈkleɪm/', meaning: '称赞；欢呼；拥立', example: 'The film received critical acclaim.', exampleTrans: '这部电影受到了评论界的高度赞扬。', image: '👏👏👏🏆', scene: '鼓掌和奖杯' },
      { word: 'accommodate', phonetic: '/əˈkɒm.ə.deɪt/', meaning: '容纳；适应；提供住宿', example: 'The hotel can accommodate 500 guests.', exampleTrans: '这家酒店可以容纳500位客人。', image: '🏨👥👥👥', scene: '酒店住满客人' }
    ]
  },
  {
    id: 'business',
    name: '商务英语词汇',
    icon: '💼',
    desc: '职场商务场景核心词',
    total: 20,
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    words: [
      { word: 'agenda', phonetic: '/əˈdʒen.də/', meaning: '议程；议事日程', example: 'What\'s on the agenda for today\'s meeting?', exampleTrans: '今天会议的议程是什么？', image: '📋🕐', scene: '日程表和时钟' },
      { word: 'allocate', phonetic: '/ˈæl.ə.keɪt/', meaning: '分配；配置；拨给', example: 'We need to allocate more resources to marketing.', exampleTrans: '我们需要给市场部分配更多资源。', image: '🥧📊', scene: '饼图分配资源' },
      { word: 'annual', phonetic: '/ˈæn.ju.əl/', meaning: '年度的；每年的', example: 'The annual revenue exceeded expectations.', exampleTrans: '年度收入超出预期。', image: '📈📅', scene: '年度增长图表' },
      { word: 'appraisal', phonetic: '/əˈpreɪ.zəl/', meaning: '评估；评价；鉴定', example: 'She received a positive performance appraisal.', exampleTrans: '她得到了正面的绩效评估。', image: '⭐⭐⭐⭐⭐', scene: '五星绩效评价' },
      { word: 'arbitration', phonetic: '/ˌɑː.bɪˈtreɪ.ʃən/', meaning: '仲裁；公断', example: 'The dispute was settled through arbitration.', exampleTrans: '争议通过仲裁解决。', image: '⚖️🤝', scene: '天平下双方握手' },
      { word: 'asset', phonetic: '/ˈæs.et/', meaning: '资产；财产；优点', example: 'The company\'s assets total $50 million.', exampleTrans: '公司资产总计5000万美元。', image: '🏢💰', scene: '公司大楼和钱袋' },
      { word: 'audit', phonetic: '/ˈɔː.dɪt/', meaning: '审计；查账；旁听', example: 'The financial audit revealed some irregularities.', exampleTrans: '财务审计发现了一些 irregularities。', image: '🔍📊', scene: '放大镜审查财务报表' },
      { word: 'benchmark', phonetic: '/ˈbentʃ.mɑːk/', meaning: '基准；标杆；标准', example: 'We use industry benchmarks to measure performance.', exampleTrans: '我们用行业基准来衡量绩效。', image: '📏🏆', scene: '标尺和冠军奖杯' },
      { word: 'bilateral', phonetic: '/ˌbaɪˈlæt.ər.əl/', meaning: '双边的；双方的', example: 'The two countries signed a bilateral trade agreement.', exampleTrans: '两国签署了双边贸易协定。', image: '🤝🇨🇳🇺🇸', scene: '两国代表握手' },
      { word: 'bonus', phonetic: '/ˈbəʊ.nəs/', meaning: '奖金；红利；额外好处', example: 'Employees received an annual bonus.', exampleTrans: '员工收到了年终奖金。', image: '💰🎉', scene: '发奖金庆祝' }
    ]
  }
];

const hotTopics = [
  { rank: 1, title: 'OpenAI 发布 GPT-5 预览版，多模态推理能力大幅提升', category: 'AI 技术', time: '2 小时前', hot: true },
  { rank: 2, title: '黄金价格突破 2800 美元/盎司，创历史新高', category: '财经股市', time: '3 小时前', hot: true },
  { rank: 3, title: '美联储维持利率不变，暗示年内可能降息两次', category: '财经股市', time: '4 小时前', hot: true },
  { rank: 4, title: '中国一季度 GDP 增长 5.3%，超市场预期', category: '财经股市', time: '5 小时前', hot: false },
  { rank: 5, title: 'Rust 语言入选 Linux 内核 6.14，正式成为一等公民', category: '计算机', time: '6 小时前', hot: false }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { newsData, wordData, sentenceData, newsVocabData, hotTopics, knowledgeData };
}
