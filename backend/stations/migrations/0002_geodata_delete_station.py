# Generated by Django 5.0.6 on 2024-06-13 16:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stations', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GeoData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('objectid', models.IntegerField()),
                ('station_code', models.CharField(max_length=20)),
                ('station_name', models.CharField(max_length=100)),
                ('station_type', models.CharField(max_length=50)),
                ('lat', models.FloatField()),
                ('long', models.FloatField()),
                ('basin_name', models.CharField(max_length=200)),
                ('sub_basin_name', models.CharField(max_length=200)),
                ('created_date', models.DateTimeField()),
                ('state_name', models.CharField(max_length=100)),
                ('geometry', models.JSONField()),
            ],
        ),
        migrations.DeleteModel(
            name='Station',
        ),
    ]
