
from __future__ import unicode_literals

from django.db import models
from django.utils import timezone
import datetime as dt


class Akika(models.Model):
    title = models.CharField(max_length=60)
    post = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    @classmethod
    def todays_news(cls):
        today = dt.date.today()
        news = cls.objects.filter(pub_date__date=today)
        return news

    @classmethod
    def days_news(cls, date):
        news = cls.objects.filter(pub_date__date=date)
        return news


class NewsLetterRecipients(models.Model):
    name = models.CharField(max_length=30)
    email = models.EmailField(max_length=30)


class Room(models.Model):
    name = models.TextField()
    label = models.SlugField(unique=True)

    def __unicode__(self):
        return self.label


class Message(models.Model):

    room = models.ForeignKey(
        Room, related_name='messages', on_delete=models.CASCADE,)
    handle = models.TextField()
    message = models.TextField()
    timestamp = models.DateTimeField(default=timezone.now, db_index=True)

    def __unicode__(self):
        return '[{timestamp}] {handle}: {message}'.format(**self.as_dict())

    @property
    def formatted_timestamp(self):
        return self.timestamp.strftime('%b %-d %-I:%M %p')

    def as_dict(self):
        return {'handle': self.handle, 'message': self.message, 'timestamp': self.formatted_timestamp}
