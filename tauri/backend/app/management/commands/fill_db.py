from django.conf import settings
from django.core.management.base import BaseCommand
from minio import Minio

from .utils import *
from app.models import *


def add_users():
    User.objects.create_user("user", "user@user.com", "1234", first_name="user", last_name="user")
    User.objects.create_superuser("root", "root@root.com", "1234", first_name="root", last_name="root")

    for i in range(1, 10):
        User.objects.create_user(f"user{i}", f"user{i}@user.com", "1234", first_name=f"user{i}", last_name=f"user{i}")
        User.objects.create_superuser(f"root{i}", f"root{i}@root.com", "1234", first_name=f"user{i}", last_name=f"user{i}")


def add_components():
    Component.objects.create(
        name="Титановый шаробалонн",
        category="Дополнительные запчасти",
        description="В августе 2018 года было сообщено, что первая товарная партия титановых шаробаллонов (ТШБ) для ракет-носителей «Ангара» отправлена с Воронежского механического завода (ВМЗ) в ПО «Полёт». Это первый комплект ТШБ российского производства: до 2014 года для российских ракет-носителей их поставлял завод «Южмаш» (Украина).",
        image="1.png",
        price=random.randint(10, 100)*1000
    )

    Component.objects.create(
        name="Разгонный блок 'Бриз-М'",
        category="Разгонные блоки",
        description="В качестве верхней ступени предусмотрено применение разгонных блоков: «Бриз-КМ», «Бриз-М», кислородно-водородный среднего класса (КВСК) и кислородно-водородный тяжёлого класса (КВТК).",
        image="2.png",
        price=random.randint(10, 100)*1000
    )

    Component.objects.create(
        name="Центральная вычислительная машина 'Бисер-6'",
        category="Электроника",
        description="«Бисер-6» предназначен для управления движением и бортовыми системами, а также для контроля полёта и формирования телеметрической информации. При решении задач навигации и наведения с помощью «Бисера-6» выполняются арифметические и логические операции, а также операции обмена информацией с внешними абонентами.",
        image="3.png",
        price=random.randint(10, 100)*1000
    )

    Component.objects.create(
        name="Боковой ракетный модуль - урм 1",
        category="Универсальные ракетные модули",
        description="Носитель тяжелого класса «Ангара-5А» имеет первую ступень, образованную из пяти блоков на основе универсального ракетного модуля. Пять двигателей первой ступени запускаются при старте ракеты одновременно.",
        image="4.png",
        price=random.randint(10, 100)*1000
    )

    Component.objects.create(
        name="Центральный ракетный модуль",
        category="Универсальные ракетные модули",
        description="В основу семейства носителей «Ангара» положен универсальный ракетный модуль (УРМ). В его состав входит блок баков окислителя, горючего и двигатель РД-191.",
        image="5.png",
        price=random.randint(10, 100)*1000
    )

    Component.objects.create(
        name="Головной обтекатель",
        category="Головные модули",
        description="Задача головных обтекателей ракет-носителей – на момент старта и до вывода в космическое пространство – это защита космического аппарата от всех внешних факторов. Максимальной температурой головного обтекателя считается 175 градусов Цельсия по поверхности.",
        image="6.png",
        price=random.randint(10, 100)*1000
    )

    client = Minio(settings.MINIO_ENDPOINT,
                   settings.MINIO_ACCESS_KEY,
                   settings.MINIO_SECRET_KEY,
                   secure=settings.MINIO_USE_HTTPS)

    for i in range(1, 7):
        client.fput_object(settings.MINIO_MEDIA_FILES_BUCKET, f'{i}.png', f"app/static/images/{i}.png")

    client.fput_object(settings.MINIO_MEDIA_FILES_BUCKET, 'default.png', "app/static/images/default.png")


def add_rockets():
    users = User.objects.filter(is_staff=False)
    moderators = User.objects.filter(is_staff=True)
    components = Component.objects.all()

    for _ in range(30):
        status = random.randint(2, 5)
        owner = random.choice(users)
        add_rocket(status, components, owner, moderators)

    add_rocket(1, components, users[0], moderators)
    add_rocket(2, components, users[0], moderators)
    add_rocket(3, components, users[0], moderators)
    add_rocket(4, components, users[0], moderators)
    add_rocket(5, components, users[0], moderators)


def add_rocket(status, components, owner, moderators):
    rocket = Rocket.objects.create()
    rocket.status = status

    if status in [3, 4]:
        rocket.moderator = random.choice(moderators)
        rocket.date_complete = random_date()
        rocket.date_formation = rocket.date_complete - random_timedelta()
        rocket.date_created = rocket.date_formation - random_timedelta()
    else:
        rocket.date_formation = random_date()
        rocket.date_created = rocket.date_formation - random_timedelta()

    if status == 3:
        rocket.weight = random.randint(1000, 10000)

    rocket.name = "СУ-257"

    rocket.owner = owner

    for component in random.sample(list(components), 3):
        item = ComponentRocket(
            rocket=rocket,
            component=component,
            count=random.randint(1, 10)
        )
        item.save()

    rocket.save()


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        add_users()
        add_components()
        add_rockets()
