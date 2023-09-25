from django.urls import path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
   openapi.Info(
      title="RGARMusic API",
      default_version='1.0.0',
      description="Веб-сервис для прослушивания музыки RGARmusic",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
   path('swagger/schema', schema_view.with_ui('swagger', cache_timeout=0), name='swagger-schema'),
]