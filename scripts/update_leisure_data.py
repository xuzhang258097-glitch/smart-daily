#!/usr/bin/env python3
"""
课后时间数据更新脚本
每天上午10点自动运行，获取B站热门视频和小宇宙热门播客数据
"""
import json
import urllib.request
import urllib.error
import ssl
import os
from datetime import datetime

# 忽略SSL证书验证（如果需要）
ssl_context = ssl.create_default_context()
ssl_context.check_hostname = False
ssl_context.verify_mode = ssl.CERT_NONE

def fetch_bilibili_hot():
    """获取B站热门视频"""
    url = "https://api.bilibili.com/x/web-interface/popular?ps=15"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://www.bilibili.com/",
    }
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ssl_context, timeout=30) as response:
            data = json.loads(response.read().decode("utf-8"))
            if data.get("code") == 0:
                videos = []
                for item in data["data"]["list"]:
                    videos.append({
                        "bvid": item.get("bvid", ""),
                        "title": item.get("title", ""),
                        "desc": item.get("desc", ""),
                        "pic": item.get("pic", ""),
                        "duration": item.get("duration", 0),
                        "owner": {
                            "name": item.get("owner", {}).get("name", ""),
                            "face": item.get("owner", {}).get("face", "")
                        },
                        "stat": {
                            "view": item.get("stat", {}).get("view", 0),
                            "like": item.get("stat", {}).get("like", 0),
                            "danmaku": item.get("stat", {}).get("danmaku", 0)
                        },
                        "tname": item.get("tname", ""),
                        "pubdate": item.get("pubdate", 0),
                        "rcmd_reason": item.get("rcmd_reason", {}).get("content", "")
                    })
                return videos
    except Exception as e:
        print(f"获取B站数据失败: {e}")
    return None

def fetch_xiaoyuzhou_hot():
    """获取小宇宙热门播客"""
    url = "https://api.xyzrank.top/v1/stats?sort_by=latest_count&limit=15"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
    }
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ssl_context, timeout=30) as response:
            data = json.loads(response.read().decode("utf-8"))
            podcasts = []
            for item in data.get("data", []):
                podcasts.append({
                    "podcast_id": item.get("podcast_id", ""),
                    "title": item.get("title", ""),
                    "url": item.get("url", ""),
                    "latest_count": item.get("latest_count", 0),
                    "daily_change": item.get("daily_change", 0),
                    "monthly_change": item.get("monthly_change", 0),
                    "updated_at": item.get("updated_at", "")
                })
            return podcasts
    except Exception as e:
        print(f"获取小宇宙数据失败: {e}")
    return None

def format_number(num):
    """格式化数字，如 1500000 -> 150万"""
    if num >= 10000:
        return f"{num / 10000:.1f}万".replace(".0万", "万")
    return str(num)

def format_duration(seconds):
    """格式化视频时长"""
    m = seconds // 60
    s = seconds % 60
    return f"{m}:{s:02d}"

def generate_js_data(bilibili_data, xiaoyuzhou_data):
    """生成JavaScript数据文件内容"""
    update_time = datetime.now().strftime("%Y-%m-%d %H:%M")

    js_content = f"""// 课后时间数据 - 自动生成于 {update_time}
// 数据来源：B站热门视频 + 小宇宙播客榜单
const leisureData = {{
  updateTime: '{update_time}',
  bilibili: {json.dumps(bilibili_data or [], ensure_ascii=False, indent=2)},
  podcast: {json.dumps(xiaoyuzhou_data or [], ensure_ascii=False, indent=2)}
}};

// 格式化工具函数
function formatLeisureNumber(num) {{
  if (num >= 10000) return (num / 10000).toFixed(1).replace('.0', '') + '万';
  return num.toString();
}}

function formatDuration(seconds) {{
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m + ':' + (s < 10 ? '0' : '') + s;
}}
"""
    return js_content

def main():
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Start updating leisure data...")

    bilibili_data = fetch_bilibili_hot()
    xiaoyuzhou_data = fetch_xiaoyuzhou_hot()

    if bilibili_data:
        print(f"[OK] Got {len(bilibili_data)} Bilibili videos")
    else:
        print("[WARN] Bilibili data failed, will use cached data")

    if xiaoyuzhou_data:
        print(f"[OK] Got {len(xiaoyuzhou_data)} Xiaoyuzhou podcasts")
    else:
        print("[WARN] Xiaoyuzhou data failed, will use cached data")

    # 生成JS文件
    js_content = generate_js_data(bilibili_data, xiaoyuzhou_data)

    # 写入文件
    output_path = os.path.join(os.path.dirname(__file__), "..", "js", "data-leisure.js")
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(js_content)

    print(f"[OK] Data saved to: {output_path}")
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Done!")

if __name__ == "__main__":
    main()
