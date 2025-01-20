from django.urls import path
from .views import *

urlpatterns = [
    # Набор методов для услуг
    path('api/components/', search_components),  # GET
    path('api/components/<int:component_id>/', get_component_by_id),  # GET
    path('api/components/<int:component_id>/update/', update_component),  # PUT
    path('api/components/<int:component_id>/update_image/', update_component_image),  # POST
    path('api/components/<int:component_id>/delete/', delete_component),  # DELETE
    path('api/components/create/', create_component),  # POST
    path('api/components/<int:component_id>/add_to_rocket/', add_component_to_rocket),  # POST

    # Набор методов для заявок
    path('api/rockets/', search_rockets),  # GET
    path('api/rockets/<int:rocket_id>/', get_rocket_by_id),  # GET
    path('api/rockets/<int:rocket_id>/update/', update_rocket),  # PUT
    path('api/rockets/<int:rocket_id>/update_status_user/', update_status_user),  # PUT
    path('api/rockets/<int:rocket_id>/update_status_admin/', update_status_admin),  # PUT
    path('api/rockets/<int:rocket_id>/delete/', delete_rocket),  # DELETE

    # Набор методов для м-м
    path('api/rockets/<int:rocket_id>/update_component/<int:component_id>/', update_component_in_rocket),  # PUT
    path('api/rockets/<int:rocket_id>/delete_component/<int:component_id>/', delete_component_from_rocket),  # DELETE

    # Набор методов пользователей
    path('api/users/register/', register), # POST
    path('api/users/login/', login), # POST
    path('api/users/logout/', logout), # POST
    path('api/users/<int:user_id>/update/', update_user) # PUT
]
