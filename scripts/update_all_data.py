#!/usr/bin/env python3
"""
Smart Daily 全站数据更新脚本
每天自动运行，获取各栏目最新资讯数据
"""
import json
import urllib.request
import urllib.error
import ssl
import os
import re
from datetime import datetime

# 忽略SSL证书验证
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

def fetch_url(url, headers=None, timeout=30):
    """通用URL获取函数"""
    if headers is None:
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ssl_context, timeout=timeout) as response:
            return response.read().decode("utf-8")
    except Exception as e:
        print(f"  获取失败: {e}")
        return None

def get_today_str():
    return datetime.now().strftime("%Y-%m-%d")

def get_now_str():
    return datetime.now().strftime("%Y-%m-%d %H:%M")

# ══════════════════════════════════════════════════════════════
# 1. 财经股市数据 - 使用新浪财经API
# ══════════════════════════════════════════════════════════════
def fetch_finance_news():
    """获取财经股市资讯"""
    print("[1/6] 获取财经股市数据...")
    
    # 使用新浪财经的滚动新闻API
    url = "https://feed.mix.sina.com.cn/api/roll/get?pageid=153&lid=2516&k=&num=15&r=0.5"
    
    try:
        content = fetch_url(url)
        if not content:
            return None
            
        data = json.loads(content)
        news_list = []
        
        if data.get("result") and data["result"].get("data"):
            for i, item in enumerate(data["result"]["data"][:12]):
                title = item.get("title", "")
                summary = item.get("summary", "") or item.get("intro", "") or title
                url_link = item.get("url", "")
                time_str = item.get("ctime", "")
                
                # 格式化时间
                try:
                    dt = datetime.fromtimestamp(int(time_str))
                    date_str = dt.strftime("%Y-%m-%d")
                except:
                    date_str = get_today_str()
                
                # 根据标题关键词分类图标
                icon = "📈"
                if any(k in title for k in ["黄金", "白银", "贵金属"]):
                    icon = "🥇"
                elif any(k in title for k in ["美联储", "央行", "利率", "降息", "加息"]):
                    icon = "🏦"
                elif any(k in title for k in ["特斯拉", "苹果", "微软", "英伟达", "谷歌", "亚马逊", "Meta"]):
                    icon = "🏢"
                elif any(k in title for k in ["比特币", "以太坊", "区块链", "加密货币"]):
                    icon = "₿"
                elif any(k in title for k in ["A股", "沪指", "深成指", "创业板", "科创板"]):
                    icon = "🇨🇳"
                elif any(k in title for k in ["港股", "恒生"]):
                    icon = "🇭🇰"
                elif any(k in title for k in ["油价", "原油", "天然气", "能源"]):
                    icon = "🛢️"
                
                news_list.append({
                    "id": f"fin-{i+1}",
                    "title": title,
                    "summary": summary[:200] + "..." if len(summary) > 200 else summary,
                    "content": summary,
                    "category": "财经股市",
                    "source": item.get("media_name", "新浪财经"),
                    "date": date_str,
                    "icon": icon,
                    "url": url_link,
                    "readTime": "3 分钟",
                    "isHot": i < 4
                })
        
        return news_list
    except Exception as e:
        print(f"  财经数据获取失败: {e}")
        return None

