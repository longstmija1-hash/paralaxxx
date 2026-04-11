import httpx
import os
import logging

logger = logging.getLogger(__name__)

async def send_telegram_notification(lead_data: dict):
    bot_token = os.getenv("TELEGRAM_BOT_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    
    if not bot_token or not chat_id:
        logger.warning("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set in backend .env. Skipping telegram notification.")
        return
        
    tariff_str = f"\n💳 Тариф: {lead_data['tariff']}" if lead_data.get('tariff') else ""
    
    formatted_message = f"""🚨 <b>НОВАЯ ЗАЯВКА: ОБРАБОТАТЬ!!!</b>
👤 Родитель: {lead_data['parent_name']}
👶 Ребенок: {lead_data['child_name']} ({lead_data['child_age']} лет)
🎯 Программа: {lead_data['program']}{tariff_str}
📱 Телефон: {lead_data['phone']}
🔗 Соцсети: {lead_data['social'] or 'N/A'}"""

    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": formatted_message,
        "parse_mode": "HTML"
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, timeout=5.0)
            if response.status_code != 200:
                logger.error(f"Failed to send telegram msg. Status: {response.status_code}, Body: {response.text}")
    except Exception as e:
        logger.error(f"Telegram notification error: {str(e)}")
