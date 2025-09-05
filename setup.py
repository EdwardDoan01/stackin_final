from setuptools import setup, find_packages

setup(
    name="stackin",
    version="1.0.0",
    description="Stackin Task Management Platform",
    packages=find_packages(),
    install_requires=[
        "django==5.2.4",
        "djangorestframework==3.15.2",
        "django-cors-headers==4.3.1",
        "djangorestframework-simplejwt==5.3.0",
        "PyMySQL==1.1.0",
        "python-decouple==3.8",
        "dj-database-url==2.1.0",
        "gunicorn==21.2.0",
        "Pillow==10.4.0",
        "whitenoise==6.6.0",
    ],
    python_requires=">=3.11",
)
