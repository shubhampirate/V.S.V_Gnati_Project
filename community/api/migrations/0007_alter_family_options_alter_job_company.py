# Generated by Django 4.1.7 on 2023-03-02 14:00

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_user_related_company_user_related_matrimony'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='family',
            options={'verbose_name_plural': 'Families'},
        ),
        migrations.AlterField(
            model_name='job',
            name='company',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.company'),
        ),
    ]
