"""
事件处理器
接收用户信息和设备信息等
"""

import lyrebird
from lyrebird_api_coverage.client.context import app_context


def android_handler(event):
    for event_item in event:
        # id 为设备唯一标识,上下文中若有重复的要进行移除重新添加
        filter_list = list(filter(lambda x: x.get('id') == event_item.get('id'), app_context.info))
        if filter_list:
            app_context.info.remove(filter_list[0])
        event_item['info']['platform'] = 'Android'
        app_context.info.append(event_item)

def ios_handler(event):
    for event_item in event:
        # id为设备唯一标识,上下文中若有重复的要进行移除重新添加
        filter_list = list(filter(lambda x: x.get('id') == event_item.get('id'), app_context.info))
        if filter_list:
            app_context.info.remove(filter_list[0])
        event_item['info']['platform'] = 'iOS'
        app_context.info.append(event_item)

def event_subscribe():
    lyrebird.subscribe('android.device', android_handler)
    lyrebird.subscribe('ios.device', ios_handler)
