web: cd Stackin && gunicorn Stackin.wsgi:application --bind 0.0.0.0:$PORT
release: python Stackin/manage.py migrate --settings=Stackin.settings_production && python Stackin/manage.py collectstatic --noinput --settings=Stackin.settings_production
