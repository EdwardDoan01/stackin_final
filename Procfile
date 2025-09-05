web: gunicorn Stackin.wsgi:application --log-file -
release: python manage.py migrate --settings=Stackin.settings_production && python manage.py collectstatic --noinput --settings=Stackin.settings_production
