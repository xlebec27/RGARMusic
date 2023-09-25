from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from rgarmusic_api.serializers import *

category_create = swagger_auto_schema(
    operation_summary='Create category',
    tags=['Result'],
    request_body=ResultSerializer,

)

competition_create = swagger_auto_schema(
    operation_summary='Create competition',
    tags=['Competition'],
    request_body=CompetitionSerializer,
    responses={
        201: CompetitionSerializer,
        400: 'Bad Request',
        403: 'Forbidden',
        404: 'Not Found'
    }

)

season_create = swagger_auto_schema(
    operation_summary='Create season',
    tags=['Season'],
    request_body=SeasonSerializer,
    responses={
        201: SeasonSerializer,
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden'
    }

)
