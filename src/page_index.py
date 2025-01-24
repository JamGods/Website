import os
from mako.template import Template

def get():
    template_path = os.path.join(os.path.dirname(__file__), "page_index.html")
    template = Template(filename=template_path)
    return template.render(name="NAME")