from django.contrib import admin
from .models import User, Family, OccupationAddress, Event, Company, Job, Matrimony

# Register your models here.
admin.site.register(User)
admin.site.register(Family)
admin.site.register(OccupationAddress)

'''class EventImageInline(admin.TabularInline):
    model = EventImage
    extra = 3

class EventAdmin(admin.ModelAdmin):
    inlines = [ EventImageInline, ]'''

admin.site.register(Event)
admin.site.register(Company)
admin.site.register(Job)
admin.site.register(Matrimony)