from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.LoginAPI.as_view(), name='Login'),
    path('members/', views.MemberListAPI.as_view(), name="Members"),
    path('family/<str:pk>', views.FamilyAPI.as_view(), name="Family"),
    path('add-member/<str:pk>', views.MemberAPI.as_view(), name="Add-Member"),
    path('event/<str:pk>', views.EventAPI.as_view(), name="Event"),
    path('events/', views.EventListAPI.as_view(), name="Event-List"),
    path('company/<str:pk>', views.CompanyAPI.as_view(), name="Company"),
    path('companies/', views.CompanyListAPI.as_view(), name="Company-List"),
    path('job/<str:pk>', views.JobAPI.as_view(), name="Job"),
    path('jobs/', views.JobListAPI.as_view(), name="Job-List"),
    path('matrimony/<str:pk>', views.MatrimonyAPI.as_view(), name="Matrimony"),
    path('matrimonies/', views.MatrimonyListAPI.as_view(), name="Matrimony-List"),
]