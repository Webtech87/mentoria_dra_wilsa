# Mentoria dra. Wilsa

Clone a repository using command 
    
    git clone https://github.com/Webtech87/mentoria_dra_wilsa.git

Create virtual environment using command 

    python(python3) -m venv <venv_name>

Activate your virtual environment using command

    source venv/Scripts/activate - for Windows
    source venv/bin/activate - for Linux

Install dependencies

    pip install -r requirements.txt

In this project, we use PostgreSQL, therefore we recommend installing PostgreSQL. The installation of PostgreSQL goes beyond the scope of this document, so we will skip this part.
After PostgreSQL installation lets create a new database with name **_santibrow_**
    
    CREATE DATABASE santibrow;

All secret data files storage in **_.env_** file. Create in the same level with **_manage.py_** file
to get all variables we should install **_python-dotenv_**(It already has been appointed in requirements.txt).
We recommend to storage all variables in  **_settings.py_**, and after coll a variable from **_settings.py_**. To get a variables it is necessary insert few lines in our code
    
    from dotenv import load_dotenv
    load_dotenv()
    SECRET_KEY = os.environ.get('SECRET_KEY')

# Validation Form
In form, I used default validation, but field for **_tel_** has a new "custom_validation" by **_regex_**.