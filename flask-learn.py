from flask import Flask

app=Flask(__name__)
# 装饰器,路由
@app.route('/hello',methods=['GET','POST'])
def hello():
    return "<h1>helloya</h1>"
# 正则匹配id
@app.route('/user/<int:id>',methods=['GET','POST'])
def index(id):
    if id==1:
        return "python"
    if id==2:
        return 'flask'
    return 'aaa'

#自定义转换器

if __name__=='__main__':
    app.run()
