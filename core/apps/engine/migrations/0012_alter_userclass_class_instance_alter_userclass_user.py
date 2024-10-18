# Generated by Django 4.2.7 on 2024-10-16 04:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('engine', '0011_remove_user_user_class_remove_userclass_class_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userclass',
            name='class_instance',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_classes', to='engine.class'),
        ),
        migrations.AlterField(
            model_name='userclass',
            name='user',
            field=models.ForeignKey(blank=True, default=False, on_delete=django.db.models.deletion.CASCADE, related_name='user_classes', to=settings.AUTH_USER_MODEL),
        ),
    ]