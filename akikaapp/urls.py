from django.conf.urls import url, include
from django.contrib.auth import views as auth_views
from django.apps import apps
from . import views
from django.urls import path, re_path
# ...
# from django.contrib.flatpages import views as flat_views
# from django.contrib.sitemaps.views import sitemap
# from .sitemap import PostSitemap

app_name = 'akikaapp'


urlpatterns = [
    path('', views.covid_19, name='home'),
    path('chat/', views.chat, name='chat'),

    path('signup/', views.signup, name='signup'),
    path('login/', views.login_view, name='login'),
    # path('CustomLoginView/',views.CustomLoginView,name='CustomLoginView'),
    path('logout/', views.logout_view, name='logout'),
    path('news_today/', views.covid_19, name='news_today'),
    # path('^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
    #     views.activate, name='activat'),
    path('activate/<str:uidb64>/<str:token>/', views.activate, name="activate"),
    path('<str:room_name>/', views.room, name='room'),


    # SEO

    # path('sitemap\.xml$', sitemap, {'sitemaps': {'entry': EntrySitemap}},
    #     name='django.contrib.sitemaps.views.sitemap')
]
