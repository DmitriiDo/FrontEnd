import random
from datetime import datetime, timedelta

from django.contrib.auth import authenticate
from django.utils import timezone
from django.utils.dateparse import parse_datetime
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import *


def get_draft_rocket():
    return Rocket.objects.filter(status=1).first()


def get_user():
    return User.objects.filter(is_superuser=False).first()


def get_moderator():
    return User.objects.filter(is_superuser=True).first()


@api_view(["GET"])
def search_components(request):
    component_name = request.GET.get("component_name", "")

    components = Component.objects.filter(status=1)

    if component_name:
        components = components.filter(name__icontains=component_name)

    serializer = ComponentsSerializer(components, many=True)
    
    draft_rocket = get_draft_rocket()

    resp = {
        "components": serializer.data,
        "components_count": ComponentRocket.objects.filter(rocket=draft_rocket).count() if draft_rocket else None,
        "draft_rocket": draft_rocket.pk if draft_rocket else None
    }

    return Response(resp)


@api_view(["GET"])
def get_component_by_id(request, component_id):
    if not Component.objects.filter(pk=component_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    component = Component.objects.get(pk=component_id)
    serializer = ComponentSerializer(component)

    return Response(serializer.data)


@api_view(["PUT"])
def update_component(request, component_id):
    if not Component.objects.filter(pk=component_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    component = Component.objects.get(pk=component_id)

    serializer = ComponentSerializer(component, data=request.data, partial=True)

    if serializer.is_valid(raise_exception=True):
        serializer.save()

    return Response(serializer.data)


@api_view(["POST"])
def create_component(request):
    serializer = ComponentSerializer(data=request.data, partial=False)

    serializer.is_valid(raise_exception=True)

    Component.objects.create(**serializer.validated_data)

    components = Component.objects.filter(status=1)
    serializer = ComponentSerializer(components, many=True)

    return Response(serializer.data)


@api_view(["DELETE"])
def delete_component(request, component_id):
    if not Component.objects.filter(pk=component_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    component = Component.objects.get(pk=component_id)
    component.status = 2
    component.save()

    components = Component.objects.filter(status=1)
    serializer = ComponentSerializer(components, many=True)

    return Response(serializer.data)


@api_view(["POST"])
def add_component_to_rocket(request, component_id):
    if not Component.objects.filter(pk=component_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    component = Component.objects.get(pk=component_id)

    draft_rocket = get_draft_rocket()

    if draft_rocket is None:
        draft_rocket = Rocket.objects.create()
        draft_rocket.owner = get_user()
        draft_rocket.date_created = timezone.now()
        draft_rocket.save()

    if ComponentRocket.objects.filter(rocket=draft_rocket, component=component).exists():
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
        
    item = ComponentRocket.objects.create()
    item.rocket = draft_rocket
    item.component = component
    item.save()

    serializer = RocketSerializer(draft_rocket)
    return Response(serializer.data["components"])


@api_view(["POST"])
def update_component_image(request, component_id):
    if not Component.objects.filter(pk=component_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    component = Component.objects.get(pk=component_id)

    image = request.data.get("image")
    if image is not None:
        component.image = image
        component.save()

    serializer = ComponentSerializer(component)

    return Response(serializer.data)


@api_view(["GET"])
def search_rockets(request):
    status = int(request.GET.get("status", 0))
    date_formation_start = request.GET.get("date_formation_start")
    date_formation_end = request.GET.get("date_formation_end")

    rockets = Rocket.objects.exclude(status__in=[1, 5])

    if status > 0:
        rockets = rockets.filter(status=status)

    if date_formation_start and parse_datetime(date_formation_start):
        rockets = rockets.filter(date_formation__gte=parse_datetime(date_formation_start))

    if date_formation_end and parse_datetime(date_formation_end):
        rockets = rockets.filter(date_formation__lt=parse_datetime(date_formation_end))

    serializer = RocketsSerializer(rockets, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def get_rocket_by_id(request, rocket_id):
    if not Rocket.objects.filter(pk=rocket_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    rocket = Rocket.objects.get(pk=rocket_id)
    serializer = RocketSerializer(rocket, many=False)

    return Response(serializer.data)


@api_view(["PUT"])
def update_rocket(request, rocket_id):
    if not Rocket.objects.filter(pk=rocket_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    rocket = Rocket.objects.get(pk=rocket_id)
    serializer = RocketSerializer(rocket, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(["PUT"])
def update_status_user(request, rocket_id):
    if not Rocket.objects.filter(pk=rocket_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    rocket = Rocket.objects.get(pk=rocket_id)

    if rocket.status != 1:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    rocket.status = 2
    rocket.date_formation = timezone.now()
    rocket.save()

    serializer = RocketSerializer(rocket, many=False)

    return Response(serializer.data)


@api_view(["PUT"])
def update_status_admin(request, rocket_id):
    if not Rocket.objects.filter(pk=rocket_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    request_status = int(request.data["status"])

    if request_status not in [3, 4]:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    rocket = Rocket.objects.get(pk=rocket_id)

    if rocket.status != 2:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    if request_status == 3:
        rocket.weight = random.randint(1000, 10000)

    rocket.date_complete = timezone.now()
    rocket.status = request_status
    rocket.moderator = get_moderator()
    rocket.save()

    return Response(status=status.HTTP_200_OK)


@api_view(["DELETE"])
def delete_rocket(request, rocket_id):
    if not Rocket.objects.filter(pk=rocket_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    rocket = Rocket.objects.get(pk=rocket_id)

    if rocket.status != 1:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    rocket.status = 5
    rocket.save()

    serializer = RocketSerializer(rocket, many=False)

    return Response(serializer.data)


@api_view(["DELETE"])
def delete_component_from_rocket(request, rocket_id, component_id):
    if not ComponentRocket.objects.filter(rocket_id=rocket_id, component_id=component_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    item = ComponentRocket.objects.get(rocket_id=rocket_id, component_id=component_id)
    item.delete()

    items = ComponentRocket.objects.filter(rocket_id=rocket_id)
    data = [ComponentItemSerializer(item.component, context={"count": item.count}).data for item in items]

    return Response(data, status=status.HTTP_200_OK)


@api_view(["PUT"])
def update_component_in_rocket(request, rocket_id, component_id):
    if not ComponentRocket.objects.filter(component_id=component_id, rocket_id=rocket_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    item = ComponentRocket.objects.get(component_id=component_id, rocket_id=rocket_id)

    serializer = ComponentRocketSerializer(item, data=request.data,  partial=True)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(["POST"])
def register(request):
    serializer = UserRegisterSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(status=status.HTTP_409_CONFLICT)

    user = serializer.save()

    serializer = UserSerializer(user)

    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
def login(request):
    serializer = UserLoginSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)

    user = authenticate(**serializer.data)
    if user is None:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    serializer = UserSerializer(user)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
def logout(request):
    return Response(status=status.HTTP_200_OK)


@api_view(["PUT"])
def update_user(request, user_id):
    if not User.objects.filter(pk=user_id).exists():
        return Response(status=status.HTTP_404_NOT_FOUND)

    user = User.objects.get(pk=user_id)
    serializer = UserSerializer(user, data=request.data, partial=True)

    if not serializer.is_valid():
        return Response(status=status.HTTP_409_CONFLICT)

    serializer.save()

    return Response(serializer.data)