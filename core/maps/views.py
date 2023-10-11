import json

from django.http import HttpResponse
from django.views.generic import TemplateView

from config import settings
from core.maps.models import Customer


class IndexView(TemplateView):
    template_name = 'index.html'

    def post(self, request, *args, **kwargs):
        data = {}
        action = request.POST['action']
        try:
            if action == 'load_customers':
                features = []
                for customer in Customer.objects.all():
                    value = customer.toJSON()
                    value['icon'] = f'{settings.STATIC_URL}img/marcador.png'
                    detail = {
                        'type': 'Feature',
                        'properties': value,
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [float(customer.longitude), float(customer.latitude)]
                        },
                    }
                    features.append(detail)
                data['feature_collection'] = {'type': 'FeatureCollection', 'features': features}
            else:
                data['error'] = 'No ha seleccionado ninguna opción'
        except Exception as e:
            data['error'] = str(e)
        return HttpResponse(json.dumps(data), content_type='application/json')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['title'] = 'Marcadores con DataLayer'
        context['KEY_GOOGLE_MAPS'] = settings.env('API_KEY_GOOGLE_MAPS')
        return context
