# Generated by Django 4.1.7 on 2023-04-04 05:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0007_alter_family_options_alter_job_company"),
    ]

    operations = [
        migrations.AddField(
            model_name="matrimony",
            name="dob",
            field=models.DateField(blank=True, null=True),
        ),
    ]
