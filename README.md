# form-builder

## Tech stack

- Python
- Django
- React
- SQLite
- Pythonanywhere (backend hosting)
- Vercel (React hosting)

## Backend

- How to run server for first time?
  - `cd backend`
  - create a virtualenv. `python -m venv venv`
  - If you are *nix, issue this command to activate venv. `source venv/bin/activate` or in windows issue this command `venv\Scripts\activate`
  - Install requirements. `pip install -r requirements_dev.txt`
  - Run migrations `python manage.py migrate`
  - Finally run server using `python backend/manage.py runserver`. This will start server in port 8000. Visit `http://localhost:8000/admin` in browser.
  - We need to create a superuser for that stop the server using Ctrl + C and issue `python manage.py createsuperuser` and follow the onscreen instructions. Once it is done, go to `http://localhost:8000/admin` and enter credentials we created just now. This credentials
  will also be used in react app.
- From second time onwards, we can just activate the virtualenv and then issue runserver to start the server.

## Frontend

- How to run frontend for first time?
  -  `cd frontend/form-builder`
  - `npm install`
  - `npm start`. This will start frontend in port 3000. Visit `localhost:3000`` in browser to use the frontend.
- From second time onwards go to the frontend directory and just issue `npm start`

## Limitations

Note: Please watch demo video before reading this section.


- Backend is lightweight db sqlite which won't be good for multithreaded applications.
- logout page is not done for frontend.
- In react the form builder page will not list form fields when we click build for a form that already has form fields added. Adding new fields append to the existing fields. I am not fetching current form fields list which is the reason for this behaviour.
- Editing a form field is not supported in build form fields page.
- 404 will not be thrown if we view a form in public mode that has no form fields added.
- Test cases are not written because of time constraints. Usually I will be doing tdd.