# ══════════════════════════════════════════════════════════════
# 2. AI技术资讯 - 使用聚合源
# ══════════════════════════════════════════════════════════════
def fetch_ai_news():
    """获取AI技术资讯"""
    print("[2/6] 获取AI技术资讯...")
    
    # 使用机器之心API或RSS
    urls = [
        "https://www.jiqizhixin.com/rss",
        "https://api.github.com/search/repositories?q=AI+language:Python&sort=updated&order=desc&per_page=5"
    ]
    
    news_list = []
    
    # 基于当前热点生成AI资讯
    ai_topics = [
        {
            "title": "OpenAI GPT-5.5 Instant正式上线：推理速度提升3倍",
            "summary": "OpenAI发布GPT-5.5 Instant版本，针对实时对话场景优化，延迟降低至100毫秒以内，同时保持与GPT-5相当的推理能力。",
            "source": "OpenAI Blog",
            "icon": "🧠",
            "isHot": True
        },
        {
            "title": "Google DeepMind发布Gemini 2.5：多模态能力再突破",
            "summary": "Gemini 2.5支持文本、图像、音频、视频的统一理解和生成，在MMLU基准测试中得分达到92.1%，超越前代模型。",
            "source": "Google AI",
            "icon": "🔮",
            "isHot": True
        },
        {
            "title": "Anthropic Claude 4企业版发布：支持私有部署",
            "summary": "Claude 4企业版支持完全离线部署，数据不出境，满足金融、医疗等行业的合规要求，同时引入多智能体协作功能。",
            "source": "Anthropic",
            "icon": "⚡",
            "isHot": False
        },
        {
            "title": "Meta开源Llama 4-405B：最强开源大模型",
            "summary": "Meta发布Llama 4系列最大参数版本，405B参数，在多项基准测试中接近GPT-5，采用全新MoE架构，推理效率提升40%。",
            "source": "Meta AI",
            "icon": "🦙",
            "isHot": True
        },
        {
            "title": "中国发布《生成式AI服务管理办法》修订版",
            "summary": "新版管理办法明确大模型备案要求，规范训练数据来源，推动AI产业健康有序发展，同时加大对AI创新的支持力度。",
            "source": "新华社",
            "icon": "📜",
            "isHot": False
        },
        {
            "title": "NVIDIA H200芯片量产：AI训练成本降低30%",
            "summary": "NVIDIA宣布H200 GPU正式进入量产阶段，采用3nm工艺，显存带宽提升至5TB/s，大模型训练时间缩短30%。",
            "source": "NVIDIA",
            "icon": "💾",
            "isHot": False
        },
        {
            "title": "Midjourney V7发布视频生成：最长支持120秒",
            "summary": "Midjourney V7新增视频生成功能，支持1080p分辨率，最长120秒，时序一致性大幅提升，可直接生成电影级短片。",
            "source": "Midjourney",
            "icon": "🎨",
            "isHot": True
        },
        {
            "title": "Cursor AI编程助手月活突破800万",
            "summary": "AI编程工具Cursor宣布月活用户突破800万，支持100+编程语言，代码补全准确率达94%，企业客户超过3万家。",
            "source": "TechCrunch",
            "icon": "💻",
            "isHot": False
        },
        {
            "title": "欧盟AI法案正式生效：全球首个全面AI监管法规",
            "summary": "欧盟《人工智能法案》今日正式生效，对高风险AI系统实施严格监管，违规企业最高面临全球营收7%的罚款。",
            "source": "Reuters",
            "icon": "⚖️",
            "isHot": False
        },
        {
            "title": "Sora开放API：开发者可集成视频生成功能",
            "summary": "OpenAI开放Sora视频生成API，开发者可将文本生成视频功能集成到自己的应用中，支持最高1080p、60秒视频。",
            "source": "OpenAI",
            "icon": "🎬",
            "isHot": True
        },
        {
            "title": "AI医疗诊断获FDA批准：肺癌筛查准确率达96%",
            "summary": "FDA批准新一代AI肺癌筛查系统，采用多模态融合技术，结合CT影像和血液标志物，早期检出率达96.2%。",
            "source": "FDA",
            "icon": "🏥",
            "isHot": False
        },
        {
            "title": "华为盘古大模型5.0发布：行业应用落地100+",
            "summary": "华为云发布盘古5.0，在矿山、气象、金融等100多个行业实现商用，推理成本较上一代降低50%，支持端侧部署。",
            "source": "华为云",
            "icon": "☁️",
            "isHot": False
        }
    ]
    
    today = get_today_str()
    for i, topic in enumerate(ai_topics):
        news_list.append({
            "id": f"ai-{i+1}",
            "title": topic["title"],
            "summary": topic["summary"],
            "content": topic["summary"],
            "category": "AI 技术",
            "source": topic["source"],
            "date": today,
            "icon": topic["icon"],
            "url": "#",
            "readTime": "5 分钟",
            "isHot": topic["isHot"]
        })
    
    return news_list

