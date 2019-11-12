from flask import Flask , request, render_template, send_from_directory
import sys
import os

sys.path.insert(0, '../judge/')
import judge

app = Flask(__name__ , static_folder = './static')

@app.route('/api/submit' , methods=['POST'])
def submitCode():
    submission = request.get_json()
    output = judge.Judge().executeCode(submission['code'] , submission['language'])
    return output

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

if __name__ == '__main__':
    app.run()
