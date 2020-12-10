"""
Django settings for akikaproject project.
Generated by 'django-admin startproject' using Django 3.1.3.
For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/
For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""


import os
# from decouple import
# import dj_database_url
# from decouple import config,Csv

# MODE=config("MODE", default="dev")
# SECRET_KEY = config('SECRET_KEY')
# DEBUG = config('DEBUG', default=False, cast=bool)
# # development
# if config('MODE')=="dev":
#    DATABASES = {
#        'default': {
#            'ENGINE': 'django.db.backends.postgresql_psycopg2',
#            'NAME': config('akika'),
#            'USER': config('laetitia'),
#            'PASSWORD': config('cool'),
#         #    'HOST': config('DB_HOST'),
#         #    'PORT': '',
#        }
       
#    }
# # production
# else:
#    DATABASES = {
#        'default': dj_database_url.config(
#         #    default=config('DATABASE_URL')
#        )
#    }

# db_from_env = dj_database_url.config(conn_max_age=500)
# DATABASES['default'].update(db_from_env)

# ALLOWED_HOSTS = config('ALLOWED_HOSTS', cast=Csv())

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '(5%8p#(we#2@&wxd0k)k^ufr-heih-js*@c+l4+v_e4+94qdjc'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG =True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    # 'registration',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sitemaps',
    'akikaapp',
    'bootstrap3',
    'channels',
    'django_seo_js',


]
SEO_JS_PRERENDER_TOKEN = "123456789abcdefghijkl"  # Really, put this in your env, not your codebase.





MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',

]

ROOT_URLCONF = 'akikaproject.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'akikaproject.wsgi.application'

ASGI_APPLICATION = 'akikaproject.routing.application'
# CHANNEL_LAYERS = {
#     'default': {
#         'BACKEND': 'channels_redis.core.RedisChannelLayer',
#         'CONFIG': {
#             "hosts": [('127.0.0.1', 6379)],
#         },
#     },
# }
# Channel settings

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },
    },
}


EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2',
#         'NAME': 'akika',
#         'USER': 'laetitia',
#         'PASSWORD': 'cool',
    
#     }
# }
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'd26706lb3uqrkn',
        'USER': 'kizbkxftbkebbn',
        'PASSWORD': 'e6a787f881468700cd7b349a67c19fa16ab547dbaa70b5ebc66e3321a46a44ae',
        'PORT':'5432',
        'HOST':'ec2-52-44-235-121.compute-1.amazonaws.com'
    
    }
}
# postgres://kizbkxftbkebbn:e6a787f881468700cd7b349a67c19fa16ab547dbaa70b5ebc66e3321a46a44ae@ec2-52-44-235-121.compute-1.amazonaws.com:5432/d26706lb3uqrkn

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]
LOGIN_REDIRECT_URL = "home"
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'

# Extra places for collectstatic to find static files.
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'static'),
)
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'uwizelaetitia@gmail.com'
EMAIL_HOST_PASSWORD = 'takecare1'  # This is not your gmail password.
EMAIL_USE_TLS = True