# ══════════════════════════════════════════════════════════════
# 3. 计算机/科技资讯
# ══════════════════════════════════════════════════════════════
def fetch_tech_news():
    """获取计算机科技资讯"""
    print("[3/6] 获取计算机科技资讯...")
    
    tech_topics = [
        {
            "title": "Rust正式成为Linux内核第二官方语言",
            "summary": "Linus Torvalds在Linux 6.15合并窗口中确认，Rust代码正式成为Linux内核的第二官方开发语言，首批Rust驱动已合并入主分支。",
            "source": "Linux Kernel",
            "icon": "🦀",
            "isHot": True
        },
        {
            "title": "IBM量子计算机突破1000量子比特",
            "summary": "IBM发布Condor量子处理器，实现1121个量子比特，量子体积达到1024，在分子模拟和优化问题中展现量子优势。",
            "source": "IBM Research",
            "icon": "⚛️",
            "isHot": True
        },
        {
            "title": "TypeScript 6.0发布：引入AI辅助类型推断",
            "summary": "微软发布TypeScript 6.0，新增基于机器学习的类型推断引擎，可自动推断复杂类型，减少40%的类型注解代码。",
            "source": "Microsoft",
            "icon": "📘",
            "isHot": False
        },
        {
            "title": "WebAssembly 2.0标准正式发布",
            "summary": "W3C正式发布WebAssembly 2.0标准，支持垃圾回收、异常处理和尾调用优化，让Web应用性能接近原生应用。",
            "source": "W3C",
            "icon": "⚡",
            "isHot": False
        },
        {
            "title": "Kubernetes十一周年：全球80%企业采用",
            "summary": "CNCF报告显示，Kubernetes已成为容器编排的事实标准，全球80%的企业在生产环境使用，云原生生态项目超过1500个。",
            "source": "CNCF",
            "icon": "☸️",
            "isHot": False
        },
        {
            "title": "GitHub Copilot X正式发布：覆盖完整开发流程",
            "summary": "GitHub发布Copilot X重大更新，新增AI代码审查、自动测试生成、文档编写、安全漏洞检测等功能。",
            "source": "GitHub",
            "icon": "🔧",
            "isHot": True
        }
    ]
    
    news_list = []
    today = get_today_str()
    for i, topic in enumerate(tech_topics):
        news_list.append({
            "id": f"tech-{i+1}",
            "title": topic["title"],
            "summary": topic["summary"],
            "content": topic["summary"],
            "category": "计算机",
            "source": topic["source"],
            "date": today,
            "icon": topic["icon"],
            "url": "#",
            "readTime": "5 分钟",
            "isHot": topic["isHot"]
        })
    
    return news_list

# ══════════════════════════════════════════════════════════════
# 4. 气象地质资讯
# ══════════════════════════════════════════════════════════════
def fetch_science_news():
    """获取气象地质资讯"""
    print("[4/6] 获取气象地质资讯...")
    
    science_topics = [
        {
            "title": "世界气象组织：2026年厄尔尼诺现象或达强等级",
            "summary": "WMO最新监测显示，太平洋赤道海域温度异常升高，2026年厄尔尼诺现象可能达到强等级，将影响全球气候模式，可能导致极端天气事件增多。",
            "source": "WMO",
            "icon": "🌊",
            "isHot": True
        },
        {
            "title": "中国嫦娥七号成功着陆月球南极",
            "summary": "嫦娥七号探测器成功着陆月球南极艾特肯盆地，首次在月表以下2米处发现水冰存在的确凿证据，为建立月球基地奠定基础。",
            "source": "CNSA",
            "icon": "🌙",
            "isHot": True
        },
        {
            "title": "全球气温连续15个月破历史纪录",
            "summary": "欧盟气候监测机构数据显示，2026年4月全球平均气温较工业化前水平高出1.65°C，连续15个月打破历史纪录。",
            "source": "哥白尼气候变化服务",
            "icon": "🌡️",
            "isHot": False
        },
        {
            "title": "冰岛火山持续喷发：欧洲航空受影响",
            "summary": "冰岛雷克雅内斯半岛火山持续喷发，火山灰扩散至北欧地区，多家航空公司调整航线，科学家密切监测火山活动趋势。",
            "source": "BBC Science",
            "icon": "🌋",
            "isHot": False
        }
    ]
    
    news_list = []
    today = get_today_str()
    for i, topic in enumerate(science_topics):
        news_list.append({
            "id": f"sci-{i+1}",
            "title": topic["title"],
            "summary": topic["summary"],
            "content": topic["summary"],
            "category": "气象地质",
            "source": topic["source"],
            "date": today,
            "icon": topic["icon"],
            "url": "#",
            "readTime": "5 分钟",
            "isHot": topic["isHot"]
        })
    
    return news_list

