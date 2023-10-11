# Pasos para la instalación

##### 1) Crear un entorno virtual para posteriormente instalar las librerias del proyecto

Para windows:

```bash
python3 -m venv venv 
```

Para linux:

```bash
virtualenv venv -ppython3 
```

##### 2) Activar el entorno virtual de nuestro proyecto

Para windows:

```bash
cd venv\Scripts\activate.bat 
```

Para Linux:

```bash
source venv/bin/active
```

##### 3) Instalar todas las librerias del proyecto

```bash
pip install -r requirements.txt
```

##### 4) Crear la tablas de la base de datos a partir de las migraciones

```bash
python manage.py makemigrations
python manage.py migrate
```

##### 5) Insertar datos de prueba

```bash
python manage.py insert_test_data
```

##### 6) Iniciar el servidor del proyecto

```bash
python manage.py runserver 
```