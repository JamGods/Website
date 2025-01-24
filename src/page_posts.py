import os
from mako.template import Template

def get():
    posts_data = [
        {"thumbnail": "post.png", "post_text": "This is some placeholder text", "time_ago": "3 days ago", "views": 10},
        {"thumbnail": "post.png", "post_text": "This is some placeholder text", "time_ago": "5 days ago", "views": 25},
        {"thumbnail": "post.png", "post_text": "This is some placeholder text", "time_ago": "1 week ago", "views": 0},
        {"thumbnail": "post.png", "post_text": "This is some placeholder text", "time_ago": "1 year ago", "views": 80},
        {"thumbnail": "post.png", "post_text": "This is some placeholder text", "time_ago": "1 decade ago", "views": 90},
        {"thumbnail": "post.png", "post_text": "This is some placeholder text", "time_ago": "1 century ago", "views": 3456},
        {"thumbnail": "post.png", "post_text": "This is some placeholder text", "time_ago": "5 weeks ago", "views": 45725},
        {"thumbnail": "post.png", "post_text": "This is some placeholder text", "time_ago": "10 months ago", "views": 6832136},
        {"thumbnail": "post.png", "post_text": "This is some placeholder text", "time_ago": "1 week ago", "views": 257453},
        {"thumbnail": "post.png", "post_text": "This is some placeholder text", "time_ago": "1 week ago", "views": 56235},
        
    ]
    
    # Path to the static images directory
    image_dir = os.path.join(os.path.dirname(__file__), "../html")
    
    # Check if the thumbnail file exists, otherwise use a placeholder
    for post in posts_data:
        image_path = os.path.join(image_dir, post["thumbnail"])
        if not os.path.exists(image_path):
            post["thumbnail"] = "placeholder.png"
    
    template_path = os.path.join(os.path.dirname(__file__), "page_posts.html")
    template = Template(filename=template_path)

    return template.render(posts=posts_data)