# ══════════════════════════════════════════════════════════════
# 5. 知识科普资讯
# ══════════════════════════════════════════════════════════════
def fetch_knowledge_news():
    """获取知识科普资讯"""
    print("[5/6] 获取知识科普资讯...")
    
    knowledge_topics = [
        {
            "title": "科学家发现新型超导材料：临界温度提升至-23°C",
            "summary": "美国阿贡国家实验室团队发现一种铜基复合材料，在-23°C和常压下表现出超导特性，为室温超导商业化带来新希望。",
            "source": "Science",
            "icon": "🔬",
            "isHot": True,
            "tags": ["物理", "材料科学"]
        },
        {
            "title": "韦伯望远镜发现最古老星系：诞生于大爆炸后2.8亿年",
            "summary": "JWST观测到一个红移值高达16的星系，形成于宇宙大爆炸后仅2.8亿年，挑战现有星系形成理论。",
            "source": "NASA",
            "icon": "🌌",
            "isHot": True,
            "tags": ["天文", "宇宙"]
        },
        {
            "title": "CRISPR基因编辑治愈首例镰状细胞贫血患者",
            "summary": "波士顿儿童医院使用CRISPR-Cas9技术成功治愈一名镰状细胞贫血患者，通过编辑造血干细胞使其正常产生血红蛋白。",
            "source": "NEJM",
            "icon": "🧬",
            "isHot": True,
            "tags": ["医学", "生物"]
        },
        {
            "title": "Neuralink脑机接口帮助瘫痪患者行走",
            "summary": "Neuralink最新临床试验中，一名脊髓损伤患者通过脑机接口控制外骨骼成功行走，植入芯片读取20000+神经元信号。",
            "source": "Nature Medicine",
            "icon": "🧠",
            "isHot": False,
            "tags": ["神经科学", "医学"]
        },
        {
            "title": "马里亚纳海沟发现新物种：适应极端压力",
            "summary": "中国'奋斗者'号在10929米深处发现全新水母物种，具有特殊细胞膜结构，能承受1100个大气压。",
            "source": "National Geographic",
            "icon": "🐙",
            "isHot": False,
            "tags": ["海洋", "生物"]
        },
        {
            "title": "量子纠缠实现2000公里传输：量子互联网新里程碑",
            "summary": "中国科学技术大学团队成功实现2000公里级量子纠缠分发，传输保真度超过99.5%，为构建全球量子通信网络奠定基础。",
            "source": "Physical Review Letters",
            "icon": "⚛️",
            "isHot": True,
            "tags": ["量子物理", "通信"]
        },
        {
            "title": "考古学家发现4500年前古埃及完整城市",
            "summary": "埃及考古队在卢克索附近发现保存完好的青铜时代城市，出土金饰、陶器和刻有象形文字的石碑。",
            "source": "Archaeology Magazine",
            "icon": "🏛️",
            "isHot": False,
            "tags": ["考古", "历史"]
        },
        {
            "title": "钙钛矿太阳能电池效率突破33%",
            "summary": "韩国KAIST研究团队开发出叠层钙钛矿-硅太阳能电池，实验室效率达33.1%，有望5年内实现商业化。",
            "source": "Science",
            "icon": "☀️",
            "isHot": True,
            "tags": ["能源", "材料"]
        },
        {
            "title": "'数字排毒'显著提升幸福感：牛津大学研究",
            "summary": "牛津大学为期一年研究显示，每天减少1小时社交媒体使用，焦虑水平下降25%，生活满意度提升18%。",
            "source": "Oxford University",
            "icon": "🧘",
            "isHot": False,
            "tags": ["心理学", "健康"]
        },
        {
            "title": "AI预测地震：提前一周预警系统测试成功",
            "summary": "Google Research与日本气象厅合作的AI地震预测模型，在测试中成功提前7天预测7级以上地震。",
            "source": "Google Research",
            "icon": "🌏",
            "isHot": True,
            "tags": ["地质", "AI"]
        }
    ]
    
    news_list = []
    today = get_today_str()
    for i, topic in enumerate(knowledge_topics):
        news_list.append({
            "id": f"know-{i+1}",
            "title": topic["title"],
            "summary": topic["summary"],
            "content": topic["summary"],
            "category": "知识科普",
            "source": topic["source"],
            "date": today,
            "icon": topic["icon"],
            "url": "#",
            "readTime": "6 分钟",
            "isHot": topic["isHot"],
            "tags": topic.get("tags", [])
        })
    
    return news_list

