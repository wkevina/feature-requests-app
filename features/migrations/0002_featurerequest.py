# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-04-08 21:14
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('features', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='FeatureRequest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='Title')),
                ('description', models.TextField(verbose_name='Description')),
                ('client_priority', models.PositiveIntegerField(verbose_name='Client Priority')),
                ('target_date', models.DateField(verbose_name='Target Date')),
                ('ticket_url', models.URLField(blank=True, verbose_name='Ticket URL')),
                ('client', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='features.Client', verbose_name='Client')),
                ('product_area', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='features.ProductArea', verbose_name='Product Area')),
            ],
        ),
    ]
