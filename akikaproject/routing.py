
import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import akikaapp.routing


application = ProtocolTypeRouter({
#   "http": get_asgi_application(),
  "websocket": AuthMiddlewareStack(
        URLRouter(
            akikaapp.routing.websocket_urlpatterns
        )
    ),
})
# from channels.routing import ProtocolTypeRouter, URLRouter
# from channels.auth import AuthMiddlewareStack

# from django.urls import path
# from akikaapp import consumers

# websocket_urlPattern = [
#     # path('ws/polData/', consumer.DashConsumer),
#     path('ws/akikaapp/(<str:room_name>)/', consumers.DashConsumer),

# ]

# application = ProtocolTypeRouter({
#     # 'http':
#     'websocket': AuthMiddlewareStack(URLRouter(websocket_urlPattern))

# })
# import os

# from channels.routing import ProtocolTypeRouter, URLRouter
# from django.core.asgi import get_asgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'akikaproject.settings')
# routes = [

# ]
# application = ProtocolTypeRouter({
#     "websockets": URLRouter(routes),
# })