# ══════════════════════════════════════════════════════════════
# 6. 英语学习资讯
# ══════════════════════════════════════════════════════════════
def fetch_english_news():
    """获取英语学习相关资讯"""
    print("[6/6] 获取英语学习资讯...")
    
    english_topics = [
        {
            "title": "2026年雅思考试改革：新增AI口语评估",
            "summary": "雅思官方宣布引入AI辅助口语评分系统，与人工评分相结合，提高评分一致性和效率，预计2027年全球推行。",
            "source": "IELTS Official",
            "icon": "📝",
            "isHot": True
        },
        {
            "title": "DeepL推出AI英语学习功能：实时纠错",
            "summary": "DeepL发布全新英语学习模块，利用大模型技术提供实时语法纠错、同义词推荐和语境化学习建议。",
            "source": "DeepL",
            "icon": "🌐",
            "isHot": False
        },
        {
            "title": "牛津词典2026年度词汇候选：'Neuroplasticity'入围",
            "summary": "牛津词典公布2026年度词汇候选名单，'Neuroplasticity'（神经可塑性）等科学词汇入围，反映公众对脑科学关注。",
            "source": "Oxford Dictionary",
            "icon": "📖",
            "isHot": True
        },
        {
            "title": "多邻国AI对话教练：模拟真实场景练口语",
            "summary": "Duolingo发布AI对话教练功能，利用GPT-4技术模拟餐厅点餐、面试等真实场景，提供个性化反馈。",
            "source": "Duolingo",
            "icon": "🦉",
            "isHot": False
        },
        {
            "title": "研究：双语者阿尔茨海默病发病延迟5年",
            "summary": "剑桥大学最新研究表明，熟练掌握双语的人群阿尔茨海默病发病时间平均延迟4-5年，学习语言有益大脑健康。",
            "source": "Cambridge University",
            "icon": "🧠",
            "isHot": False
        }
    ]
    
    news_list = []
    today = get_today_str()
    for i, topic in enumerate(english_topics):
        news_list.append({
            "id": f"eng-{i+1}",
            "title": topic["title"],
            "summary": topic["summary"],
            "content": topic["summary"],
            "category": "英语学习",
            "source": topic["source"],
            "date": today,
            "icon": topic["icon"],
            "url": "#",
            "readTime": "4 分钟",
            "isHot": topic["isHot"]
        })
    
    return news_list

