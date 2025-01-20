from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, User
from django.db import models


class Component(models.Model):
    STATUS_CHOICES = (
        (1, 'Действует'),
        (2, 'Удалена'),
    )

    name = models.CharField(max_length=100, verbose_name="Название")
    description = models.TextField(max_length=500, verbose_name="Описание")
    status = models.IntegerField(choices=STATUS_CHOICES, default=1, verbose_name="Статус")
    image = models.ImageField(verbose_name="Фото", blank=True, null=True)

    category = models.CharField()
    price = models.IntegerField()

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Комплектующее"
        verbose_name_plural = "Комплектующие"
        db_table = "components"
        ordering = ("pk",)


class Rocket(models.Model):
    STATUS_CHOICES = (
        (1, 'Введён'),
        (2, 'В работе'),
        (3, 'Завершен'),
        (4, 'Отклонен'),
        (5, 'Удален')
    )

    status = models.IntegerField(choices=STATUS_CHOICES, default=1, verbose_name="Статус")
    date_created = models.DateTimeField(verbose_name="Дата создания", blank=True, null=True)
    date_formation = models.DateTimeField(verbose_name="Дата формирования", blank=True, null=True)
    date_complete = models.DateTimeField(verbose_name="Дата завершения", blank=True, null=True)

    owner = models.ForeignKey(User, on_delete=models.DO_NOTHING, verbose_name="Создатель", related_name='owner', null=True)
    moderator = models.ForeignKey(User, on_delete=models.DO_NOTHING, verbose_name="Сотрудник", related_name='moderator', blank=True,  null=True)

    name = models.CharField(blank=True, null=True)
    weight = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return "Ракета №" + str(self.pk)

    class Meta:
        verbose_name = "Ракета"
        verbose_name_plural = "Ракеты"
        db_table = "rockets"
        ordering = ('-date_formation', )


class ComponentRocket(models.Model):
    component = models.ForeignKey(Component, on_delete=models.DO_NOTHING, blank=True, null=True)
    rocket = models.ForeignKey(Rocket, on_delete=models.DO_NOTHING, blank=True, null=True)
    count = models.IntegerField(default=0)

    def __str__(self):
        return "м-м №" + str(self.pk)

    class Meta:
        verbose_name = "м-м"
        verbose_name_plural = "м-м"
        db_table = "component_rocket"
        ordering = ('pk', )
        constraints = [
            models.UniqueConstraint(fields=['component', 'rocket'], name="component_rocket_constraint")
        ]
