from django.db import models
from django.forms import model_to_dict


class Customer(models.Model):
    names = models.CharField(max_length=150, verbose_name='Nombres')
    latitude = models.CharField(max_length=100, verbose_name='Latitud')
    longitude = models.CharField(max_length=100, verbose_name='Longitud')

    def __str__(self):
        return self.names

    def toJSON(self):
        item = model_to_dict(self)
        return item

    class Meta:
        verbose_name = 'Cliente'
        verbose_name_plural = 'Clientes'
