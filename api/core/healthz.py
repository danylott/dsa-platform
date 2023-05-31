from django.http import HttpResponse, HttpRequest


def healthz_view(request: HttpRequest) -> HttpResponse:
    return HttpResponse("OK")
