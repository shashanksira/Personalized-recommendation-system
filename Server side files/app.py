from __future__ import print_function
import sys
import flask
from flask import jsonify, make_response
from flask import Flask
from flask import request
from flask_pymongo import PyMongo
import json
from bson.json_util import dumps
from collaborative_filter import final_5_recommendations_function
from like_function import like
import datetime
import operator
import random


app = Flask(__name__)
app.config['MONGO_DBNAME'] = 'yelp'
app.config['MONGO_URI'] = 'mongodb://localhost:27017/yelp'
app.config['APISPEC_FORMAT_RESPONSE'] = False
mongo = PyMongo(app)

@app.route('/recommend/<user_id>', methods=['GET'])
def index(user_id):
    result = final_5_recommendations_function(user_id)
    business = mongo.db.business
    output = []
    
    for item in business.find({'business_id':{'$in':result}},{ '_id': 0,'name':1,'business_id':1, 'address':1, 'stars':1}):
        output.append({'name': item['name'], 'business_id': item['business_id'],'address': item['address'], 'stars':item['stars']})
    return jsonify({"result":output}) 
#    yelp = mongo.db.yelp
#    result = yelp.find({},{"user_id": 1, "business_id": 1, "stars": 1 }).limit(10)

@app.route('/restaurant/<business_id>', methods=['GET'])
def rest_detail(business_id):
    business = mongo.db.business
    q = business.find_one({'business_id':business_id },{'name':1,'address':1, 'stars':1, '_id':-1, 'categories':1})
    
    photo = mongo.db.photo
    photos = []
    for item in photo.find({'business_id':business_id},{"photo_id":1, "_id":-1}):
        photos.append(item['photo_id'])
        
    if (isinstance(q['stars'], int)):
        output = {"name":q['name'], 'address':q['address'], 'stars':q['stars'], 'categories':q['categories'],'photos':photos}
    else:
        output = {"name":q['name'], 'address':q['address'], 'stars':q['stars']['$numberDouble'], 'categories':q['categories'],'photos':photos}
    
    return jsonify({'result':output})

@app.route('/test', methods=['POST'])
def test():
    test = mongo.db.test
    
    user_id = request.json['user_id']
    user_name = request.json['user_name']
    reaction = test.insert({'user_id':user_id, 'user_name':user_name})
    findit = test.find_one({"_id": reaction})
    
    output = {'user_id':findit['user_id']}
    return jsonify(output)


@app.route('/write', methods=['POST'])
def write_review():
    reviews = mongo.db.reviews
    
    user_id = request.json['user_id']
    stars = request.json['stars']
    review_id = user_id + "a"
    text = request.json['text']
    business_id = request.json['business_id']
    #now = datetime.datetime.now()
    #s = str(now.year) +"-"+ str(now.month)+"-" + str(now.day)
    
    reaction = reviews.insert({'user_id':user_id, 'stars':stars, 'review_id':review_id,'text':text,'business_id':business_id,
                             'funny':0, 'useful':0, 'cool':0})
    findit = reviews.find_one({"_id": reaction})
    
    output = {'user_id':findit['user_id']}
    return jsonify(output)

@app.route('/adaptivesearch/<searchword>/<user_id>', methods=['GET'])
def adaptivesearch(searchword,user_id):
    user_profile = mongo.db.user_profile
    user = user_profile.find_one({'name':user_id},{'_id':-1,'keywords':1})
    keywords = user['keywords']
    business = mongo.db.business
    dic = {}
    business_result = business.find({'name' :{'$regex':searchword}},{'business_id':1,'name':1,'address':1,'stars':1,'categories': 1,'_id':-1})
    match = {}
    dic = {}
    ##find all restaurants with "Noodle"
    for i in business_result:
        time = dic.get(i['business_id'],0)
        dic[i['business_id']] = time+1
        if (isinstance(i['stars'], int)):
            match[i['business_id']] = (i['name'],i['address'],i['stars'],i['categories'])
        else:
            match[i['business_id']] = (i['name'],i['address'],i['stars']['$numberDouble'],i['categories'])
    ##sort them
    for item in keywords:
        business_result = business.find({'business_id' :{'$in':dic.keys()}, 'categories' :{'$regex':item}},{'business_id':1, '_id':-1}) 
        for i in business_result:
            time = dic.get(i['business_id'],0)
            dic[i['business_id']] = time+1
            print(i['business_id'])
    
    sorted_x = sorted(dic.items(), key=operator.itemgetter(1),reverse=True)
    output = []
    count = 0
    for item in sorted_x:
        if count >= 10:
            break
    #   print(item[1])
        output.append({'business_id':item[0],'score':item[1],'name':match[item[0]][0], 'categories':match[item[0]][3], 'address':match[item[0]][1],'stars':match[item[0]][2]})
        count +=1
 
    return jsonify({'result':output})


@app.route('/like', methods=['POST'])
def like_it():
     user_id = request.json['user_id']
     business_id = request.json['business_id']
     result = like(business_id,user_id)
     if result is not None:
         return jsonify({'result':"Succeed"})
     else:
         return jsonify({'result':"Failed"})
     
        
@app.route('/register', methods=['POST'])
def register():   
    up = mongo.db.user_profile

    user_id = request.json['name']
    keywords = request.json['select-multiple']

    up_update = up.insert({'name': user_id,  'keywords': keywords})

    findit = up.find_one({"_id": up_update})['name']

    return jsonify({'result':findit})
         
    
    
    
    
    
    
    
    
    
    
    