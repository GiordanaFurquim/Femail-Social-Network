from flask import Flask, request
from finalproject import do_everything

app = Flask(__name__)

@app.route('/')
def home():
    # 'http://localhost:5000/?skill1=german&level1=5&learn1=-1&skill2=plumbing&level2=3&learn2=1&skill3=french&level3=2&learn3=1&skill4=python&level4=3&learn4=-1&skill5=javascript&level5=3&learn5=1'
    
    skills_dict = {
        request.args['skill1']: int(request.args['level1']),
        request.args['skill2']: int(request.args['level2']),
        request.args['skill3']: int(request.args['level3']),
        request.args['skill4']: int(request.args['level4']),
        request.args['skill5']: int(request.args['level5'])
    }

    teach_learn_dict = {
        request.args['skill1']: int(request.args['learn1']),
        request.args['skill2']: int(request.args['learn2']),
        request.args['skill3']: int(request.args['learn3']),
        request.args['skill4']: int(request.args['learn4']),
        request.args['skill5']: int(request.args['learn5'])
    }

    print(skills_dict, teach_learn_dict)
    data = do_everything(skills_dict, teach_learn_dict)
    return data

if __name__ == '__main__':
    app.run(debug=True)



