from rest_framework import serializers

from .models import *


class ComponentsSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, component):
        if component.image:
            return component.image.url.replace("minio", "localhost", 1)

        return "http://localhost:9000/images/default.png"

    class Meta:
        model = Component
        fields = ("id", "name", "status", "price", "image")


class ComponentSerializer(ComponentsSerializer):
    class Meta(ComponentsSerializer.Meta):
        fields = "__all__"


class RocketsSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField(read_only=True)
    moderator = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Rocket
        fields = "__all__"


class RocketSerializer(RocketsSerializer):
    components = serializers.SerializerMethodField()
            
    def get_components(self, rocket):
        items = ComponentRocket.objects.filter(rocket=rocket)
        return [ComponentItemSerializer(item.component, context={"count": item.count}).data for item in items]


class ComponentItemSerializer(ComponentSerializer):
    count = serializers.SerializerMethodField()

    def get_count(self, _):
        return self.context.get("count")

    class Meta:
        model = Component
        fields = ("id", "name", "status", "price", "image", "count")


class ComponentRocketSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComponentRocket
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username')


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'username')
        write_only_fields = ('password',)
        read_only_fields = ('id',)

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            username=validated_data['username']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
