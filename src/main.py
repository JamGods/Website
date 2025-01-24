import cherrypy
import os.path
import random 

#we have modules for each page we're displaying 
import page_index
import page_signup
import page_posts
import mako.template


class App:
    @cherrypy.expose
    def index(self):
        return page_index.get()
    @cherrypy.expose
    def signup(self):
        return page_signup.get()
    @cherrypy.expose
    def posts(self):
        return page_posts.get()
    
    
#the location where the main.py file is stored: The src folder
srcdir = os.path.abspath(os.path.dirname(__file__))

app = App()
cherrypy.quickstart(
    app,
    '/',
    {
        "/html": {
            "tools.staticdir.on": True,
            "tools.staticdir.dir": os.path.join(srcdir, "../html"),
        },
        "/site.css": {
            "tools.staticfile.on": True,
            "tools.staticfile.filename": os.path.join(srcdir, "../html/site.css"),
        }
    }
)