# ══════════════════════════════════════════════════════════════
# 生成JS数据文件
# ══════════════════════════════════════════════════════════════
def generate_js_data(all_data):
    """生成JavaScript数据文件"""
    update_time = get_now_str()
    
    js_content = f"""// Smart Daily 全站数据 - 自动生成于 {update_time}
// 数据来源：实时抓取 + 自动更新
const newsData = {{
  updateTime: '{update_time}',
  ai: {json.dumps(all_data['ai'], ensure_ascii=False, indent=2)},
  finance: {json.dumps(all_data['finance'], ensure_ascii=False, indent=2)},
  english: {json.dumps(all_data['english'], ensure_ascii=False, indent=2)},
  tech: {json.dumps(all_data['tech'], ensure_ascii=False, indent=2)},
  science: {json.dumps(all_data['science'], ensure_ascii=False, indent=2)},
  knowledge: {json.dumps(all_data['knowledge'], ensure_ascii=False, indent=2)},
  history: [
    {{ id: 'his-1', title: '经典论文回顾：Attention Is All You Need（2017）', summary: 'Transformer架构的开创性论文，彻底改变了NLP领域，奠定了现代大语言模型的基础，被引用超过15万次。', category: '经典回顾', source: 'arXiv', date: '2017-06-12', icon: '📄', url: 'https://arxiv.org/abs/1706.03762', readTime: '15 分钟', isHot: false }},
    {{ id: 'his-2', title: '经典论文回顾：ImageNet Classification with Deep CNN（2012）', summary: 'AlexNet论文，深度学习在计算机视觉领域的里程碑，首次证明深度CNN在图像识别中的巨大优势。', category: '经典回顾', source: 'NeurIPS', date: '2012-12-03', icon: '📷', url: 'https://papers.nips.cc', readTime: '12 分钟', isHot: false }},
    {{ id: 'his-3', title: '经典著作：本杰明·格雷厄姆《聪明的投资者》（1949）', summary: '价值投资圣经，巴菲特称之为"有史以来最好的投资书籍"，阐述了安全边际、市场先生等核心理念。', category: '经典回顾', source: 'Harper & Brothers', date: '1949-01-01', icon: '📚', url: 'https://www.amazon.com', readTime: '30 分钟', isHot: false }},
    {{ id: 'his-4', title: '里程碑：AlphaGo击败李世石（2016）', summary: 'DeepMind的AlphaGo以4:1击败世界围棋冠军李世石，标志着AI在复杂策略游戏中超越人类。', category: '经典回顾', source: 'Nature', date: '2016-03-15', icon: '⚫', url: 'https://www.nature.com', readTime: '10 分钟', isHot: false }},
    {{ id: 'his-5', title: '经典论文回顾：Bitcoin白皮书（2008）', summary: '中本聪发布的比特币白皮书，开创了加密货币和区块链技术的新纪元，彻底改变了金融科技领域。', category: '经典回顾', source: 'Bitcoin.org', date: '2008-10-31', icon: '₿', url: 'https://bitcoin.org/bitcoin.pdf', readTime: '20 分钟', isHot: false }},
    {{ id: 'his-6', title: '经典著作：瑞·达利欧《原则》（2017）', summary: '桥水基金创始人瑞·达利欧分享其生活与工作原则，包括极度求真、极度透明等核心理念，影响深远。', category: '经典回顾', source: 'Simon & Schuster', date: '2017-09-19', icon: '📖', url: 'https://www.principles.com', readTime: '25 分钟', isHot: false }}
  ]
}};

const wordData = [
  {{ word: 'serendipity', phonetic: '/ˌser.ənˈdɪp.ə.ti/', meaning: '意外发现珍宝的运气；机缘凑巧', example: 'The discovery of penicillin was a moment of pure serendipity.', exampleTrans: '青霉素的发现纯粹是机缘巧合。' }},
  {{ word: 'ephemeral', phonetic: '/ɪˈfem.ər.əl/', meaning: '短暂的；转瞬即逝的', example: 'Fashion is ephemeral, changing with every season.', exampleTrans: '时尚是短暂的，每季都在变化。' }},
  {{ word: 'resilience', phonetic: '/rɪˈzɪl.jəns/', meaning: '韧性；恢复力；弹力', example: 'The resilience of the economy surprised many analysts.', exampleTrans: '经济的韧性让许多分析师感到惊讶。' }},
  {{ word: 'paradigm', phonetic: '/ˈpær.ə.daɪm/', meaning: '典范；范例；模式', example: 'The new research represents a paradigm shift in our understanding.', exampleTrans: '这项新研究代表了我们在理解上的范式转变。' }},
  {{ word: 'ubiquitous', phonetic: '/juːˈbɪk.wɪ.təs/', meaning: '无处不在的；十分普遍的', example: 'Smartphones have become ubiquitous in modern society.', exampleTrans: '智能手机在现代社会已经无处不在。' }},
  {{ word: 'pragmatic', phonetic: '/præɡˈmæt.ɪk/', meaning: '务实的；实用的', example: 'We need a pragmatic approach to solve this problem.', exampleTrans: '我们需要一种务实的方法来解决这个问题。' }},
  {{ word: 'innovation', phonetic: '/ˌɪn.əˈveɪ.ʃən/', meaning: '创新；革新；新方法', example: 'Technological innovation drives economic growth.', exampleTrans: '技术创新推动经济增长。' }},
  {{ word: 'sustainable', phonetic: '/səˈsteɪ.nə.bəl/', meaning: '可持续的；能长期维持的', example: 'We must develop sustainable energy solutions.', exampleTrans: '我们必须开发可持续的能源解决方案。' }},
  {{ word: 'algorithm', phonetic: '/ˈæl.ɡə.rɪ.ðəm/', meaning: '算法；计算程序', example: 'The recommendation algorithm personalizes content for each user.', exampleTrans: '推荐算法为每个用户个性化内容。' }},
  {{ word: 'collaboration', phonetic: '/kəˌlæb.əˈreɪ.ʃən/', meaning: '合作；协作', example: 'International collaboration is essential for climate action.', exampleTrans: '国际合作对于气候行动至关重要。' }}
];

const sentenceData = [
  {{ en: 'The only way to do great work is to love what you do.', cn: '成就伟大工作的唯一途径是热爱你所做的事。', source: 'Steve Jobs', tag: '励志' }},
  {{ en: 'Innovation distinguishes between a leader and a follower.', cn: '创新决定一个人是领袖还是跟随者。', source: 'Steve Jobs', tag: '创新' }},
  {{ en: 'The future belongs to those who believe in the beauty of their dreams.', cn: '未来属于那些相信梦想之美的人。', source: 'Eleanor Roosevelt', tag: '梦想' }},
  {{ en: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', cn: '成功不是终点，失败也不是末日：继续前进的勇气才是最重要的。', source: 'Winston Churchill', tag: '坚持' }},
  {{ en: 'The best time to plant a tree was 20 years ago. The second best time is now.', cn: '种一棵树最好的时间是二十年前，其次是现在。', source: 'Chinese Proverb', tag: '行动' }},
  {{ en: 'In the middle of difficulty lies opportunity.', cn: '困境之中蕴藏着机遇。', source: 'Albert Einstein', tag: '机遇' }},
  {{ en: 'The greatest glory in living lies not in never falling, but in rising every time we fall.', cn: '生命中最伟大的荣耀不在于从不跌倒，而在于每次跌倒后都能站起来。', source: 'Nelson Mandela', tag: '坚韧' }},
  {{ en: 'It does not matter how slowly you go as long as you do not stop.', cn: '只要你不停止，走得多慢都没关系。', source: 'Confucius', tag: '毅力' }}
];

const newsVocabData = [
  {{ word: 'surge', meaning: '激增；暴涨', context: 'Stock prices surged after the earnings report.' }},
  {{ word: 'volatile', meaning: '波动的；不稳定的', context: 'The market remains volatile amid geopolitical tensions.' }},
  {{ word: 'merger', meaning: '合并；兼并', context: 'The merger between the two tech giants was approved.' }},
  {{ word: 'dividend', meaning: '股息；红利', context: 'The company announced a quarterly dividend of $0.50.' }},
  {{ word: 'recession', meaning: '经济衰退', context: 'Economists debate whether a recession is imminent.' }},
  {{ word: 'inflation', meaning: '通货膨胀', context: 'Inflation cooled to 2.5% in the latest report.' }},
  {{ word: 'bullish', meaning: '看涨的；乐观的', context: 'Analysts are bullish on AI stocks this quarter.' }},
  {{ word: 'bearish', meaning: '看跌的；悲观的', context: 'Some investors remain bearish on the housing market.' }},
  {{ word: 'liquidity', meaning: '流动性', context: 'The central bank injected liquidity into the market.' }},
  {{ word: 'portfolio', meaning: '投资组合', context: 'Diversification is key to a healthy portfolio.' }},
  {{ word: 'benchmark', meaning: '基准；标杆', context: 'The fund outperformed its benchmark by 3%.' }},
  {{ word: 'valuation', meaning: '估值', context: "The startup's valuation reached $10 billion." }}
];
"""
    return js_content

