# -*- coding: utf-8 -*-

import hashlib
import time

import requests


def get_token(ss):
    res = dict(k.split('=') for k in ss.split('&'))
    ss = ''
    for key in sorted(res.keys()):
        value = res[key]
        ss += value
    print(ss)
    ss += 'xgcpyh666'
    m = hashlib.md5()
    m.update(bytes(ss, encoding='utf8'))
    return m.hexdigest()


headers = {
    'Host': 'www.95fenapp.com',
    'user-agent': 'Android8.1.0 google CPU_ABI armeabi-v7a CPU_ABI2 armeabi HARDWARE sailfish MODEL Pixel fen95/1.2.7 dc(Android,645f1789d2c3a1e0,huawei)',
    'fen95-host': 'default',
}
url_path = f'page=1&page_size=20&scene=1&scene_type=95fen_android_home_personal&sn=HomeRecommendList&sort=new&timestamp={int(time.time() * 1000)}'  # 1593611869091
url_path = url_path + '&token=' + get_token(url_path)
url = f'https://www.95fenapp.com/api_goods/list/v3.0?{url_path}'
print(url_path)
response = requests.get(url, headers=headers)

print(response.text)
