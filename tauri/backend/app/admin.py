from django.contrib import admin

from .models import *

admin.site.register(Component)
admin.site.register(Rocket)
admin.site.register(ComponentRocket)