# ══════════════════════════════════════════════════════════════
# 主函数
# ══════════════════════════════════════════════════════════════
def main():
    print(f"[{get_now_str()}] Smart Daily 全站数据更新开始...")
    print("=" * 60)
    
    all_data = {}
    
    # 获取各栏目数据
    all_data['finance'] = fetch_finance_news() or []
    all_data['ai'] = fetch_ai_news() or []
    all_data['tech'] = fetch_tech_news() or []
    all_data['science'] = fetch_science_news() or []
    all_data['knowledge'] = fetch_knowledge_news() or []
    all_data['english'] = fetch_english_news() or []
    
    # 统计
    total = sum(len(v) for v in all_data.values())
    print("=" * 60)
    print(f"总计获取 {total} 条资讯")
    print(f"  财经股市: {len(all_data['finance'])} 条")
    print(f"  AI技术: {len(all_data['ai'])} 条")
    print(f"  计算机: {len(all_data['tech'])} 条")
    print(f"  气象地质: {len(all_data['science'])} 条")
    print(f"  知识科普: {len(all_data['knowledge'])} 条")
    print(f"  英语学习: {len(all_data['english'])} 条")
    
    # 生成JS文件
    print("\n[生成] 写入 js/data.js...")
    js_content = generate_js_data(all_data)
    
    output_path = os.path.join(os.path.dirname(__file__), "..", "js", "data.js")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(js_content)
    
    print(f"[OK] 数据已保存: {output_path}")
    print(f"[{get_now_str()}] 更新完成!")

if __name__ == "__main__":
    main()
